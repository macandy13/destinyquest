import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Stun',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round (used once per combat).",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -1 },
                source: 'Stun',
                target: 'enemy' as const
            },
            duration: 1,
            id: `stun-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Stun', type: 'info' }]
        };
    }
});
