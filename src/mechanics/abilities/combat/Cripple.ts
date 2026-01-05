import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { CombatState, appendEffect } from '../../../types/combatState';
import { isOwnerDamageRollPhase } from '../abilityFactories';

registerAbility({
    name: 'Cripple',
    type: 'combat',
    description: "If you cause health damage, the opponent's speed score is lowered by 1 for the next 3 rounds.",
    canActivate: (state: CombatState, context: AbilityContext) => {
        return isOwnerDamageRollPhase(state, context);
    },
    // TODO: Should not be a passive ability and work on onDamageDealt
    onDamageDealt: (state: CombatState, { owner, target }: AbilityContext, _source: string, amount: number) => {
        if (amount <= 0 || target === owner) return state;
        return appendEffect(state, target!, {
            stats: { speed: -1 },
            source: 'Cripple',
            target: target!,
            duration: 3
        });
    }
});
