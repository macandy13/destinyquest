import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';
import { CharacterType, getOpponent } from '../../../types/character';
import { resolveTarget, TargetType } from '../abilityFactories';

/**
 * Creates an ability that deals damage based on rolled dice values.
 * 
 * @param checkOwnerRolls - If true, checks the owner's rolls. 
 *                          If false, checks the opponent's rolls.
 * @param affectsOwner - If true, deals damage to the owner.
 *                       If false, deals damage to the opponent.
 */
export function createRollDamageAbility(config: {
    name: string;
    description: string;
    triggerValues: number[];
    damagePerTrigger: number;
    rollType: 'speed' | 'damage' | 'all';
    rollsTarget: CharacterType;
    damageTarget: CharacterType;
    icon?: string;
}) {
    registerAbility({
        name: config.name,
        type: 'special',
        description: config.description,
        icon: config.icon ?? '🎲',
        reviewed: true,
        onSpeedRoll: (config.rollType === 'speed' || config.rollType === 'all')
            ? (state) => {
                const targetRolls = config.rollsTarget === 'hero' ? state.heroSpeedRolls : state.enemySpeedRolls;
                if (!targetRolls) return state;

                const triggerCount = targetRolls.filter(
                    r => config.triggerValues.includes(r.value)
                ).length;
                if (triggerCount > 0) {
                    const totalDamage = triggerCount * config.damagePerTrigger;
                    state = dealDamage(
                        state,
                        config.name,
                        config.damageTarget,
                        totalDamage,
                        `${config.name}: ${triggerCount}x ${config.triggerValues.join('/')} ` +
                        `rolled = ${totalDamage} damage`
                    );
                }
                return state;
            }
            : undefined,
        onDamageRoll: (config.rollType === 'damage' || config.rollType === 'all')
            ? (state) => {
                if (!state.damage || state.winner !== config.rollsTarget) return state;

                const triggerCount = state.damage.damageRolls.filter(
                    r => config.triggerValues.includes(r.value)
                ).length;
                if (triggerCount > 0) {
                    const totalDamage = triggerCount * config.damagePerTrigger;
                    state = dealDamage(
                        state,
                        config.name,
                        config.damageTarget,
                        totalDamage,
                        `${config.name}: ${triggerCount}x ${config.triggerValues.join('/')} ` +
                        `rolled = ${totalDamage} damage`
                    );
                }
                return state;
            }
            : undefined
    });
}

// Roll-based damage abilities

createRollDamageAbility({
    name: 'By hook',
    description:
        'For each 1 you roll you immediately lose 2 health, ignoring armour.',
    triggerValues: [1],
    damagePerTrigger: 2,
    rollType: 'all',
    rollsTarget: 'hero',
    damageTarget: 'hero',
});

createRollDamageAbility({
    name: 'Tail lash',
    description:
        'For every 1 you roll, the ratling hits you for 1 damage, ignoring armour.',
    triggerValues: [1],
    damagePerTrigger: 1,
    rollType: 'all',
    rollsTarget: 'hero',
    damageTarget: 'hero',
});

createRollDamageAbility({
    name: 'Terrible Talons',
    description: 'For each 1 you roll, take 2 damage ignoring armour.',
    triggerValues: [1],
    damagePerTrigger: 2,
    rollType: 'all',
    rollsTarget: 'hero',
    damageTarget: 'hero',
});

createRollDamageAbility({
    name: 'Sharpshooter',
    description: 'For each 1 you roll, take 1 damage ignoring armour.',
    triggerValues: [1],
    damagePerTrigger: 1,
    rollType: 'all',
    rollsTarget: 'hero',
    damageTarget: 'hero',
});

createRollDamageAbility({
    name: 'Maelstrom',
    description: 'For each 1 you roll, lose 8 health ignoring armour.',
    triggerValues: [1],
    damagePerTrigger: 8,
    rollType: 'all',
    rollsTarget: 'hero',
    damageTarget: 'hero',
});

createRollDamageAbility({
    name: 'Whiplash',
    description:
        'For each 6 the enemy rolls for attack speed, you lose 2 health ' +
        'ignoring armour.',
    triggerValues: [6],
    damagePerTrigger: 2,
    rollType: 'speed',
    rollsTarget: 'enemy',
    damageTarget: 'hero',
});

