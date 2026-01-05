import { registerAbility } from '../../abilityRegistry';
import { modifySpeedRolls } from '../abilityFactories';

registerAbility({
    name: 'Shadow Speed',
    type: 'modifier',
    description: "Change all speed dice results of [1] to [3].",
    onSpeedRoll: (state, { owner }) => {
        return modifySpeedRolls(state, owner, (rolls) => {
            return rolls.map(r => (r.value === 1 ? { ...r, value: 3 } : r));
        });
    }
});
