import { AbilityContext, registerAbility } from '../../abilityRegistry';
import { createRetaliationAbility } from '../abilityFactories';
import { CombatState, hasEffect } from '../../../types/combatState';

registerAbility(createRetaliationAbility({
    name: 'Riposte',
    type: 'combat',
    description: 'When taking health damage, inflict 1 damage die back (ignoring armour).',
    damageDice: 1,
    canActivate: (state: CombatState, context: AbilityContext): boolean => {
        return !hasEffect(state, context.owner, 'Expertise');
    },
}));
