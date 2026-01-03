import { registerAbility } from '../../abilityRegistry';
import { skipDamagePhase } from '../../../types/CombatState';
import { isOpponentDamageRollPhase } from '../abilityFactories';


registerAbility({
    name: 'Banshee Wail',
    type: 'combat',
    description: 'Stop your opponent from rolling for damage when they have won a round.',
    canActivate: isOpponentDamageRollPhase,
    onActivate: (state) => {
        return skipDamagePhase(state, "Used ability: Banshee Wail. Opponent's attack silenced!");
    }
});
