import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { appendEffect, hasEffect } from '../../../types/combatState';

export const Frenzy: AbilityDefinition = {
    name: 'Frenzy',
    type: 'special',
    description: "If the Packmaster is alive, the Ghouls roll 2 damage dice.",
    reviewed: false,
    // TODO: This requires checking if another enemy (Packmaster) is alive in combat.
    // For now, we implement a simple onCombatStart buff.
    onRoundStart: (state, context) => {
        if (!hasEffect(state, context.owner, 'Frenzy')) {
            // MVP: Always apply the buff (assume Packmaster is alive if this ability is present)
            state = appendEffect(state, context.owner, {
                stats: { damageDice: 1 }, // +1 to base 1 = 2 dice
                source: 'Frenzy',
                target: context.owner,
                description: 'Frenzy: +1 Damage Die'
            });
        }
        return state;
    }
};

registerAbility(Frenzy);
