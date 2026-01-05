import { CombatState } from '../../../types/combatState';
import { AbilityContext, registerAbility } from '../../abilityRegistry';
import { canModifyDamageDice, createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Overload',
    type: 'combat',
    description: 'Roll an extra die for your damage score.',
    stats: { damageDice: 1 },
    duration: 1,
    target: 'hero',
    canActivate: (state: CombatState, context: AbilityContext) => canModifyDamageDice(state) && state.winner === context.owner
}));    
