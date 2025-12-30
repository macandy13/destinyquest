import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Knockdown',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round.",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -1 },
                source: 'Knockdown',
                target: 'enemy' as const
            },
            duration: 1,
            id: `knockdown-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Knockdown', type: 'info' }]
        };
    }
});
