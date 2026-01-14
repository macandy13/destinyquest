import { registerAbility, toCanonicalName } from '../../abilityRegistry';
import { CharacterType, getOpponent } from '../../../types/character';
import { appendEffect, dealDamage, hasEffect, getCombatant, healDamage, addLogs } from '../../../types/combatState';
import { getStatIcon, Stats } from '../../../types/stats';

/**
 * Creates a damage-over-time ability that triggers at the end of every round.
 * Can be conditional (e.g. requires damage to be dealt first).
 */
export function createDoTAbility(config: {
    name: string;
    description: string;
    damage: number;
    ignoreArmour?: boolean; // defaults to true (direct health damage)
    condition?: 'always' | 'on-hit' | 'on-damage' | 'on-start-round';
    icon?: string;
}) {
    registerAbility({
        name: config.name,
        type: 'special',
        description: config.description,
        icon: config.icon ?? '☠️',
        reviewed: true,
        // TODO: Implement onRoundStart
        onDamageDealt: (state, { target }, _source, damageDealt) => {
            if (config.condition === 'always') return state;
            if (!target) return state;

            // If condition is met, apply the effect tracker
            const conditionMet =
                (config.condition === 'on-hit') ||
                (config.condition === 'on-damage' && damageDealt > 0);
            if (conditionMet && !hasEffect(state, target, config.name)) {
                return appendEffect(state, target, {
                    stats: {},
                    source: config.name,
                    target,
                    duration: undefined,
                    icon: config.icon ?? '☠️',
                    description: config.description
                });
            }
            return state;
        },
        onPassiveAbility: (state, { owner }) => {
            const opponent = getOpponent(owner);

            // If it's unconditional, we don't need to check for effect on opponent, 
            // but we might want to check if the ability is active/on the owner.
            const shouldTrigger = config.condition === 'always' || hasEffect(state, opponent, config.name);
            if (shouldTrigger) {
                let damage = config.damage;
                let damageMsg = `${config.name} deals ${damage} damage`;
                const ignoreArmour = config.ignoreArmour !== false;

                if (!ignoreArmour) {
                    const targetChar = getCombatant(state, opponent);
                    // Simple armour reduction
                    const armour = targetChar.stats.armour;
                    damage = Math.max(0, damage - armour);
                    damageMsg += ` (reduced by armour)`;
                } else {
                    damageMsg += ` (ignoring armour)`;
                }

                if (damage > 0) {
                    return dealDamage(state, config.name, opponent, damage, damageMsg);
                }
            }
            return state;
        },
        // For 'always' triggers, we might want to show an icon on the enemy or hero to indicate it's active
        onCombatStart: (state, { owner }) => {
            if (config.condition === 'always' && !hasEffect(state, owner, config.name)) {
                return appendEffect(state, owner, {
                    stats: {},
                    source: config.name,
                    target: owner, // Applied to self to show active capability
                    duration: undefined,
                    icon: config.icon ?? '☠️',
                    description: config.description
                });
            }
            return state;
        }
    });
}


/**
 * Creates an immunity ability.
 * TODO: This only reverts damage, but it also needs to avoid adding effects or triggering abilities
 */
export function createImmunityAbility(config: {
    name: string;
    immunities: string[]; // List of keywords, e.g. ['Bleed', 'Venom']
    description?: string;
}) {
    const desc = config.description || `Immune to ${config.immunities.join(', ')}.`;
    const immunities = config.immunities.map(i => toCanonicalName(i));
    registerAbility({
        name: config.name,
        type: 'passive',
        description: desc,
        icon: '🛡️',
        reviewed: true,
        onDamageDealt: (state, { owner, target }, source, damageDealt) => {
            if (!target || owner !== target) return state;
            if (immunities.includes(source)) {
                // TODO: Likely better to prevent the damage instead of healing it again.
                state = healDamage(state, config.name, target, damageDealt, 'Immune');
                state = addLogs(state, {
                    message: `${target} is immune to ${source}.`,
                });
                return state;
            }
            return state;
        }
    });
}
