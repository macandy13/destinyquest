import { registerAbility } from '../../abilityRegistry';
import { hasDouble } from '../../../types/dice';
import { healDamage } from '../../../types/combatState';

registerAbility({
    name: 'Life Spark',
    type: 'passive',
    description: 'Heal 4 health every time you roll a double.',
    onSpeedRoll: (state, { owner }) => {
        if (owner === 'hero'
            && hasDouble(state.heroSpeedRolls ?? [])) {
            return healDamage(state, 'Life Spark', 'hero', 4);
        }
        return state;
    },
    onDamageRoll: (state, { owner }) => {
        if (owner === 'hero'
            && state.winner === 'hero'
            && hasDouble(state.damage?.damageRolls ?? [])) {
            return healDamage(state, 'Life Spark', 'hero', 4);
        }
        return state;
    }
});
