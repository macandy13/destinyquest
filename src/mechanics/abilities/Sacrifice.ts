import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    const hasShades = state.activeEffects.some(e => e.modification.source === 'Shades'); // Checking modification source
    return hasShades && state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Sacrifice',
    type: 'combat',
    description: "Sacrifice your shades to absorb all damage from an opponent's roll.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        // Remove Shades
        const activeEffects = state.activeEffects.filter(e => e.modification.source !== 'Shades');

        return {
            activeEffects: activeEffects,
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Sacrifice. Shades absorbed the damage!", type: 'info' })
        };
    }
});
