import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import { rollDice, sumDice } from '../../../types/dice';

registerAbility({
    name: 'First Strike',
    type: 'passive',
    description: 'Pre-combat damage. Inflict 1 damage die (ignoring armour) and any harmful passive abilities (venom/bleed) before combat begins.',
    onCombatStart: (state, { owner }) => {
        // TODO: Show dice and allow to reroll with charm?
        const damage = sumDice(rollDice(1));
        const target = getOpponent(owner);
        return dealDamage(state, 'First Strike', target, damage);
    }
});
