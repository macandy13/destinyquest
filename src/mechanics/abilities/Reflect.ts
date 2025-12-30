import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Reflect',
    type: 'combat',
    description: 'Reflect health damage back to vampire opponents.',
    onDamageDealt: (state, target, amount) => {
        if (target !== 'hero' || amount <= 0) return {};

        const enemy = state.enemy;
        if (!enemy) return {};

        // Check for Vampire
        const isVampire = enemy.name.toLowerCase().includes('vampire') || (enemy.original.abilities || []).includes('Vampire');

        if (isVampire) {
            return {
                damageDealt: [...state.damageDealt, { target: 'enemy', amount: amount, source: 'Reflect' }], // Reflect full amount? "Reflect health damage back". Implicitly yes.
                logs: addLog(state.logs, { round: state.round, message: `Reflect! Sent ${amount} damage back to vampire.`, type: 'damage-enemy' })
            };
        }
        return {};
    }
});
