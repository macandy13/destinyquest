import { registerAbility } from '../../abilityRegistry';
import { hasDouble, DiceRoll } from '../../../types/dice';
import { dealDamage } from '../../../types/combatState';
import { CharacterType, getOpponent } from '../../../types/character';
import { CombatState } from '../../../types/combatState';

function inflictDarkClawDamage(state: CombatState, source: CharacterType, rolls: DiceRoll[]) {
    if (!hasDouble(rolls)) {
        return state;
    }

    const target = getOpponent(source);
    return dealDamage(state, 'Dark Claw', target, 4);
}

registerAbility({
    name: 'Dark Claw',
    type: 'passive',
    description: 'For every double rolled, automatically inflict 4 damage (ignoring armour).',
    onSpeedRoll: (state, { owner }) => {
        const rolls = owner === 'hero' ? state.heroSpeedRolls : state.enemySpeedRolls;
        if (!rolls) return state;
        return inflictDarkClawDamage(state, owner, rolls);
    },
    onDamageRoll: (state, { owner }) => {
        // Only valid if owner WON the round (is damage roller)
        if (state.winner !== owner) return state;
        const rolls = state.damage?.damageRolls;
        if (!rolls) return state;
        return inflictDarkClawDamage(state, owner, rolls);
    }
});
