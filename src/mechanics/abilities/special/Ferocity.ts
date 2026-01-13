import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';

export const Ferocity: AbilityDefinition = {
    name: 'Ferocity',
    type: 'special',
    description: "If you roll a [6] for your attack speed, you roll an extra die to determine your damage score.",
    reviewed: false,
    onSpeedRoll: (state, { owner }) => {
        const rolls = owner === 'hero' ? state.heroSpeedRolls : state.enemySpeedRolls;
        if (!rolls) return state;

        const hasSix = rolls.some(r => r.value === 6);
        if (hasSix) {
            state = appendEffect(state, owner, {
                stats: { damageDice: 1 },
                source: 'Ferocity',
                target: owner,
                duration: 1,
                description: '+1 Damage Die'
            });
        }
        return state;
    }
};

registerAbility(Ferocity);
