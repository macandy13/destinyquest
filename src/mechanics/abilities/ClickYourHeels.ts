import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Click Your Heels',
    type: 'speed',
    description: 'Raise speed by 2 for one combat round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 2 },
                source: 'Click Your Heels',
                target: 'hero' as const
            },
            duration: 1,
            id: `click-your-heels-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Click Your Heels', type: 'info' }]
        };
    }
});
