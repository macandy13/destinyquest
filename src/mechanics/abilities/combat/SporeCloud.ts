import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/CombatState';
import { formatDice, rollDice, sumDice } from '../../../types/Dice';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Spore Cloud',
    type: 'combat',
    description: 'When taking health damage, inflict 2 damage dice back (ignoring armour).',
    onDamageDealt: (state, { owner, target }, _source, amount) => {
        // Trigger if owner (me) is the target (victim) of damage
        if (owner !== target || amount <= 0) return state;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);
        const opponent = getOpponent(owner);

        return dealDamage(state, 'Spore Cloud', opponent, dmg, `Spore Cloud rolled 2d6 (${formatDice(dmgRolls)})`);
    }
});
