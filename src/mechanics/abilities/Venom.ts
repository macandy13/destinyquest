import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Venom',
    type: 'passive',
    description: 'If causing health damage, opponent loses 2 health (ignoring armour) at the end of every round.',
    onRoundEnd: (state, target) => {
        let activeEffects = [...(state.activeEffects || [])];
        let logs = [...state.logs];
        let damageDealt = [...state.damageDealt];
        // Target is who takes the damage (e.g. if Enemy uses Venom, target is 'hero')
        const victim = state[target];
        if (!victim) return {};
        let victimClone = { ...victim };

        // TODO: Only apply if the active ability is from the opponent, otherwise the hero would suffer from its own mastery
        const hasMastery = state.activeAbilities.some(a => a.name === 'Poison Mastery');
        const hasDeadly = state.activeAbilities.some(a => a.name === 'Deadly Poisons');
        let damage = 2;
        if (hasMastery) damage = 4;
        else if (hasDeadly) damage = 3;

        // 1. Application
        const enemyTookDamage = state.damageDealt?.some(d => d.target === target && d.amount > 0);
        let hasVenom = activeEffects.some(e => e.modification.source === 'Venom' && e.modification.target === target);
        if (enemyTookDamage && !hasVenom) {
            activeEffects.push({
                id: `venom-${target}`,
                modification: {
                    stats: { health: -damage },
                    source: 'Venom',
                    target: target,
                },
            });
            logs = addLog(logs, { round: state.round, message: `Venom applied to ${target}`, type: 'info' });
            hasVenom = true;
        }

        // 2. Effect
        if (!hasVenom) return { activeEffects, logs };

        return {
            [target]: { ...victimClone, stats: { ...victimClone.stats, health: Math.max(0, victimClone.stats.health - damage) } },
            damageDealt: [...damageDealt, { target: target, amount: damage, source: 'Venom' }],
            activeEffects,
            logs: addLog(logs, {
                round: state.round,
                message: `Venom: +${damage} damage to ${target} (ignoring armour)`,
                type: 'info' as const
            })
        };
    }
});
