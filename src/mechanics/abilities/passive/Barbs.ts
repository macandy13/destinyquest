import { appendBonusDamage } from '../../../types/combat';
import { getOpponent } from '../../../types/stats';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Barbs',
    type: 'passive',
    description: 'At the end of every combat round, automatically inflict 1 damage to all opponents.',
    onPassiveAbility: (state, { owner }) => {
        return appendBonusDamage(state, {
            source: 'Barbs',
            target: getOpponent(owner),
            amount: 1
        });
    }
});
