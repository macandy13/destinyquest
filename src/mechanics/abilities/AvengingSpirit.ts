import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'Avenging Spirit',
    type: 'combat',
    description: 'When you take health damage from an opponent’s damage score/dice, you inflict damage back equal to your armour. This ignores the opponent\'s armour and cannot be increased by modifier abilities.',
    onDamageDealt: (state, target, amount) => {
        // Trigger: When YOU (hero) take damage.
        // target is the victim.
        if (amount <= 0) return {};
        const victim = state[target];
        if (!victim) return {};

        // TODO: Filter damage source to be Attack
        const victimArmour = victim.stats.armour || 0;

        // Inflict damage back to opponent (enemy)
        // Ignoring armour -> direct health reduction
        // TODO: Simplify conversion to opponent
        const opponent = target == 'hero' ? 'enemy' : 'hero';
        if (!opponent) return {};

        const damageBack = victimArmour;
        if (damageBack <= 0) return {};

        return {
            damageDealt: [...state.damageDealt, { target: opponent, amount: damageBack, source: 'Avenging Spirit' }],
            logs: addLog(state.logs, { round: state.round, message: `Avenging Spirit: Inflicted ${damageBack} damage back to opponent!`, type: 'damage-enemy' })
        };
    }
});
