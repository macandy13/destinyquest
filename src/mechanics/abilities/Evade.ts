import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    const isDisabled = state.activeEffects.some(e => e.modification.source === 'Ensnare' || e.modification.source === 'Hamstring');
    return !isDisabled && state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Evade',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Evade. Avoided attack!", type: 'info' })
        };
    }
});
