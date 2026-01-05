import { registerAbility } from '../../abilityRegistry';
import { sumDice, rollDice, formatDice } from '../../../types/dice';
import { isOpponentDamageRollPhase } from '../abilityFactories';
import { dealDamage, skipDamagePhase } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Backfire',
    type: 'combat',
    description: 'Instead of rolling for damage after winning a round, automatically inflict 3 damage dice to your opponent, but also take 2 damage dice to yourself (ignoring armour).',
    canActivate: isOpponentDamageRollPhase,
    onActivate: (state, context) => {
        if (!isOpponentDamageRollPhase(state, context)) return state;

        // Roll 3 dice for enemy
        const enemyRolls = rollDice(3);
        const enemyDamage = sumDice(enemyRolls);

        // Roll 2 dice for self
        const selfRolls = rollDice(2);
        const selfDamage = sumDice(selfRolls);

        state = dealDamage(state, `Backfire (enemy) rolled 3d6: ${formatDice(enemyRolls)}`, getOpponent(context.owner), enemyDamage);
        state = dealDamage(state, `Backfire (self) rolled 2d6: ${formatDice(selfRolls)}`, context.owner, selfDamage);
        return skipDamagePhase(state, 'Backfire skipped normal damage roll');
    }
});
