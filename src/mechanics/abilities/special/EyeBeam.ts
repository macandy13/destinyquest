import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

export const EyeBeam: AbilityDefinition = {
    name: 'Eye Beam',
    type: 'special',
    description: "If you roll a [6] for your attack speed, you can choose to deal 2 damage to your opponent immediately (this damage ignores armor).",
    reviewed: false,
    onSpeedRoll: (state, { owner }) => {
        const rolls = owner === 'hero' ? state.heroSpeedRolls : state.enemySpeedRolls;
        if (!rolls) return state;

        const hasSix = rolls.some(r => r.value === 6);
        if (hasSix) {
            const target = getOpponent(owner);
            // TODO: Select enemy
            state = dealDamage(state, 'Eye Beam', target, 2, 'Eye Beam deals 2 damage ignoring armour!');
        }
        return state;
    }
};

registerAbility(EyeBeam);
