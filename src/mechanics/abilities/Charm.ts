import { registerAbility } from '../abilityRegistry';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    // Can reroll speed if rolls exist (allows backtracking if we lost or want to improve before damage)
    if (state.heroSpeedRolls && state.phase !== 'combat-end') return true;
    // Can reroll damage if hero won and rolled damage
    if (state.phase === 'round-end' && state.winner === owner && state.damageRolls) return true;
    return false;
}

registerAbility({
    name: 'Charm',
    type: 'modifier',
    description: 'Re-roll one of your hero\'s dice; you must accept the second result.',
    icon: '🎲',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (owner !== 'hero' || !canActivate(state, owner)) return null;

        // Prioritize damage reroll if available and valid (Hero won)
        let target: 'damage' | 'hero-speed' | null = null;
        if (state.winner === 'hero' && state.damageRolls) {
            target = 'damage';
        } else if (state.heroSpeedRolls) {
            target = 'hero-speed';
        }

        if (!target) return null;

        return {
            rerollState: {
                source: 'Charm',
                target
            },
            logs: [...state.logs, { round: state.round, message: `Select a ${target === 'damage' ? 'damage' : 'speed'} die to re-roll.`, type: 'info' }]
        };
    },
    onReroll: (state, index) => {
        if (state.rerollState?.target === 'hero-speed' && state.heroSpeedRolls) {
            const currentRoll = state.heroSpeedRolls[index];
            if (currentRoll.isRerolled) return {}; // Already rerolled

            const newRollVal = Math.floor(Math.random() * 6) + 1;
            const newRolls = [...state.heroSpeedRolls];
            newRolls[index] = { value: newRollVal, isRerolled: true };

            return {
                heroSpeedRolls: newRolls,
                rerollState: undefined, // Clear reroll state after use? Plan said "max 1 reroll per die" implies we might keep state open? 
                // Wait, "Every die can only be rerolled once".
                // "The whole pendingInteraction handling is complicated, we need something easier".
                // If I clear rerollState, the user can only reroll ONE die total.
                // Text says "Re-roll one of your hero's dice". ONE. Singular.
                // So yes, clear state.
                logs: [...state.logs, { round: state.round, message: `Re-rolled die ${index + 1} to ${newRollVal}.`, type: 'info' }]
            };
        } else if (state.rerollState?.target === 'damage' && state.damageRolls) {
            const currentRoll = state.damageRolls[index];
            if (currentRoll.isRerolled) return {};

            const newRollVal = Math.floor(Math.random() * 6) + 1;
            const newRolls = [...state.damageRolls];
            newRolls[index] = { value: newRollVal, isRerolled: true };

            return {
                damageRolls: newRolls,
                rerollState: undefined,
                logs: [...state.logs, { round: state.round, message: `Re-rolled damage die to ${newRollVal}.`, type: 'info' }]
            };
        }
        return {};
    }
});
