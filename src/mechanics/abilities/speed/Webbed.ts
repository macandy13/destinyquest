import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Webbed',
    type: 'speed',
    description: 'Reduce enemy speed dice',
    onActivate: (state) => ({
        modifications: [...state.modifications, { modification: { source: 'Webbed', target: 'enemy', stats: { speedDice: -1 } }, duration: 1, id: `webbed-${state.round}` }]
    })
});
