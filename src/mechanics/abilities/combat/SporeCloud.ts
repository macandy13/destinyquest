import { registerAbility } from '../../abilityRegistry';
import { addLogs, dealDamage } from '../../../types/CombatState';
import { rollDice, sumDice } from '../../../types/Dice';
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
        const rolls = dmgRolls.map(r => r.value);
        const opponent = getOpponent(owner);

        let newState = dealDamage(state, 'Spore Cloud', opponent, dmg);
        return addLogs(newState, {
            round: state.round,
            message: `Spore Cloud! Inflicted ${dmg} damage back (${rolls.join('+')}).`,
            type: 'damage-enemy'
        });
    }
});
