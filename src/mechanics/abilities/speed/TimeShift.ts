import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Time Shift',
    type: 'speed',
    description: "Match opponent's speed for three rounds; no other speed abilities can be played during this time.",
    onActivate: (state) => {
        const heroSpeed = state.hero?.stats.speed || 0;
        // Calculate effective enemy speed? Assuming base speed for now or we might need a way to get current augmented speed.
        // state.enemy.stats is usually base + equipment. Modifications apply on top.
        // But for simplicity, we'll try to match their current apparent speed if possible, 
        // OR just base stats if we can't easily calculate total.
        // Ideally we should calculate totals. 
        // For now, let's just use the stats from state which should be the snapshot before round 1 modifications?
        // Actually combat state flows updates.

        // Let's assume we want to match their *base* stats speed for implementation simplicity and safety.
        // Or if we can, differentiate. 
        // "Match opponent's speed" typically means "My Speed = Enemy Speed".
        const enemySpeed = state.enemy?.stats.speed || 0;

        const diff = enemySpeed - heroSpeed;

        // If diff is 0, no change needed but we still apply 'effect' for duration tracking logic if we add blocking later.
        // If diff > 0, we add speed.
        // If diff < 0, we reduce speed.

        const newMod = {
            modification: {
                stats: { speed: diff },
                source: 'Time Shift',
                target: 'hero' as const
            },
            duration: 3,
            id: `time-shift-${state.round}`
        };

        // TODO: Implement blocking of other speed abilities while this is active.

        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Time Shift', type: 'info' }]
        };
    }
});
