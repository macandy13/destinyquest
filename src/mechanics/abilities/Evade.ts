import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';
import { isOpponentDamageRollPhase } from './abilityFactories';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    const cancellationEffects = ['Ensnare', 'Hamstring'];
    return isOpponentDamageRollPhase(state, owner)
        && !state.activeEffects.some(
            e => e.modification.target == owner
                && cancellationEffects.includes(e.modification.source));
}

registerAbility({
    name: 'Evade',
    type: 'combat',
    description: 'Avoid damage after losing a round (still affected by passive damage like bleed/venom).',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            logs: addLogs(state.logs, { round: state.round, message: "Used ability: Evade. Avoided attack!", type: 'info' })
        };
    }
});
