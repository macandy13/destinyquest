import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Bleed',
    type: 'passive',
    description: 'If your damage causes health damage, the opponent continues to take 1 damage (ignoring armour) at the end of each combat round.',
    onRoundEnd: (state, target) => {
        let activeEffects = [...(state.activeEffects || [])];
        let logs = [...state.logs];

        // 1. Application
        const targetTookDamage = state.damageDealt?.some(d => d.target === target && d.amount > 0);
        let hasBleed = activeEffects.some(e => e.modification.source === 'Bleed' && e.modification.target === target);
        if (targetTookDamage && !hasBleed) {
            activeEffects.push({
                id: `bleed-${target}`,
                modification: {
                    stats: { health: -1 },
                    source: 'Bleed',
                    target: target,
                },
            });
            logs = addLog(logs, { round: state.round, message: `Bleed applied to ${target}`, type: 'info' });
            hasBleed = true;
        }

        // 2. Effect
        if (!hasBleed) return { activeEffects, logs };

        let enemy = state.enemy;
        if (target === 'enemy') enemy!.stats.health -= 1;
        let hero = state.hero;
        if (target === 'hero') hero!.stats.health -= 1;

        return {
            enemy,
            hero,
            damageDealt: [...state.damageDealt, {
                target,
                amount: 1,
                source: 'Bleed'
            }],
            activeEffects,
            logs: addLog(logs, {
                round: state.round,
                message: `Bleed: +1 damage to ${target} (ignoring armour)`,
                type: 'info' as const
            })
        };
    }
});
