import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Rake',
    type: 'combat',
    description: 'After winning a round, inflict 3 damage dice (ignoring armour). Modifiers cannot be used.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const dmgRolls = rollDice(3);
        const dmg = sumDice(dmgRolls);
        const rolls = dmgRolls.map(r => r.value);

        // TODO: Is damage dealt?

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Rake' }],
            logs: addLog(state.logs, { round: state.round, message: `Rake! Inflicted ${dmg} damage (${rolls.join('+')}).`, type: 'damage-hero' })
        };
    }
});
