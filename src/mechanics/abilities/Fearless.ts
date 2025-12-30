import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Fearless',
    type: 'speed',
    description: 'Raise speed by 2 for one round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 2 },
                source: 'Fearless',
                target: 'hero' as const
            },
            duration: 1,
            id: `fearless-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Fearless', type: 'info' }]
        };
    }
});
