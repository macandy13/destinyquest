import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Snakes Alive!',
    type: 'speed',
    description: "Lower opponent's speed by 2 for one round.",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -2 },
                source: 'Snakes Alive!',
                target: 'enemy' as const
            },
            duration: 1,
            id: `snakes-alive-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Snakes Alive!', type: 'info' }]
        };
    }
});
