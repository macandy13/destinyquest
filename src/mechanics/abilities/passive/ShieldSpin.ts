import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';
import { rollDice, sumDice } from '../../../types/dice';

registerAbility({
    name: 'Shield Spin',
    type: 'passive',
    description: 'Opponents take 1 damage die (ignoring armour) for every [1] they roll for speed.',
    // TODO: Should this be done during end of round instead?
    onSpeedRoll: (state, { owner }) => {
        // "Opponents take 1 damage... for every [1] they roll for speed"
        // If owner is hero, opponent is enemy.
        // Check enemy speed rolls.
        const opponent = owner === 'hero' ? 'enemy' : 'hero';
        const rolls = opponent === 'enemy' ? state.enemySpeedRolls : state.heroSpeedRolls;
        if (!rolls) return state;

        const ones = rolls.filter(r => r.value === 1).length;
        if (ones === 0) return state;

        const dmgResults = rollDice(ones);
        const totalDmg = sumDice(dmgResults);

        return dealDamage(state, 'Shield Spin', opponent, totalDmg);
    }
});
