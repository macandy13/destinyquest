import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { rollDice, sumDice } from '../../utils/dice';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    // TODO: Check for bow in left hand
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Black Rain',
    type: 'combat',
    description: '(Requires bow in left hand). Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring their armour.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const dmg = sumDice(rollDice(1));

        // TODO: Apply to each enemy
        // TODO: Actually apply damage

        return {
            phase: 'round-end',
            damageDealt: [{ target: 'enemy', amount: dmg, source: 'Black Rain' }],
            damageRolls: [], // Clear normal damage rolls as we replaced them?
            logs: addLog(state.logs, { round: state.round, message: `Black Rain! Inflicted ${dmg} damage.`, type: 'damage-enemy' })
        };
    }
});
