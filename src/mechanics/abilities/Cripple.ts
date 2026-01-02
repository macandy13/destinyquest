import { registerAbility } from '../abilityRegistry';
import { createStatModifierAbility } from './abilityFactories';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

registerAbility(createStatModifierAbility({
    name: 'Cripple',
    type: 'combat',
    description: "If you cause health damage, the opponent's speed score is lowered by 1 for the next 3 rounds.",
    stats: { speed: -1 },
    duration: 3,
    target: 'enemy',
    canActivate: (state: CombatState, owner: CharacterType) => state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0)
}));
