import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Windwalker',
    type: 'combat',
    description: 'Use all attack speed dice for your damage score after winning a round.',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        // Use Speed Stat as Damage Dice count
        const speed = state.hero?.stats.speed || 0;

        // This ability changes the rules for damage roll.
        // If we activate it, we might need to set a modification that changes damage dice count 'this round'.
        // But standard damage roll might check `damageDice` mod.
        // If `damageDice` mod is additive, we calculate difference.
        // Current Damage Dice = ? (Need to know what it would be).
        // Usually assume it's 1 die? Or weapon dependent.
        // But we can just set `damageDice` to `speed`?
        // Stats modification has `damageDice` as additive usually.
        // If we want to FORCE it to `speed`, we might need a specific flag or trick.

        // Alternative: we perform the roll ourselves here and set result?
        // "Use all attack speed dice".
        // Roll `speed` dice. Sum them. Set as damage.

        const dmgRolls = rollDice(speed);
        const dmg = sumDice(dmgRolls);
        const rolls = dmgRolls.map(r => r.value);

        // We replace the standard roll.
        return {
            phase: 'round-end', // Skip standard roll
            damageRolls: [{ value: 0, isRerolled: false }], // dummy
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Windwalker' }],
            logs: addLogs(state.logs, { round: state.round, message: `Windwalker! Rolled ${speed} dice for ${dmg} damage (${rolls.join('+')}).`, type: 'damage-hero' })
        };
    }
});
