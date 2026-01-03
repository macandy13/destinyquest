import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Chill Touch',
    type: 'speed',
    description: "Reduce your opponent's speed by 2 for one round.",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -2 },
                source: 'Chill Touch',
                target: 'enemy' as const
            },
            duration: 1,
            id: `chill-touch-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Chill Touch', type: 'info' }]
        };
    }
});
