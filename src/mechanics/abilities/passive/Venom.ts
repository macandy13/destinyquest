import { registerAbility } from '../../abilityRegistry';
import { getOpponent } from '../../../types/character';
import { appendBonusDamage, appendEffect, hasEffect, getCombatant } from '../../../types/combatState';

registerAbility({
    name: 'Venom',
    type: 'passive',
    description: 'If causing health damage, opponent loses 2 health (ignoring armour) at the end of every round.',
    onDamageDealt(state, { target }, _source, damageDealt) {
        if (!target) return state;
        if (damageDealt > 0 && !hasEffect(state, target, 'Venom')) {
            return appendEffect(state, target, {
                stats: {},
                source: 'Venom',
                target,
                duration: undefined
            });
        }
        return state;
    },
    onPassiveAbility: (state, { owner }) => {
        const opponent = getOpponent(owner);
        if (!hasEffect(state, opponent, 'Venom')) return state;

        let damage = 2;
        const ownerCombatant = getCombatant(state, owner);
        const hasMastery = ownerCombatant.activeAbilities.has('Poison Mastery');
        const hasDeadly = ownerCombatant.activeAbilities.has('Deadly Poisons');
        if (hasMastery) damage = 4;
        else if (hasDeadly) damage = 3;

        return appendBonusDamage(state, {
            source: 'Venom',
            target: opponent,
            amount: damage,
        });
    }
});
