import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Windblast',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round.",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -1 },
                source: 'Windblast',
                target: 'enemy' as const
            },
            duration: 1,
            id: `windblast-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Windblast', type: 'info' }]
        };
    }
});
