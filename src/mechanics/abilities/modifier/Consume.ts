import { registerAbility } from '../../abilityRegistry';
import { canModifySpeedDice, modifySpeedRolls } from '../abilityFactories';

registerAbility({
    name: 'Consume',
    type: 'modifier',
    description: "Reduce the result of each of your opponent's attack speed dice by 1 (minimum 1).",
    onSpeedRoll: (state, { owner }) => {
        // Only active if owner is involved? "Reduce... opponent's..."
        // Typically modifier abilities are used by the owner.
        // Assuming this is used *after* rolls.
        return modifySpeedRolls(state, 'opponent', (rolls) => {
            return rolls.map(r => ({
                ...r,
                value: Math.max(1, r.value - 1),
                isRerolled: true // TODO: Mark as modified
            }));
        });
    }
});
