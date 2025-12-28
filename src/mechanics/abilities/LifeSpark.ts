import { registerAbility } from '../abilityRegistry';

const hasDoubles = (rolls: { value: number }[]) => {
    const values = rolls.map(r => r.value);
    return new Set(values).size !== values.length;
};

registerAbility({
    name: 'Life Spark',
    type: 'passive',
    description: 'Heal 4 health every time you roll a double.',
    onSpeedRoll: (state, rolls) => {
        if (state.hero && hasDoubles(rolls)) {
            const newHealth = Math.min(state.hero.stats.maxHealth, state.hero.stats.health + 4);
            return {
                hero: { ...state.hero, stats: { ...state.hero.stats, health: newHealth } },
                logs: [...state.logs, { round: state.round, message: 'Life Spark: Doubles rolled! Healed 4 health.', type: 'info' }]
            };
        }
        return {};
    },
    onDamageRoll: (state, rolls) => {
        if (state.hero && hasDoubles(rolls)) {
            const newHealth = Math.min(state.hero.stats.maxHealth, state.hero.stats.health + 4);
            return {
                hero: { ...state.hero, stats: { ...state.hero.stats, health: newHealth } },
                logs: [...state.logs, { round: state.round, message: 'Life Spark: Doubles rolled! Healed 4 health.', type: 'info' }]
            };
        }
        return {};
    }
});
