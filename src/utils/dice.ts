import { DiceRoll } from '../types/combat';

/**
 * Calculates the total value of a set of dice.
 * Handles both DiceRoll objects and raw numbers (for backward compatibility if needed, though we aim to migrate fully).
 */
export function sumDice(rolls: DiceRoll[] | undefined): number {
    if (!rolls) return 0;
    return rolls.reduce((sum, roll) => sum + roll.value, 0);
}

/**
 * Creates a fresh array of random dice rolls.
 */
export function rollDice(count: number): DiceRoll[] {
    return new Array(count).fill(0).map(() => ({
        value: Math.floor(Math.random() * 6) + 1,
        isRerolled: false
    }));
}
