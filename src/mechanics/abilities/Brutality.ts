import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Brutality',
    type: 'combat',
    description: 'Stops an opponent from rolling damage after they win a round and automatically inflicts 2 damage dice (ignoring armour) to them.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);
        const rolls = dmgRolls.map(r => r.value);

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Brutality' }],
            logs: addLog(state.logs, {
                round: state.round,
                message: `Brutality! Blocked attack and inflicted ${dmg} damage (${rolls.join('+')}).`,
                type: 'damage-hero'
            })
        };
    }
});
