export interface DiceRoll {
    value: number;
    isRerolled: boolean;
}

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

export function deterministicRoll(rolls: number[]): DiceRoll[] {
    return rolls.map(r => { return { value: r, isRerolled: false } });
}

/**
 * Adds missing dice or removes superfluous ones (randomly)
*/
export function rerollDice(input: DiceRoll[], newCount: number): DiceRoll[] {
    while (newCount < input.length) {
        // Randomly remove dice
        const randomIndex = Math.floor(Math.random() * input.length);
        input.splice(randomIndex, 1);
    }
    const newDice = rollDice(newCount - input.length);
    return [...input, ...newDice];
}

/**
 * Checks if the given set of dice contains any duplicates (doubles).
 */
export function hasDouble(rolls: DiceRoll[] | number[]): boolean {
    if (!rolls || rolls.length < 2) return false;
    const values = rolls.map(r => (typeof r === 'number' ? r : r.value));
    return new Set(values).size !== values.length;
}

export function formatDice(rolls: DiceRoll[] | number[]): string {
    if (!rolls) return '';
    return rolls.map(r => (typeof r === 'number' ? r : r.value)).join('+');
}
