import { modifyDamageRolls } from '../../../types/combatState';
import { registerAbility } from '../../abilityRegistry';
import { isHeroDamageRollPhase } from '../abilityFactories';

registerAbility({
    name: 'Windwalker',
    type: 'combat',
    description: 'Use all attack speed dice for your damage score after winning a round.',
    canActivate: isHeroDamageRollPhase,
    onActivate: (state) => {
        state = modifyDamageRolls(state, state.heroSpeedRolls!, 'Windwalker');
        return state;
    }
});
