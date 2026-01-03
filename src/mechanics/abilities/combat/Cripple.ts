import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';
import { CombatState } from '../../../types/CombatState';
import { CharacterType } from '../../../types/Stats';

registerAbility(createStatModifierAbility({
    name: 'Cripple',
    type: 'combat',
    description: "If you cause health damage, the opponent's speed score is lowered by 1 for the next 3 rounds.",
    stats: { speed: -1 },
    duration: 3,
    target: 'enemy',
    canActivate: (state: CombatState, _owner: CharacterType) => state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0)
}));
