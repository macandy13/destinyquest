import { registerAbility } from '../../abilityRegistry';
import { CharacterType, getOpponent } from '../../../types/character';
import { appendEffect, dealDamage, hasEffect, hasAbility, CombatState } from '../../../types/combatState';

function getDamage(state: CombatState, target: CharacterType) {
    let damage = 2;
    const hasMastery = hasAbility(state, target, 'Poison Mastery');
    const hasDeadly = hasAbility(state, target, 'Deadly Poisons');
    if (hasMastery) damage = 4;
    else if (hasDeadly) damage = 3;
    return damage;
}

registerAbility({
    name: 'Venom',
    type: 'passive',
    description: 'If causing health damage, opponent loses 2 health (ignoring armour) at the end of every round.',
    reviewed: true,
    onDamageDealt(state, { target }, _source, damageDealt) {
        if (!target) return state;
        if (damageDealt > 0 && !hasEffect(state, target, 'Venom')) {
            const damage = getDamage(state, target);
            return appendEffect(state, target, {
                stats: {},
                source: 'Venom',
                target,
                duration: undefined,
                icon: '☠️',
                description: `Loses ${damage} health (ignoring armour) at the end of every round.`
            });
        }
        return state;
    },
    onPassiveAbility: (state, { owner }) => {
        const opponent = getOpponent(owner);
        if (!hasEffect(state, opponent, 'Venom')) return state;

        const damage = getDamage(state, opponent);
        return dealDamage(state, 'Venom', opponent, damage, `Venom deals ${damage} damage to ${opponent}`);
    }
});
