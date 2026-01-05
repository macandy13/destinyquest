import { registerAbility } from '../../abilityRegistry';
import { addLogs, setDamageRoll } from '../../../types/combatState';
import { formatDice } from '../../../types/dice';
import { isHeroDamageRollPhase } from '../abilityFactories';

registerAbility({
    name: 'Windwalker',
    type: 'combat',
    description: 'Use all attack speed dice for your damage score after winning a round.',
    canActivate: isHeroDamageRollPhase,
    onActivate: (state) => {
        state = addLogs(state, {
            message: `Using Windwalker to replace ${formatDice(state.damage!.damageRolls)} damage roll with speed roll ${formatDice(state.heroSpeedRolls!)}`
        });
        state = setDamageRoll(state, state.heroSpeedRolls!);
        return state;
    }
});
