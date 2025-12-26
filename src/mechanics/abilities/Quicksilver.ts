import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Quicksilver',
    type: 'speed',
    description: 'Increase speed by 2 for one round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 2 },
                source: 'Quicksilver',
                target: 'hero' as const
            },
            duration: 1,
            id: `quicksilver-${state.round}`
        };
        const newModifications = [...state.modifications, newMod];
        return {
            modifications: newModifications,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Quicksilver', type: 'info' }]
        };
    }
});
