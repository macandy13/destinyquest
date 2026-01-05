import { dealDamage, CombatState } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import { registerAbility, AbilityContext } from '../../abilityRegistry';

registerAbility({
    name: 'Judgement',
    type: 'combat',
    description: 'When taking health damage, inflict damage back equal to half your speed score (rounding up), ignoring armour.',
    onDamageDealt: (state: CombatState, context: AbilityContext, _source: string, damageDealt: number) => {
        const owner = context.owner;
        const target = context.target;
        if (target !== owner || damageDealt <= 0) return state;

        const speed = state.hero?.stats.speed || 0;
        const dmgBack = Math.ceil(speed / 2);

        return dealDamage(state, 'Judgement', getOpponent(target), dmgBack);
    }
});
