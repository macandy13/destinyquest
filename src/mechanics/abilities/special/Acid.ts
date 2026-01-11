import { registerAbility } from '../../abilityRegistry';
import { dealDamage, addLogs } from '../../../types/combatState';
import { rollDie } from '../../../types/dice';

registerAbility({
    name: 'Acid',
    type: 'special',
    description: 'Roll a die at the start of each combat round. If you roll a 1 or 2, you automatically take 2 damage. This ability ignores armour.',
    reviewed: true,
    icon: '🧪',
    onRoundStart: (state, { target }) => {
        if (!target) return state;

        // Roll 1d6
        const roll = rollDie().value;
        let logMsg = `Acid check: rolled ${roll}.`;
        if (roll <= 2) {
            return dealDamage(state, 'Acid', target, 2, logMsg);
        }

        return addLogs(state, {
            message: logMsg + ' No damage.',
        });
    }
});
