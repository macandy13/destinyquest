import { registerAbility } from '../abilityRegistry';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    // Simplistic check: enemy health <= hero speed
    // TODO: Check for sword in main hand if we had access to equipment here easily.
    // Usually state.hero.equipment.mainHand type check.
    const heroSpeed = state.hero?.stats.speed || 0;
    const enemyHealth = state.enemy?.stats.health || 0;
    return enemyHealth > 0 && enemyHealth <= heroSpeed;
}

registerAbility({
    name: 'Execution',
    type: 'speed',
    description: '(Requires sword in main hand). If an opponent’s health is equal to or less than your speed, you may reduce their health to zero at the start of a round (once per round).',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const enemyHealth = state.enemy?.stats.health || 0;
        const newMod = {
            modification: {
                stats: { health: -enemyHealth }, // reduce to zero
                source: 'Execution',
                target: 'enemy' as const
            },
            id: `execution-${state.round}`,
            duration: 1 // immediate effect essentially
        };
        return {
            modifications: [...state.modifications, newMod],
            logs: [...state.logs, { round: state.round, message: 'Used ability: Execution', type: 'info' }]
        };
    },
});
