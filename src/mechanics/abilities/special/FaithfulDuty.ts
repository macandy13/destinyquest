import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { appendEffect, hasEffect, healDamage, useAbility, getCombatant } from '../../../types/combatState';

export const FaithfulDuty: AbilityDefinition = {
    name: 'Faithful duty',
    type: 'special',
    description: "If the hero's health drops to 4 or less, restore 10 health. This ability can only be used once per combat.",
    reviewed: false,
    uses: 1,
    onDamageDealt: (state, { owner }) => {
        if (hasEffect(state, owner, 'Faithful duty')) {
            return state;
        }

        const currentHealth = getCombatant(state, owner).stats.health;
        if (currentHealth > 4) return state;

        state = appendEffect(state, owner, {
            stats: {},
            source: 'Faithful duty',
            target: owner,
        });
        state = useAbility(state, owner, 'Faithful duty');
        return healDamage(state, 'Faithful duty', owner, 10);
    }
};

registerAbility(FaithfulDuty);
