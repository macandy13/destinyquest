import { CombatState } from '../../../types/CombatState';
import { registerAbility } from '../../abilityRegistry';
import { AbilityContext } from '../../abilityRegistry';

registerAbility({
    name: 'Trample',
    type: 'special',
    description: 'If the enemy rolls a 6 on their damage roll, add 5 to the damage.',
    onDamageCalculate: (state: CombatState, context: AbilityContext) => {
        if (context.owner !== 'enemy' || context.target !== 'hero') {
            return 0;
        }
        return state.damage!.damageRolls.some(r => r.value === 6) ? 5 : 0;
    }
});