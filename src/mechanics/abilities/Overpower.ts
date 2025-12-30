import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Overpower',
    type: 'combat',
    description: 'Stop an opponent\'s damage after they win a round and automatically inflict 2 damage dice (ignoring armour).',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);
        const rolls = dmgRolls.map(r => r.value);

        const enemy = state.enemy;
        if (!enemy) return null; // Should not happen if confirmed enemy winner, but safe check

        // Apply damage directly
        const newEnemyHealth = Math.max(0, enemy.stats.health - dmg);
        return {
            phase: 'round-end',
            enemy: { ...enemy, stats: { ...enemy.stats, health: newEnemyHealth } },
            damageRolls: [{ value: 0, isRerolled: false }],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Overpower' }],
            logs: addLog(state.logs, {
                round: state.round,
                message: `Overpower! Blocked attack and inflicted ${dmg} damage (${rolls.join('+')}).`,
                type: 'damage-hero'
            })
        };
    }
});
