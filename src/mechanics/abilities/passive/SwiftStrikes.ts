import { registerAbility } from '../../abilityRegistry';
import { dealDamage, hasEquipment } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Swift Strikes',
    type: 'passive',
    description: '(Requires two swords). For each [6] rolled for speed, inflict damage equal to your fastest weapon\'s speed, ignoring armour.',
    onSpeedRoll: (state, { owner }) => {
        if (!(
            hasEquipment(state.hero, /sword/, ['mainHand']) &&
            hasEquipment(state.hero, /sword/, ['leftHand']))) return state;

        // Check for 6s in owner's speed rolls.
        const rolls = state[owner === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];
        if (!rolls) return state;

        const sixes = rolls.filter(r => r.value === 6).length;
        if (sixes === 0) return state;

        const damagePerSix = Math.max(
            state.hero.original.equipment.mainHand?.stats?.speed || 0,
            state.hero.original.equipment.leftHand?.stats?.speed || 0);
        const totalDmg = sixes * damagePerSix;

        return dealDamage(state, 'Swift Strikes', getOpponent(owner), totalDmg);
    }
});
