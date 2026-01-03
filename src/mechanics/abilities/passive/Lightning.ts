import { registerAbility } from '../../abilityRegistry';
import { addLogs, getDamageType } from '../../../utils/statUtils';
import { CharacterType, getOpponent } from '../../../types/stats';
import { CombatState } from '../../../types/combat';
import { Character } from '../../../types/character';

registerAbility({
    name: 'Lightning',
    type: 'passive',
    description: 'Every time you take health damage, automatically inflict 2 damage back (ignoring armour). Multiple lightning items do not stack.',
    onDamageDealt: (state: CombatState, owner: CharacterType, target: CharacterType, amount: number): Partial<CombatState> => {
        if (owner !== target || amount <= 0) return {};

        const attackerType = getOpponent(target);
        const attacker = state[owner] as Character;
        return {
            [attackerType]: {
                ...attacker, stats: {
                    ...attacker.stats,
                    health: Math.max(0, attacker.stats.health - amount)
                }
            },
            damageDealt: [...state.damageDealt, {
                target: attackerType,
                amount: 2,
                source: 'Lightning'
            }],
            logs: addLogs(state.logs, {
                round: state.round,
                message: 'Lightning! Inflicted 2 damage back.',
                type: getDamageType(attackerType),
            })
        };
    }
});
