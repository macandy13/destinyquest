import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../types/combatState';

export const InkBombs: AbilityDefinition = {
    name: 'Ink bombs',
    type: 'special',
    description: "If you roll a 1 during speed rolls, hero is blinded and loses the round. You can only use passive abilities in this round. Dice can be rerolled.",
    reviewed: false,
    onSpeedRoll: (state, { owner }) => {
        // Only triggers for enemy ability affecting hero
        if (owner !== 'enemy') return state;

        const heroRolls = state.heroSpeedRolls;
        if (!heroRolls) return state;

        // Check if any hero speed die shows 1 (before rerolls)
        const hasOne = heroRolls.some(r => r.value === 1 && !r.isRerolled);
        if (hasOne) {
            state = addLogs(state, {
                message: 'Ink bombs: Hero rolled a 1 and is blinded! Loses this round.'
            });
            // Force hero to lose by setting winner to enemy
            state = {
                ...state,
                winner: 'enemy'
            };
            // TODO: Restrict hero to only passive abilities this round
            // Probably needs an effect that the combat engine can check? Or some state?
        }
        return state;
    }
};

registerAbility(InkBombs);
