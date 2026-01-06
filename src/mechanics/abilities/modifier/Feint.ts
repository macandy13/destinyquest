import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Feint',
    type: 'modifier',
    description: "Re-roll any or all attack speed dice.",
    onSpeedRoll: (state) => {
        // TODO Make user select dice
        return state;
    }
});
