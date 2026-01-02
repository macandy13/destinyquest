import { dealDamage } from '../../types/combat';
import { getOpponent } from '../../types/stats';
import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Judgement',
    type: 'combat',
    description: 'When taking health damage, inflict damage back equal to half your speed score (rounding up), ignoring armour.',
    onDamageDealt: (state, owner, target, amount) => {
        if (target !== owner || amount <= 0) return {};

        const speed = state.hero?.stats.speed || 0;
        const dmgBack = Math.ceil(speed / 2);

        return dealDamage(state, 'Judgement', getOpponent(target), dmgBack);
    }
});
