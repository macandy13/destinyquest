import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../types/dice';
import { dealDamage, skipDamagePhase } from '../../../types/combatState';
import { isOwnerDamageRollPhase } from '../abilityFactories';

registerAbility({
    name: 'Cleave',
    type: 'combat',
    description: 'Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring armour.',
    canActivate: isOwnerDamageRollPhase,
    onActivate: (state) => {
        const damageRoll = rollDice(1);
        const damage = sumDice(damageRoll);

        // TODO: Apply to all enemies
        state = dealDamage(state, 'Cleave', 'enemy', damage);

        return skipDamagePhase(state, 'Cleave struck all enemies');
    }
});
