import { registerAbility } from '../abilityRegistry';
import { hasDouble } from '../../utils/dice';
import { addLogs } from '../../utils/statUtils';

registerAbility({
    name: 'Life Spark',
    type: 'passive',
    description: 'Heal 4 health every time you roll a double.',
    onSpeedRoll: (state, source, rolls) => {
        if (state.hero && source === 'hero' && hasDouble(rolls)) {
            const newHealth = Math.min(state.hero.stats.maxHealth, state.hero.stats.health + 4);
            return {
                hero: {
                    ...state.hero, stats: {
                        ...state.hero.stats,
                        health: newHealth
                    }
                },
                logs: addLogs(state.logs, {
                    round: state.round,
                    message: 'Life Spark: Doubles during speed rolled! Healed 4 health, now at ' + newHealth,
                    type: 'info'
                })
            };
        }
        return {};
    },
    onDamageRoll: (state, target, rolls) => {
        if (state.hero && target === 'enemy' && hasDouble(rolls)) {
            const newHealth = Math.min(state.hero.stats.maxHealth, state.hero.stats.health + 4);
            return {
                hero: {
                    ...state.hero,
                    stats: {
                        ...state.hero.stats,
                        health: newHealth
                    }
                },
                logs: addLogs(state.logs, {
                    round: state.round,
                    message: 'Life Spark: Doubles during damage roll! Healed 4 health, now at ' + newHealth,
                    type: 'info'
                })
            };
        }
        return {};
    }
});
