import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { rollDice, sumDice } from '../../../utils/dice';
import { CombatState } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Rake',
    type: 'combat',
    description: 'After winning a round, inflict 3 damage dice (ignoring armour). Modifiers cannot be used.',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        const dmgRolls = rollDice(3);
        const dmg = sumDice(dmgRolls);
        const rolls = dmgRolls.map(r => r.value);

        // TODO: Is damage dealt?

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Rake' }],
            logs: addLogs(state.logs, { round: state.round, message: `Rake! Inflicted ${dmg} damage (${rolls.join('+')}).`, type: 'damage-hero' })
        };
    }
});
