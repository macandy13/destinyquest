import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Heal',
    type: 'modifier',
    description: 'Instantly restore 4 health.',
    icon: '❤️',
    canActivate: (state) => {
        if (!state.hero) return false;
        return state.hero.stats.health < state.hero.stats.maxHealth;
    },
    onActivate: (state) => {
        if (!state.hero) return null;
        const currentHealth = state.hero.stats.health;
        const newHealth = Math.min(state.hero.stats.maxHealth, currentHealth + 4);

        return {
            hero: { ...state.hero, stats: { ...state.hero.stats, health: newHealth } },
            logs: addLog(state.logs, {
                round: state.round,
                message: 'Used ability: Heal. Restored 4 health.',
                type: 'info'
            })
        };
    }
});
