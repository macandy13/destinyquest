import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Swift Strikes',
    type: 'passive',
    description: '(Requires two swords). For each [6] rolled for speed, inflict damage equal to your fastest weapon\'s speed, ignoring armour.',
    onSpeedRoll: (state, { owner }) => {
        // TODO: Check for 2 swords.

        // Check for 6s in owner's speed rolls.
        const rolls = state[owner === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];
        if (!rolls) return state;

        const sixes = rolls.filter(r => r.value === 6).length;
        if (sixes === 0) return state;

        // TODO: Implement correctly
        let dmgPerSix = 2; // placeholder

        const totalDmg = sixes * dmgPerSix;

        return dealDamage(state, 'Swift Strikes', getOpponent(owner), totalDmg);
    }
});
