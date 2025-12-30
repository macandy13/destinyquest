import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Swamp Legs',
    type: 'speed',
    description: "Reduce opponent's speed by 1 for one round.",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -1 },
                source: 'Swamp Legs',
                target: 'enemy' as const
            },
            duration: 1,
            id: `swamp-legs-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Swamp Legs', type: 'info' }]
        };
    }
});
