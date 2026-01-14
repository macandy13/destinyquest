import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { healDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

export const BloodHarvest: AbilityDefinition = {
    name: 'Blood harvest',
    type: 'special',
    description:
        'Each time you take health damage from Lady Roe, she heals 2 damage.',
    onDamageDealt: (state, { owner, target }, _source, damageDealt) => {
        if (damageDealt <= 0) return state;

        const opponent = getOpponent(owner);
        if (target !== opponent) return state;

        state = healDamage(
            state,
            'Blood harvest',
            owner,
            2,
            'Blood harvest: healed 2 health'
        );

        return state;
    }
};

registerAbility(BloodHarvest);
