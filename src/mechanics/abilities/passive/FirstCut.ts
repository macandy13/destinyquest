import { registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';

registerAbility({
    name: 'First Cut',
    type: 'passive',
    description: 'Inflict 1 health damage (ignoring armour) before combat begins.',
    reviewed: true,
    onCombatStart: (state, { owner }) => {
        const opponent = owner === 'hero' ? 'enemy' : 'hero';
        return dealDamage(state, 'First Cut', opponent, 1);
    }
});
