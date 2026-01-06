import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Brain Drain',
    type: 'modifier',
    description: 'Spend up to 5 magic points to increase your damage score by 1 per point spent. Magic is restored after combat.',
    onActivate: (state) => {
        // TODO: Implement user choice.
        return state;
    }
});
