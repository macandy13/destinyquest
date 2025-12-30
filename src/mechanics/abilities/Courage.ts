import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Courage',
    type: 'speed',
    description: 'Increase speed by 4 for one combat round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 4 },
                source: 'Courage',
                target: 'hero' as const
            },
            duration: 1,
            id: `courage-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Courage', type: 'info' }]
        };
    }
});
