import { registerAbility } from '../abilityRegistry';
import { addLogs } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    // TODO: Should this be possible on round-end? Does this trigger the right things?
    return (state.phase === 'damage-roll' || state.phase === 'round-end') && state.winner === 'hero';
}

registerAbility({
    name: 'Ice Shards',
    type: 'combat',
    description: 'After winning a round, automatically inflict damage equal to your magic score (ignoring armour) to one opponent.',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        const enemy = state.enemy;
        if (!enemy) return null;

        const magic = state.hero?.stats.magic || 0;
        return {
            enemy: {
                ...enemy,
                stats: {
                    ...enemy.stats,
                    health: Math.max(0, enemy.stats.health - magic)
                }
            },
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: magic, source: 'Ice Shards' }],
            logs: addLogs(state.logs, { round: state.round, message: `Ice Shards! Inflicted ${magic} damage (Magic Score).`, type: 'damage-hero' })
        };
    }
});
