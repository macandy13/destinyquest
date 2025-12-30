import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: "Cat's Speed",
    type: 'speed',
    description: 'Roll an extra die to determine attack speed for one round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 1 },
                source: "Cat's Speed",
                target: 'hero' as const
            },
            duration: 1,
            id: `cats-speed-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: "Used ability: Cat's Speed", type: 'info' }]
        };
    }
});
