import { AbilityContext, registerAbility } from '../../abilityRegistry';
import { CombatState, appendEffect, hasEffect } from '../../../types/combatState';
import type { DamageDescriptor } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Cripple',
    type: 'combat',
    description: "If you cause health damage, the opponent's speed score is lowered by 1 for the next 3 rounds.",
    // TODO: This check is wrong
    canActivate: (state: CombatState, { owner }: AbilityContext) => {
        return !hasEffect(state, owner, 'Cripple') && state.damageDealt.some((d: DamageDescriptor) => d.source === 'Melee' && d.amount > 0);
    },
    onActivate: (state: CombatState, { owner }: AbilityContext) => {
        const target = getOpponent(owner);
        return appendEffect(state, target, {
            stats: { speed: -1 },
            source: 'Cripple',
            target: target,
            duration: 3
        });
    }
});
