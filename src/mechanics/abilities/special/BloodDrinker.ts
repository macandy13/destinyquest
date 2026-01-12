import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { healDamage, modifyDamageRolls } from '../../../types/combatState';
import { rollDie } from '../../../types/dice';

export const BloodDrinker: AbilityDefinition = {
    name: 'Blood Drinker',
    type: 'special',
    description: 'If the count rolls a 6 for damage, he rolls an extra die for damage and restores 2 health.',
    reviewed: false,
    onDamageRoll: (state, { owner }) => {
        if (state.winner !== owner) return state;
        const damage = state.damage;
        if (!damage) return state;

        const hasSix = damage.damageRolls.some(d => d.value === 6);
        if (hasSix) {
            const extraRoll = rollDie();
            const newRolls = [...damage.damageRolls, extraRoll];
            state = modifyDamageRolls(state, newRolls, 'Blood Drinker');
            state = healDamage(state, 'Blood Drinker', owner, 2);
        }
        return state;
    }
};

registerAbility(BloodDrinker);
