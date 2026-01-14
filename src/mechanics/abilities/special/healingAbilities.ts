import { registerAbility } from '../../abilityRegistry';
import { healDamage, getCombatant } from '../../../types/combatState';

/**
 * Creates a healing ability that triggers at round start or end.
 */
export function createHealingAbility(config: {
    name: string;
    description: string;
    amount: number;
    trigger: 'round-start' | 'round-end';
    stopAtZero?: boolean;
}) {
    registerAbility({
        name: config.name,
        type: 'special',
        description: config.description,
        icon: '💚',
        reviewed: true,
        onRoundStart: config.trigger === 'round-start' ? (state, { owner }) => {
            const combatant = getCombatant(state, owner);
            if (config.stopAtZero && combatant.stats.health <= 0) {
                return state;
            }
            state = healDamage(
                state,
                config.name,
                owner,
                config.amount,
                `${config.name}: +${config.amount} health`
            );
            return state;
        } : undefined,
        onPassiveAbility: config.trigger === 'round-end' ? (state, { owner }) => {
            const combatant = getCombatant(state, owner);
            if (config.stopAtZero && combatant.stats.health <= 0) {
                return state;
            }
            state = healDamage(
                state,
                config.name,
                owner,
                config.amount,
                `${config.name}: +${config.amount} health`
            );
            return state;
        } : undefined
    });
}

// Healing abilities

createHealingAbility({
    name: 'Regeneration',
    description:
        'At the start of the combat round, the Troll regains 2 health. ' +
        'Once the trolls health has been reduced to 0, he cannot heal.',
    amount: 2,
    trigger: 'round-start',
    stopAtZero: true
});

createHealingAbility({
    name: 'Healing touch',
    description:
        'At the end of the combat round, Allura heals 2 health. ' +
        'Once her health has been reduced to 0, she cannot heal.',
    amount: 2,
    trigger: 'round-end',
    stopAtZero: true
});

createHealingAbility({
    name: 'Holy Circle',
    description: 'At the end of the combat round, the Architect heals 4 health.',
    amount: 4,
    trigger: 'round-end'
});

createHealingAbility({
    name: 'Dark Runes',
    description: 'At the end of each combat round, the enemy heals 3 health.',
    amount: 3,
    trigger: 'round-end'
});

createHealingAbility({
    name: 'Enduring Spirit',
    description:
        'At the end of the combat round, Lorcan heals 4 health if not defeated.',
    amount: 4,
    trigger: 'round-end',
    stopAtZero: true
});

createHealingAbility({
    name: 'Gathering Darkness',
    description:
        'At the end of each combat round, the enemy heals 8 health if not ' +
        'defeated.',
    amount: 8,
    trigger: 'round-end',
    stopAtZero: true
});
