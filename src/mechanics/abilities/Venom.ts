import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { getOpponent } from '../../types/stats';
import { CombatLog, dealDamage } from '../../types/combat';

registerAbility({
    name: 'Venom',
    type: 'passive',
    description: 'If causing health damage, opponent loses 2 health (ignoring armour) at the end of every round.',
    onRoundEnd: (state, owner) => { // target is type CharacterType (the one suffering damage)
        let activeEffects = [...(state.activeEffects || [])];
        // Target is who takes the damage (e.g. if Enemy uses Venom, target is 'hero')
        const target = getOpponent(owner);
        const victim = state[target];
        if (!victim) return {};

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
            hasVenom = true;
        }

        const venomAppliedLog: CombatLog = {
            round: state.round,
            message: `Venom applied to ${target}`,
            type: 'info'
        };

        // 2. Effect
        if (!hasVenom) return {
            activeEffects,
            logs: addLog(state.logs, venomAppliedLog)
        };

        const damageUpdates = dealDamage(state, 'Venom', target, damage);
        return {
            ...damageUpdates,
            activeEffects,
            logs: addLog(state.logs, venomAppliedLog)
        };
    }
});
