import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

registerAbility({
    name: 'First Cut',
    type: 'passive',
    description: 'Inflict 1 health damage (ignoring armour) before combat begins.',
    onCombatStart: (state: CombatState, target: CharacterType) => {
        const targetCombatant = state[target];

        if (!targetCombatant) return {};

        const damage = 1;

        return {
            [target]: { ...targetCombatant, stats: { ...targetCombatant.stats, health: Math.max(0, targetCombatant.stats.health - damage) } },
            damageDealt: [...state.damageDealt, { target: target, amount: damage, source: 'First Cut' }],
            logs: addLog(state.logs, { round: state.round, message: `First Cut deals ${damage} damage`, type: 'info' })
        };
    }
});
