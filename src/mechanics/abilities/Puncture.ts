import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Puncture',
    type: 'combat',
    description: "Instead of rolling damage, inflict 2 damage dice (ignoring armour) and reduce opponent's armour by 1 for the remainder of the combat.",
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);

        const enemy = state.enemy;
        if (!enemy) return null;

        // Apply damage directly
        const newEnemyHealth = Math.max(0, enemy.stats.health - dmg);
        const updatedEnemy = { ...enemy, stats: { ...enemy.stats, health: newEnemyHealth } };

        return {
            phase: 'round-end',
            enemy: updatedEnemy,
            damageRolls: [{ value: 0, isRerolled: false }],
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Puncture' }],
            modifications: [
                ...state.modifications,
                { modification: { stats: { armour: -1 }, source: 'Puncture', target: 'enemy' }, id: `puncture-${state.round}`, duration: undefined }
            ],
            logs: addLogs(state.logs, { round: state.round, message: `Puncture! Inflicted ${dmg} damage and reduced armour.`, type: 'damage-hero' })
        };
    }
});
