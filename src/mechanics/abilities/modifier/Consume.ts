import { registerAbility } from '../../abilityRegistry';
import { modifySpeedRolls } from '../abilityFactories';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Consume',
    type: 'modifier',
    description: "Reduce the result of each of your opponent's attack speed dice by 1 (minimum 1).",
    onSpeedRoll: (state, { owner }) => {
        // Only active if owner is involved? "Reduce... opponent's..."
        // Typically modifier abilities are used by the owner.
        // Assuming this is used *after* rolls.
        return modifySpeedRolls(state, getOpponent(owner), (rolls) => {
            return rolls.map(r => ({
                ...r,
                value: Math.max(1, r.value - 1),
                isRerolled: true // TODO: Should this be marked as rerolled?
            }));
        });
    }
});