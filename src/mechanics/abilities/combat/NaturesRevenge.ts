import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../types/CombatState';
import { rollDice, sumDice } from '../../../types/Dice';
import { CombatState, dealDamage, appendEffect } from '../../../types/CombatState';
import { CharacterType, getOpponent } from '../../../types/Character';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === owner;
}

registerAbility({
    name: "Nature's Revenge",
    type: 'combat',
    description: "Instead of rolling damage, inflict 2 damage dice (ignoring armour) and reduce opponent's speed by 1 for the next round.",
    canActivate: (state, { owner }) => canActivate(state, owner),
    onActivate: (state, { owner }) => {
        if (!canActivate(state, owner)) return state;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);
        const opponent = getOpponent(owner);

        // Apply speed debuff
        let newState = appendEffect(state, opponent, {
            stats: { speed: -1 },
            source: "Nature's Revenge",
            target: opponent,
            duration: 2 // "for the next round" usually means current end + next round? Or just 1 round?
        });
        newState = addLogs(newState, { message: `Nature's Revenge! Slowed opponent.`, })

        // Deal damage (ignoring armour)
        newState = dealDamage(newState, "Nature's Revenge", opponent, dmg);
        newState = {
            ...newState,
            phase: 'passive-damage',
            damage: {
                damageRolls: [],
                modifiers: []
            },
            logs: addLogs(newState.logs, {
                round: state.round,
                message: `Nature's Revenge! Inflicted ${dmg} damage and slowed opponent.`,
                type: 'damage-hero' // assuming owner is hero usually
            })
        };
        return newState;
    }
});
