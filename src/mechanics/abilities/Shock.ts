import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Shock!',
    type: 'combat',
    description: "If causing health damage, inflict 1 extra damage for every 2 points of opponent's armour.",
    onDamageDealt: (state, target, amount) => {
        // Trigger if we deal damage to enemy causing health damage (amount > 0)
        if (target !== 'enemy' || amount <= 0) return {};

        const oppArmour = state.enemy?.stats.armour || 0;
        const extra = Math.floor(oppArmour / 2);

        if (extra <= 0) return {};

        return {
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: extra, source: 'Shock!' }],
            logs: addLog(state.logs, { round: state.round, message: `Shock! Inflicted ${extra} extra damage.`, type: 'damage-hero' })
        };
    }
});
