import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Lay of the Land',
    type: 'speed',
    description: 'Add one extra die to attack speed for one round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 1 },
                source: 'Lay of the Land',
                target: 'hero' as const
            },
            duration: 1,
            id: `lay-of-the-land-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Lay of the Land', type: 'info' }]
        };
    }
});
