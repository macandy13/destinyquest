import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { Target } from '../../types/stats';

registerAbility({
    name: 'First Strike',
    type: 'passive',
    description: 'Pre-combat damage. Inflict 1 damage die (ignoring armour) and any harmful passive abilities (venom/bleed) before combat begins.',
    onCombatStart: (state: CombatState, target: Target) => {
        // TODO: Show dice and allow to reroll with charm?
        const damage = Math.floor(Math.random() * 6) + 1;
        const targetCombatant = state[target];

        if (!targetCombatant) return {};

        return {
            [target]: { ...targetCombatant, stats: { ...targetCombatant.stats, health: Math.max(0, targetCombatant.stats.health - damage) } },
            damageDealt: [...state.damageDealt, { target: target, amount: damage, source: 'First Strike' }],
            logs: addLog(state.logs, { round: state.round, message: `First Strike deals ${damage} damage`, type: 'info' })
        };
    }
});
