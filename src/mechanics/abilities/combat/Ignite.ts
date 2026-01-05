import { registerAbility } from '../../abilityRegistry';
import { appendEffect, dealDamage } from '../../../types/combatState';
import { rollDice, sumDice } from '../../../types/dice';
import { CombatState } from '../../../types/combatState';
import { Effect } from '../../../types/effect';
import { CharacterType, getOpponent } from '../../../types/character';

function canActivate(state: CombatState, { owner }: { owner: CharacterType }): boolean {
    return state.winner === owner;
}

registerAbility({
    name: 'Ignite',
    type: 'combat',
    description: 'After winning a round, roll 2 damage dice and apply to each opponent (ignoring armour) and cause them to burn.',
    canActivate: (state, { owner }) => canActivate(state, { owner }),
    onActivate: (state, { owner }) => {
        if (!canActivate(state, { owner })) return state;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);
        const opponent = getOpponent(owner);

        // Apply Burn effect
        const effect: Effect = {
            stats: {},
            source: 'Ignite',
            target: opponent,
            duration: undefined // Burn lasts until removed
        };

        state = appendEffect(state, opponent, effect);

        // Deal damage (ignoring armour)
        state = dealDamage(state, 'Ignite', opponent, dmg);

        return {
            ...state,
            phase: 'round-end' // Ignite ends the round (replaces normal attack?)
        };
    }
});
