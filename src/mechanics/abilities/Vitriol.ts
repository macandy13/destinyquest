import { dealDamage, CombatState } from '../../types/combat';
import { registerAbility } from '../abilityRegistry';
import { getOpponent } from '../../types/stats';

registerAbility({
    name: 'Vitriol',
    type: 'passive',
    description: 'Inflict 1 damage to all opponents and your hero at the end of every round.',
    onRoundEnd: (state, owner) => {
        const firstUpdate = dealDamage(state, 'Vitriol', getOpponent(owner), 1);
        const intermediateState = { ...state, ...firstUpdate } as CombatState;
        const secondUpdate = dealDamage(intermediateState, 'Vitriol', owner, 1);
        return {
            ...firstUpdate,
            ...secondUpdate
        };
    }
});
