import { registerAbility } from '../../abilityRegistry';
import { hasEffect, removeEffect } from '../../../types/combatState';
import { rollDice, sumDice } from '../../../types/dice';
import { CombatState, dealDamage, appendEffect, skipDamagePhase } from '../../../types/combatState';
import { CharacterType } from '../../../types/character';

function winnerIsNotCharged(state: CombatState, owner: CharacterType): boolean {
    return state.phase === 'speed-roll'
        && state.winner === owner
        && !hasEffect(state, owner, 'Bolt');
}

registerAbility({
    name: 'Bolt',
    type: 'combat',
    description: "Instead of rolling damage, you can 'charge up' your wand. When you win your next round, you inflict 3 damage dice to one opponent, ignoring armour.",
    canActivate: (state, { owner }) => winnerIsNotCharged(state, owner),
    onActivate: (state, { owner }) => {
        if (!winnerIsNotCharged(state, owner)) return state;

        state = appendEffect(state, owner, {
            stats: {}, // No stats change, just a marker
            source: 'Bolt',
            target: owner,
            duration: undefined // Until consumed
        });
        state = skipDamagePhase(state, 'Bolt');
        return state;
    },
    onDamageRoll: (state, { owner }) => {
        if (state.winner !== owner) return state;
        if (!hasEffect(state, owner, 'Bolt')) return state;

        const dmgRolls = rollDice(3);
        const dmg = sumDice(dmgRolls);
        state = dealDamage(state, 'Bolt', 'enemy', dmg, `Bolt released! Rolled ${dmg} (${dmgRolls.map(r => r.value).join('+')}). Ignored armour!`);
        state = removeEffect(state, owner, 'Bolt');
        state = skipDamagePhase(state, 'Bolt released');
        return state;
    }
});
