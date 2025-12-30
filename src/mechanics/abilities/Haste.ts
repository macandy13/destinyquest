import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Haste',
    type: 'speed',
    description: 'Roll an extra die for attack speed for one round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 1 },
                source: 'Haste',
                target: 'hero' as const
            },
            duration: 1,
            id: `haste-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Haste', type: 'info' }]
        };
    }
});
