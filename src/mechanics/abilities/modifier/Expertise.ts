import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';

registerAbility({
    name: 'Expertise',
    type: 'modifier',
    description: 'Ignore damage from counter-attack abilities like riposte, deflect, or brutality.',
    onCombatStart: (state, { owner }) => {
        // TODO: Should this only last for this round?
        return appendEffect(state, owner, {
            stats: {},
            source: 'Expertise',
            target: owner,
            duration: undefined // Duration combat
        });
    }
});
// TODO: I need to update Riposte etc to respect this.
