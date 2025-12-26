import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Charge',
    type: 'speed',
    description: 'Increase speed by 2 in the first round of combat.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 2 },
                source: 'Charge',
                target: 'hero' as const
            },
            duration: 1,
            id: `charge-${state.round}`
        };
        const newModifications = [...state.modifications, newMod];
        return {
            modifications: newModifications,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Charge', type: 'info' }]
        };
    }
});
