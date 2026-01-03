import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../types/Dice';
import { isHeroDamageRollPhase } from '../abilityFactories';
import { dealDamage, skipDamagePhase } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Black Rain',
    type: 'combat',
    description: '(Requires bow in left hand). Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring their armour.',
    canActivate: isHeroDamageRollPhase,
    onActivate: (state, context) => {
        // TODO: Check if bow is in left hand
        if (!isHeroDamageRollPhase(state)) return state;

        const dmg = sumDice(rollDice(1));

        // TODO: Apply to each enemy
        state = dealDamage(state, 'Black Rain', getOpponent(context.owner), dmg);
        return skipDamagePhase(state, 'Black Rain dealing 1d6 to all enemies');
    }
});
