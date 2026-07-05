import { CombatState, addLogs } from '../../../types/combatState';
import { AbilityContext, registerAbility } from '../../abilityRegistry';
import {
    rollDice,
    sumDice,
    formatDice,
} from '../../../types/dice';
import { Effect } from './effects';

export interface RollBranch {
    /** Die face values that trigger this branch. */
    faces: number[];
    effect: Effect;
}

export interface RollBranchesConfig {
    name: string;
    description: string;
    icon?: string;
    /** Which lifecycle phase to roll on. */
    when: 'round-start' | 'round-end';
    /** Number of dice to roll. */
    roll: number;
    /** Ordered list of branches. First matching branch wins. */
    branches: RollBranch[];
}

/**
 * Declares an ability that rolls dice once and selects exactly one
 * outcome branch based on the face value. First matching branch wins.
 *
 * @example
 * defineRollBranches({
 *   name: 'Sniper fire',
 *   description: '...',
 *   when: 'round-end',
 *   roll: 1,
 *   branches: [
 *     { faces: [1, 2, 3], effect: dealDamage(3, 'hero') },
 *     { faces: [4, 5, 6], effect: dealDamage(3, 'enemy') },
 *   ],
 * });
 */
export function defineRollBranches(config: RollBranchesConfig): void {
    function evaluate(
        state: CombatState,
        context: AbilityContext,
    ): CombatState {
        const rolls = rollDice(config.roll);
        const rollStr = formatDice(rolls);
        const total = sumDice(rolls);

        state = addLogs(state, {
            message: `${config.name}: Rolled ${rollStr}=${total}`,
        });

        for (const branch of config.branches) {
            if (rolls.some((r) => branch.faces.includes(r.value))) {
                return branch.effect(state, config.name, context.owner);
            }
        }

        return addLogs(state, {
            message: `${config.name}: no effect`,
        });
    }

    const isRoundEnd = config.when === 'round-end';

    registerAbility({
        name: config.name,
        description: config.description,
        icon: config.icon ?? '🎲',
        type: 'special',
        reviewed: true,
        onRoundStart: !isRoundEnd
            ? (state: CombatState, context: AbilityContext) =>
                  evaluate(state, context)
            : undefined,
        onPassiveAbility: isRoundEnd
            ? (state: CombatState, context: AbilityContext) =>
                  evaluate(state, context)
            : undefined,
    });
}
