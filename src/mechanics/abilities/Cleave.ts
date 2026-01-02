import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}
registerAbility({
    name: 'Cleave',
    type: 'combat',
    description: 'Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring armour.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const val = rollDice(1)[0].value;

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: val, source: 'Cleave' }],
            logs: addLog(state.logs, { round: state.round, message: `Cleave! Inflicted ${val} damage.`, type: 'damage-hero' })
        };
    }
});
