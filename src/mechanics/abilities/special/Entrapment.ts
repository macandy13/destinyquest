import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

export const Entrapment: AbilityDefinition = {
    name: 'Entrapment',
    type: 'special',
    description: "Each time you win a combat round, your opponent rolls one less combat die in the next round.",
    reviewed: false,
    onDamageRoll: (state, { owner }) => {
        if (state.winner === owner) {
            const target = getOpponent(owner);
            state = appendEffect(state, target, {
                stats: { speedDice: -1 },
                source: 'Entrapment',
                target: target,
                duration: 2, // Lasts until end of next round
                description: '-1 Speed Die next round'
            });
        }
        return state;
    }
};

registerAbility(Entrapment);
