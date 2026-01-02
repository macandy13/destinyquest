import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    if (!state.hero) return false;
    return state.hero.stats.health < state.hero.stats.maxHealth;
}

registerAbility({
    name: 'Heal',
    type: 'modifier',
    description: 'Instantly restore 4 health.',
    icon: '❤️',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;
        if (!state.hero) return null; // TS narrowing again or trust canActivate? canActivate checks it.
        // But TS might lose context. state.hero is checked in canActivate but compiler doesn't know it persists?
        // Let's keep explicit check or use ! assertion if confident. Explicit check is safer/cleaner for TS.
        const currentHealth = state.hero.stats.health;
        const newHealth = Math.min(state.hero.stats.maxHealth, currentHealth + 4);

        return {
            hero: { ...state.hero, stats: { ...state.hero.stats, health: newHealth } },
            logs: addLogs(state.logs, {
                round: state.round,
                message: 'Used ability: Heal. Restored 4 health.',
                type: 'info'
            })
        };
    }
});
