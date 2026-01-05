import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import { canModifySpeed } from '../abilityFactories';

registerAbility({
    name: 'Demolish',
    type: 'speed',
    description: "Reduce the opponent's speed dice by 1 for one round and lower their armour by 1 for the remainder of the combat.",
    canActivate: canModifySpeed,
    onActivate: (state, { owner }) => {
        const opponent = getOpponent(owner);
        let newState = appendEffect(state, opponent, {
            stats: { speedDice: -1 },
            source: 'Demolish (Speed)',
            target: opponent,
            duration: 1
        });
        newState = appendEffect(newState, opponent, {
            stats: { armour: -1 },
            source: 'Demolish (Armour)',
            target: opponent,
            duration: undefined
        });
        return newState;
    }
});
