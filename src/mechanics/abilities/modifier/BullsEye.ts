import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';
import { rollDice, sumDice } from '../../../types/dice';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: "Bull's Eye",
    type: 'modifier',
    description: 'Before combat starts, fire an arrow/bullet to automatically inflict 1 damage die (ignoring armour). This also applies passive effects like venom and bleed.',
    onCombatStart: (state, { owner }) => {
        const dmgRoll = rollDice(1);
        const damage = sumDice(dmgRoll);
        const opponent = getOpponent(owner);

        state = dealDamage(state, "Bull's Eye", opponent, damage);
        return state;
    }
});
