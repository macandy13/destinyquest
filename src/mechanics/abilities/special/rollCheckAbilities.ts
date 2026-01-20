import { registerAbility } from '../../abilityRegistry';
import { dealDamage, addLogs, getCombatant } from '../../../types/combatState';
import { rollDice, sumDice, formatDice } from '../../../types/dice';
import { getOpponent } from '../../../types/character';

type TriggerCondition =
    | { type: 'vs-speed' }
    | { type: 'fixed'; values: number[] };

/**
 * Creates a roll-check ability that triggers at round start.
 * Rolls dice and either compares against hero speed or fixed values.
 */
export function createRollCheckAbility(config: {
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

createRollCheckAbility({
    name: 'Mud Pie',
    description:
        'At the start of each round, roll 2 dice. If the result is ' +
        'higher than your speed, you take 2 damage ignoring armour.',
    diceCount: 2,
    triggerCondition: { type: 'vs-speed' },
    damage: 2
});

createRollCheckAbility({
    name: 'Vortex of fire',
    description:
        'At the start of each round, roll 2 dice. If the result is ' +
        'higher than your speed, you take 4 damage ignoring armour.',
    diceCount: 2,
    triggerCondition: { type: 'vs-speed' },
    damage: 4,
    icon: '🔥'
});

createRollCheckAbility({
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

createRollCheckAbility({
    name: 'Pincer Movement',
    description:
        'At the start of each round, roll 1 die. If you roll a 1, ' +
        'you lose 2 health ignoring armour.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1] },
    damage: 2,
    icon: '🦂'
});

createRollCheckAbility({
    name: 'Shield Slam',
    description:
        'At the start of each round, roll 1 die. If you roll a 1, ' +
        'you take 6 damage ignoring armour. Rerolls not allowed.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1] },
    damage: 6,
    icon: '🛡️'
});

createRollCheckAbility({
    name: 'Tangled roots',
    description:
        'At the start of each round, roll 1 die. If you roll a 1 or 2, ' +
        'you lose 5 health ignoring armour.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1, 2] },
    damage: 5,
    icon: '🌿'
});

createRollCheckAbility({
    name: 'Bolt from the Blue',
    description:
        'At the end of the combat round, roll a die. If the result is ' +
        '1, 2, or 3, take 5 damage ignoring armour.',
    diceCount: 1,
    triggerCondition: { type: 'fixed', values: [1, 2, 3] },
    damage: 5,
    icon: '⚡'
});
