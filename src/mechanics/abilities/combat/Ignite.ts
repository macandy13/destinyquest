import { registerAbility } from '../../abilityRegistry';
import { appendEffect, dealDamage } from '../../../types/combatState';
import { rollDice, sumDice } from '../../../types/dice';
import { Effect } from '../../../types/effect';
import { getOpponent } from '../../../types/character';
import { canModifyDamage } from '../abilityFactories';

registerAbility({
    name: 'Ignite',
    type: 'combat',
    description: 'After winning a round, roll 2 damage dice and apply to each opponent (ignoring armour) and cause them to burn.',
    canActivate: canModifyDamage,
    onActivate: (state, { owner }) => {
        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);
        const opponent = getOpponent(owner);

        // Apply Burn effect
        const effect: Effect = {
            stats: {},
            source: 'Ignite',
            target: opponent,
            duration: undefined // Burn lasts until removed
        };

        state = dealDamage(state, 'Ignite', opponent, dmg);
        state = appendEffect(state, opponent, effect);
        return {
            ...state,
            phase: 'apply-damage' // Ignite ends the round (replaces normal attack?)
        };
    }
});
