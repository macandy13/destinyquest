import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Critical Strike',
    type: 'modifier',
    description: 'All 6s',
    onActivate: (state) => ({
        damageRolls: state.damageRolls!.map(r => ({ ...r, value: 6 }))
    })
});
