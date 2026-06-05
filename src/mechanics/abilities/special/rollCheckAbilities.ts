import { registerAbility } from '../../abilityRegistry';
import { healDamage, dealDamage, addLogs, getCombatant } from '../../../types/combatState';
import { rollDice, sumDice, formatDice } from '../../../types/dice';
import { CharacterType, getOpponent } from '../../../types/character';
import { CombatState } from '../../../types/combatState'

type TriggerCondition =
    | { type: 'vs-speed' }
    | { type: 'fixed'; values: number[] };

/**
 * Creates a roll-check ability that triggers at round start.
 * Rolls dice and either compares against hero speed or fixed values.
 */
export function createStartOfRoundRollAbility(config: {
    name: string;
    description: string;
    diceCount: number;
    triggerCondition: TriggerCondition;
    damage: number | 'formula';
    damageFormula?: (armour: number) => number;
    icon?: string;
}) {
    registerAbility({
        name: config.name,
        type: 'special',
        description: config.description,
        icon: config.icon ?? '🎲',
        reviewed: false,
        onRoundStart: (state, { owner }) => {
            const target = getOpponent(owner);
            const targetCombatant = getCombatant(state, target);
            const rolls = rollDice(config.diceCount);
            const total = sumDice(rolls);
            const rollStr = formatDice(rolls);

            let triggered = false;
            let logMsg = `${config.name}: Rolled ${rollStr}=${total}`;

            if (config.triggerCondition.type === 'vs-speed') {
                const speed = targetCombatant.stats.speed;
                logMsg += ` vs speed ${speed}`;
                triggered = total > speed;
            } else {
                triggered = rolls.some(
                    r => config.triggerCondition.type === 'fixed' &&
                        config.triggerCondition.values.includes(r.value)
                );
            }

            if (triggered) {
                let damage: number;
                if (config.damage === 'formula' && config.damageFormula) {
                    damage = config.damageFormula(targetCombatant.stats.armour);
                } else if (typeof config.damage === 'number') {
                    damage = config.damage;
                } else {
                    damage = 0;
                }
                logMsg += ` - triggered! ${damage} damage`;
                return dealDamage(state, config.name, target, damage, logMsg);
            }

            return addLogs(state, { message: logMsg + ' - no effect' });
        }
    });
}

// Roll-check abilities

createStartOfRoundRollAbility({
    name: 'Mud Pie',
    description:
        'At the start of each round, roll 2 dice. If the result is ' +
        'higher than your speed, you take 2 damage ignoring armour.',
    diceCount: 2,
    triggerCondition: { type: 'vs-speed' },
    damage: 2
});

createStartOfRoundRollAbility({
    name: 'Vortex of fire',
    description:
        'At the start of each round, roll 2 dice. If the result is ' +
        'higher than your speed, you take 4 damage ignoring armour.',
    diceCount: 2,
    triggerCondition: { type: 'vs-speed' },
    damage: 4,
    icon: '🔥'
});

createStartOfRoundRollAbility({
    name: 'Clobbering Time',
    description:
        'At the start of each round, roll 4 dice. If the result is ' +
        'higher than your speed, you take 15 damage minus half your armour.',
    diceCount: 4,
    triggerCondition: { type: 'vs-speed' },
    damage: 'formula',
    damageFormula: (armour) => Math.max(0, 15 - Math.floor(armour / 2)),
    icon: '👊'
});

createStartOfRoundRollAbility({
    name: 'Pincer Movement',
    description:
        'At the start of each round, roll 1 die. If you roll a 1, ' +
        'you lose 2 health ignoring armour.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1] },
    damage: 2,
    icon: '🦂'
});

createStartOfRoundRollAbility({
    name: 'Shield Slam',
    description:
        'At the start of each round, roll 1 die. If you roll a 1, ' +
        'you take 6 damage ignoring armour. Rerolls not allowed.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1] },
    damage: 6,
    icon: '🛡️'
});

createStartOfRoundRollAbility({
    name: 'Tangled roots',
    description:
        'At the start of each round, roll 1 die. If you roll a 1 or 2, ' +
        'you lose 5 health ignoring armour.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1, 2] },
    damage: 5,
    icon: '🌿'
});

createStartOfRoundRollAbility({
    name: 'Bolt from the Blue',
    description:
        'At the end of the combat round, roll a die. If the result is ' +
        '1, 2, or 3, take 5 damage ignoring armour.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1, 2, 3] },
    damage: 5,
    icon: '⚡'
});

createStartOfRoundRollAbility({
    name: 'Bombardement',
    description: 'At the start of a round, roll a die. 1-3: -2 health (hero)',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1, 2, 3] },
    damage: 2,
    icon: '⚡'
});

/**
 * Creates a roll-check ability that triggers at round end.
 * Rolls dice and either compares against hero speed or fixed values.
 */
export function createEndOfRoundRollAbility(config: {
    name: string;
    description: string;
    type: 'speed-challenge' | 'dice-roll'
    diceCount: number;
    effects: Map<
        (total: number) => boolean,
        (state: CombatState, source: string, owner: CharacterType) => CombatState>;
    icon?: string;
}) {
    registerAbility({
        name: config.name,
        type: 'special',
        description: config.description,
        icon: config.icon ?? '🎲',
        reviewed: false,
        onPassiveAbility: (state, { owner }) => {
            let total = 0;
            let logMsg = '';
            switch (config.type) {
                case 'dice-roll': {
                    const rolls = rollDice(config.diceCount);
                    const total = sumDice(rolls);
                    const rollStr = formatDice(rolls);
                    logMsg = `${config.name}: Rolled ${rollStr}=${total}`;
                    break;
                }
                case 'speed-challenge':
                    {
                        const hero = getCombatant(state, 'hero');
                        const rolls = rollDice(2);
                        const total = sumDice(rolls) + hero.stats.speed;
                        const rollStr = formatDice(rolls);
                        logMsg = `${config.name}: Rolled ${hero.stats.speed} ${rollStr}=${total}`;
                        break;
                    }
            }

            if (logMsg) addLogs(state, { message: logMsg });
            for (const [trigger, effect] of config.effects.entries()) {
                if (trigger(total)) {
                    return effect(state, config.name, owner);
                }
            }

            addLogs(state, { message: `${config.name} - no effect` });
            return state;
        }
    });
}

function between(min: number, max: number) {
    return (total: number) => total >= min && total <= max;
}

createEndOfRoundRollAbility({
    name: 'Endless assault',
    description: 'At the end of the round, roll a die. 1-2: +4 health (enemy)',
    type: 'dice-roll',
    diceCount: 1,
    effects: new Map([
        [between(1, 2), (state: CombatState, source: string) =>
            healDamage(state, source, 'enemy', 4)]
    ]),
});

createEndOfRoundRollAbility({
    name: 'Pest control',
    description: 'At the end of each combat round, roll a die - 1-2: Add +2 to the ghoul effect. Ghoul effect: Hero takes 0 damage at the end of each combat round',
    type: 'dice-roll',
    diceCount: 1,
    effects: new Map([
        [between(1, 2), (state: CombatState, source: string) => {
            // TODO: Add goul effect or modify it
            return state;
        }]
    ]),
});

createEndOfRoundRollAbility({
    name: 'Pest control',
    description: 'At the end of each combat round, roll a die - 1-2: Add +2 to the ghoul effect. Ghoul effect: Hero takes 0 damage at the end of each combat round',
    type: 'speed-challenge',
    diceCount: 1,
    effects: new Map([
        [between(1, 12), (state: CombatState, source: string) => dealDamage(state, source, 'hero', 5)]
    ]),
});