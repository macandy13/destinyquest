import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Curse',
    type: 'speed',
    description: 'Reduce the number of dice your opponent rolls for attack speed by 1 for one round.',
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -1 },
                source: 'Curse',
                target: 'enemy' as const
            },
            duration: 1,
            id: `curse-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Curse', type: 'info' }]
        };
    }
});
