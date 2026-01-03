import { registerAbility } from '../../abilityRegistry';
import { appendEffect, CombatState } from '../../../types/CombatState';
import { CharacterType, getOpponent } from '../../../types/Character';

function canActivate(state: CombatState, { owner }: { owner: CharacterType }): boolean {
    // TODO: Handle for hero as well
    return state.winner === getOpponent(owner);
}

registerAbility({
    name: 'Hamstring',
    type: 'combat',
    description: "Cancel an opponent's dodge (e.g., evade, sidestep) and roll for damage as normal.",
    canActivate: canActivate,
    onActivate: (state, context) => { // context { owner }
        const opponent = getOpponent(context.owner);
        if (!canActivate(state, context)) return state;
        return appendEffect(state, opponent, {
            stats: {},
            source: 'Hamstring',
            target: opponent,
            duration: 1
        });
    }
});
