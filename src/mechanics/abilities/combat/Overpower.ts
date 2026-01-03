import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { rollDice, sumDice } from '../../../utils/dice';
import { isEnemyDamageRollPhase } from '../abilityFactories';
import { dealDamage } from '../../../types/combat';

registerAbility({
    name: 'Overpower',
    type: 'combat',
    description: 'Stop an opponent\'s damage after they win a round and automatically inflict 2 damage dice (ignoring armour).',
    canActivate: isEnemyDamageRollPhase,
    onActivate: (state) => {
        if (!isEnemyDamageRollPhase(state)) return {};

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);

        const enemy = state.enemy;
        if (!enemy) return null; // Should not happen if confirmed enemy winner, but safe check

        return {
            ...dealDamage(state, 'Overpower', 'enemy', dmg),
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
        };
    }
});
