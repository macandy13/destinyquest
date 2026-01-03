import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Adrenaline',
    type: 'speed',
    description: 'Increase your speed by 2 for two combat rounds.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: 2 },
                source: 'Adrenaline',
                target: 'hero' as const
            },
            duration: 2,
            id: `adrenaline-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Adrenaline', type: 'info' }]
        };
    }
});
