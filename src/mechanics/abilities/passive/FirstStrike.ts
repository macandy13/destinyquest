import { registerAbility } from '../../abilityRegistry';
import { CombatState, dealDamage } from '../../../types/combat';
import { CharacterType, getOpponent } from '../../../types/stats';

registerAbility({
    name: 'First Strike',
    type: 'passive',
    description: 'Pre-combat damage. Inflict 1 damage die (ignoring armour) and any harmful passive abilities (venom/bleed) before combat begins.',
    onCombatStart: (state: CombatState, owner: CharacterType) => {
        // TODO: Show dice and allow to reroll with charm?
        const damage = Math.floor(Math.random() * 6) + 1;
        const target = getOpponent(owner);
        return dealDamage(state, 'First Strike', target, damage);
    }
});
