import { registerAbility } from '../../abilityRegistry';
import { hasEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Merciless',
    type: 'passive',
    description: 'Add 1 to each damage die if the opponent is afflicted with bleed, disease, or venom.',
    onDamageCalculate: (state, { owner }) => {
        const opponent = getOpponent(owner);
        const statuses = ['Bleed', 'Disease', 'Venom'];
        // Check if ANY status exists
        const hasStatus = statuses.some(s => hasEffect(state, opponent, s));
        if (hasStatus) {
            // Add 1 to each damage die.
            return state.damage?.damageRolls?.length || 0;
        }
        return 0;
    }
});
