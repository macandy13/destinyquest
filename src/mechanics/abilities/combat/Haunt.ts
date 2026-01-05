import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect, dealDamage, hasEffect, removeEffect } from '../../../types/combatState';
import { Effect } from '../../../types/effect';
import { hasDouble } from '../../../types/dice';
import { getOpponent } from '../../../types/character';



registerAbility({
    name: 'Haunt',
    type: 'combat',
    description: 'Summon a spirit to inflict 2 damage (ignoring armour) to one opponent at the end of every round until you roll a double.',
    canActivate: (state, { owner }) => {
        const opponent = getOpponent(owner);
        const hasSpirit = hasEffect(state, opponent, 'Haunt Spirit');
        return !hasSpirit;
    },
    onActivate: (state, { owner }) => {
        // Activate to summon spirit
        const opponent = getOpponent(owner);
        const effect: Effect = {
            stats: {},
            source: 'Haunt Spirit',
            target: opponent,
            duration: undefined // Infinite duration until removed
        };

        state = appendEffect(state, opponent, effect);
        return addLogs(state, { round: state.round, message: "Used ability: Haunt. Spirit summoned!", type: 'info' });
    },
    // Check for "Roll a double" to dispel
    onSpeedRoll: (state, { owner }) => {
        // Check owner's rolls
        const rolls = owner === 'hero' ? state.heroSpeedRolls : state.enemySpeedRolls;

        if (rolls && hasDouble(rolls)) {
            const opponent = getOpponent(owner);
            // Check if opponent is haunted by owner
            if (hasEffect(state, opponent, 'Haunt Spirit')) {
                state = removeEffect(state, opponent, 'Haunt Spirit');
                return addLogs(state, {
                    round: state.round,
                    message: "Rolled a double! Haunt spirit dispelled.",
                    type: 'info'
                });
            }
        }
        return state;
    },
    onPassiveAbility: (state, { owner }) => {
        // Inflict damage if spirit active
        const opponent = getOpponent(owner);
        // We need to check if *this specific* Haunt Spirit is active (source 'Haunt Spirit' on opponent).
        // The original check was stricter: `isHaunted` checked source and target.
        // `hasEffect` checks source.
        if (!hasEffect(state, opponent, 'Haunt Spirit')) return state;

        return dealDamage(state, 'Haunt', opponent, 2);
    },
});
