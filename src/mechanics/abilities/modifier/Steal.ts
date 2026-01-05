import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Steal',
    type: 'modifier',
    description: 'Raise one attribute (speed, brawn, magic, or armour) to match your opponent\'s for one round.',
    // TODO: Choice. Defaulting to Speed? Or Max difference?
    onActivate: (state, { owner }) => {
        // Placeholder implementation
        return state;
    }
});
