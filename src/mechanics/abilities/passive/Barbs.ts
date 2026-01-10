import { dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Barbs',
    type: 'passive',
    description: 'At the end of every combat round, automatically inflict 1 damage to all opponents.',
    reviewed: true,
    onPassiveAbility: (state, { owner }) => {
        // TODO: Handle multiple opponents.
        return dealDamage(
            state,
            'Barbs',
            getOpponent(owner),
            1,
            `Barbs deals 1 damage to ${getOpponent(owner)}`
        );
    }
});
