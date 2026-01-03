import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect } from '../../../types/CombatState';
import { CombatState } from '../../../types/CombatState';
import { CharacterType, getOpponent } from '../../../types/Character';

function canActivate(state: CombatState, { owner }: { owner: CharacterType }): boolean {
    return state.phase !== 'round-end';
}

registerAbility({
    name: 'Fatal Blow',
    type: 'combat',
    description: "Ignore half of your opponent's armour (rounding up).",
    canActivate: (state, { owner }) => canActivate(state, { owner }),
    onActivate: (state, { owner }) => {
        if (!canActivate(state, { owner })) return state;
        const opponent = getOpponent(owner);
        const armour = state[opponent].stats.armour || 0;
        const reduction = -Math.ceil(armour / 2);

        let newState = appendEffect(state, opponent, {
            stats: { armour: reduction },
            source: 'Fatal Blow',
            target: opponent,
            duration: 1
        });
        return addLogs(newState, { round: state.round, message: "Used ability: Fatal Blow.", type: 'info' });
    },
});
