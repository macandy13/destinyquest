import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Demolish',
    type: 'speed',
    description: "Reduce the opponent's speed dice by 1 for one round and lower their armour by 1 for the remainder of the combat.",
    onActivate: (state) => {
        const speedMod = {
            modification: {
                stats: { speed: -1 },
                source: 'Demolish',
                target: 'enemy' as const
            },
            duration: 1,
            id: `demolish-speed-${state.round}`
        };
        const armourMod = {
            modification: {
                stats: { armour: -1 },
                source: 'Demolish',
                target: 'enemy' as const
            },
            // remainder of combat -> no duration or infinite
            duration: undefined,
            id: `demolish-armour-${state.round}`
        };

        return {
            modifications: [...state.modifications, speedMod, armourMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Demolish', type: 'info' }]
        };
    }
});
