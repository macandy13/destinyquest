import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { sumDice, rollDice } from '../../../utils/dice';
import { isOpponentDamageRollPhase } from '../abilityFactories';
import { getOpponent } from '../../../types/stats';

registerAbility({
    name: 'Backfire',
    type: 'combat',
    description: 'Instead of rolling for damage after winning a round, automatically inflict 3 damage dice to your opponent, but also take 2 damage dice to yourself (ignoring armour).',
    canActivate: isOpponentDamageRollPhase,
    onActivate: (state, owner) => {
        if (!isOpponentDamageRollPhase(state, owner)) return null;

        // Roll 3 dice for enemy
        const enemyRolls = rollDice(3);
        const enemyDamage = sumDice(enemyRolls);

        // Roll 2 dice for self
        const selfRolls = rollDice(2);
        const selfDamage = sumDice(selfRolls);

        const newDamageDealt = [
            ...state.damageDealt,
            {
                target: getOpponent(owner),
                amount: enemyDamage,
                source: 'Backfire'
            },
            {
                target: owner,
                amount: selfDamage,
                source: 'Backfire'
            }
        ];

        // TODO: Use dealDamage function
        return {
            phase: 'round-end', // Skip normal damage
            damageRolls: enemyRolls,
            damageDealt: newDamageDealt,
            logs: addLogs(state.logs, {
                round: state.round,
                message: `Backfire! Inflicted ${enemyDamage} to opponent (${enemyRolls.join('+')}), took ${selfDamage} damage (${selfRolls.join('+')}).`,
                type: 'info'
            })
        };
    }
});
