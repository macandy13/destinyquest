import { dealDamage } from '../../../types/combatState';
import { registerAbility } from '../../abilityRegistry';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Vitriol',
    type: 'passive',
    description: 'Inflict 1 damage to all opponents and your hero at the end of every round.',
    onPassiveAbility: (state, { owner }) => {
        // TODO: Deal damage to all enemies
        state = dealDamage(state, 'Vitriol', getOpponent(owner), 1);
        state = dealDamage(state, 'Vitriol', owner, 1);
        return state;
    }
});
