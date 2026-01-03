import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../types/Dice';
import { isOpponentDamageRollPhase } from '../abilityFactories';
import { dealDamage, skipDamagePhase } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Overpower',
    type: 'combat',
    description: 'Stop an opponent\'s damage after they win a round and automatically inflict 2 damage dice (ignoring armour).',
    canActivate: isOpponentDamageRollPhase,
    onActivate: (state, context) => {
        if (!isOpponentDamageRollPhase(state, context)) return state;

        // Roll 2 dice for damage
        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);

        // Deal damage
        state = dealDamage(state, 'Overpower', getOpponent(context.owner), dmg);
        return skipDamagePhase(state, 'Overpower blocked attack');
    }
});
