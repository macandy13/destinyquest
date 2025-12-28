import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Deep Wound',
    type: 'combat',
    description: 'Extra die',
    onActivate: (state) => ({
        modifications: [...state.modifications, { modification: { source: 'Deep Wound', target: 'hero', stats: { damageDice: 1 } }, duration: 1, id: `deep-${state.round}` }]
    })
});
