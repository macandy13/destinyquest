import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Radiance',
    type: 'speed',
    description: "Lower opponent's speed by 2 for one round.",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -2 },
                source: 'Radiance',
                target: 'enemy' as const
            },
            duration: 1,
            id: `radiance-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Radiance', type: 'info' }]
        };
    }
});
