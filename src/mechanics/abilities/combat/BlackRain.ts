import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../utils/dice';
import { isHeroDamageRollPhase } from '../abilityFactories';
import { dealDamage } from '../../../types/combat';

registerAbility({
    name: 'Black Rain',
    type: 'combat',
    description: '(Requires bow in left hand). Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring their armour.',
    canActivate: isHeroDamageRollPhase,
    onActivate: (state) => {
        // TODO: Check if bow is in left hand
        if (!isHeroDamageRollPhase(state)) return {};

        const dmg = sumDice(rollDice(1));

        // TODO: Apply to each enemy
        return {
            ...dealDamage(state, 'Black Rain', 'enemy', dmg),
            phase: 'round-end'
        };
    }
});
