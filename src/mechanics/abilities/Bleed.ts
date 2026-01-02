import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';
import { getOpponent } from '../../types/stats';
import { CombatLog, dealDamage } from '../../types/combat';

registerAbility({
    name: 'Bleed',
    type: 'passive',
    description: 'If your damage causes health damage, the opponent continues to take 1 damage (ignoring armour) at the end of each combat round.',
    onRoundEnd: (state, owner) => {
        const opponent = getOpponent(owner);
        let activeEffects = [...(state.activeEffects || [])];

        // 1. Application
        const targetTookDamage = state.damageDealt?.some(d => d.target === opponent && d.amount > 0);
        let hasBleed = activeEffects.some(e => e.modification.source === 'Bleed' && e.modification.target === opponent);
        if (targetTookDamage && !hasBleed) {
            activeEffects.push({
                id: `bleed-${opponent}`,
                modification: {
                    stats: { health: -1 },
                    source: 'Bleed',
                    target: opponent,
                },
            });
            hasBleed = true;
        }

        const bleedLog: CombatLog = {
            round: state.round,
            message: `Bleed applied to ${opponent}`,
            type: 'info'
        };

        // 2. Effect
        if (!hasBleed) return { activeEffects, logs: addLogs(state.logs, bleedLog) };

        const damageUpdates = dealDamage(state, 'Bleed', opponent, 1);
        return {
            ...damageUpdates,
            activeEffects,
            logs: addLogs(damageUpdates.logs ?? [], bleedLog),
        };
    }
});
