import { registerAbility } from '../../abilityRegistry';
import { getCombatant, appendEffect, CombatState } from '../../../types/combatState';
import { getOpponent, CharacterType } from '../../../types/character';

const dodgeAbilities = new Set(['Vanish', 'Sidestep', 'Dodge']);

function opponentHasDodge(state: CombatState, opponent: CharacterType): boolean {
    const opponentChar = getCombatant(state, opponent);
    return [...opponentChar.activeAbilities.keys()].some(name => dodgeAbilities.has(name));
}

registerAbility({
    name: 'Ensnare',
    type: 'combat',
    description: "Cancel an opponent's dodge ability (e.g., evade, vanish) and roll for damage as normal.",
    canActivate: (state, { owner }) => opponentHasDodge(state, getOpponent(owner)),
    onActivate: (state, { owner }) => {
        const opponent = getOpponent(owner);
        if (!opponentHasDodge(state, opponent)) return state;
        return appendEffect(state, opponent, {
            stats: {}, // Marker
            source: 'Ensnare',
            target: opponent,
            duration: 1
        });
    }
});
