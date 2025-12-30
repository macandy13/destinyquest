import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { sumDice, rollDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Backfire',
    type: 'combat',
    description: 'Instead of rolling for damage after winning a round, automatically inflict 3 damage dice to your opponent, but also take 2 damage dice to yourself (ignoring armour).',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const enemyRolls = rollDice(3);
        const enemyDamage = sumDice(enemyRolls);

        // Roll 2 dice for self
        const selfRolls = rollDice(2);
        const selfDamage = sumDice(selfRolls);

        const newDamageDealt = [
            ...state.damageDealt,
            { target: 'enemy' as const, amount: enemyDamage, source: 'Backfire' },
            { target: 'hero' as const, amount: selfDamage, source: 'Backfire' }
        ];

        return {
            phase: 'round-end', // Skip normal damage
            damageRolls: enemyRolls,
            damageDealt: newDamageDealt,
            logs: addLog(state.logs, {
                round: state.round,
                message: `Backfire! Inflicted ${enemyDamage} to opponent (${enemyRolls.join('+')}), took ${selfDamage} damage (${selfRolls.join('+')}).`,
                type: 'info'
            })
        };
    }
});
