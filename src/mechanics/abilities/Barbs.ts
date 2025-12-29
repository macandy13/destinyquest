import { addLog } from '../../utils/statUtils';
import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Barbs',
    type: 'passive',
    description: 'At the end of every combat round, automatically inflict 1 damage to all opponents.',
    onRoundEnd: (state, target) => {
        const victim = state[target];
        if (!victim) return {};
        const newHealth = Math.max(0, victim.stats.health - 1);
        if (newHealth < victim.stats.health) {
            return {
                [target]: { ...victim, stats: { ...victim.stats, health: newHealth } },
                logs: addLog(state.logs, {
                    round: state.round,
                    message: 'Barbs inflicts 1 damage.',
                    type: `damage-${target}` as any
                }),
                additionalEnemyDamage: [...state.additionalEnemyDamage ?? [], {
                    type: `damage-${target}`,
                    amount: 1,
                    source: 'Barbs'
                }]
            };
        }
        return {};
    }
});
