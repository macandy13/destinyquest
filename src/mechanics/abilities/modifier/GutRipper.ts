import { registerAbility } from '../../abilityRegistry';
import { modifyDamageRolls } from '../abilityFactories';

registerAbility({
    name: 'Gut Ripper',
    type: 'modifier',
    description: "Change all damage dice results to [6].",
    onDamageRoll: (state, { owner }) => {
        return modifyDamageRolls(state, owner, (rolls) => {
            return rolls.map(r => ({ ...r, value: 6, isRerolled: true }));
        });
    }
});
