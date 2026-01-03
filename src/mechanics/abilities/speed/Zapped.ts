import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Zapped!',
    type: 'speed',
    description: "Lower opponent's speed, brawn, and magic by 3 until the end of the round.",
    onActivate: (state) => {
        const newMod = {
            modification: {
                stats: { speed: -3, brawn: -3, magic: -3 },
                source: 'Zapped!',
                target: 'enemy' as const
            },
            duration: 1,
            id: `zapped-${state.round}`
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Zapped!', type: 'info' }]
        };
    }
});
