import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Sidestep',
    type: 'combat',
    description: 'Avoid damage',
    onActivate: (state) => ({
        modifications: [...state.modifications, { modification: { source: 'Sidestep', target: 'hero', stats: { armour: 200 } }, duration: 1, id: `sidestep-${state.round}` }]
    })
});
