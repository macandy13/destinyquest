import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Second Wind',
    type: 'modifier',
    description: 'Restore one already-played speed ability for yourself or an ally.',
    onActivate: (state) => {
        // TODO: Implement choice
        return state; // TODO: Implement when usage tracking is solid.
    }
});
