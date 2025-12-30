import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: "Nature's Revenge",
    type: 'combat',
    description: "Instead of rolling damage, inflict 2 damage dice (ignoring armour) and reduce opponent's speed by 1 for the next round.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);

        // TODO: Actually apply damage
        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: "Nature's Revenge" }],
            modifications: [
                ...state.modifications,
                { modification: { stats: { speed: -1 }, source: "Nature's Revenge", target: 'enemy' }, id: `natures-revenge-speed-${state.round}`, duration: 2 }
            ],
            logs: addLog(state.logs, { round: state.round, message: `Nature's Revenge! Inflicted ${dmg} damage and slowed opponent.`, type: 'damage-hero' })
        };
    }
});
