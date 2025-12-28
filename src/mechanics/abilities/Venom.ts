import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Venom',
    type: 'passive',
    description: 'If causing health damage, opponent loses 2 health (ignoring armour) at the end of every round.',
    onRoundEnd: (state) => {
        let activeEffects = [...(state.activeEffects || [])];
        let logs = [...state.logs];
        let damageDealt = [...state.damageDealt];
        let enemy = { ...state.enemy! };

        const hasMastery = state.activeAbilities.some(a => a.name === 'Poison Mastery');
        const hasDeadly = state.activeAbilities.some(a => a.name === 'Deadly Poisons');
        let damage = 2;
        if (hasMastery) damage = 4;
        else if (hasDeadly) damage = 3;

        // 1. Application
        const enemyTookDamage = state.damageDealt?.some(d => d.target === 'enemy' && d.amount > 0);
        let hasVenom = activeEffects.some(e => e.modification.source === 'Venom' && e.modification.target === 'enemy');
        if (enemyTookDamage && !hasVenom) {
            activeEffects.push({
                id: 'venom-enemy',
                modification: {
                    stats: { health: -damage },
                    source: 'Venom',
                    target: 'enemy',
                },
            });
            logs = addLog(logs, { round: state.round, message: 'Venom applied to enemy', type: 'info' });
            hasVenom = true;
        }

        // 2. Effect
        if (!hasVenom) return { activeEffects, logs };

        return {
            enemy: { ...enemy, health: Math.max(0, enemy.health - damage) },
            damageDealt: [...damageDealt, { target: 'enemy', amount: damage, source: 'Venom' }],
            activeEffects,
            logs: addLog(logs, {
                round: state.round,
                message: `Venom: +${damage} damage to enemy (ignoring armour)`,
                type: 'info' as const
            })
        };
    }
});
