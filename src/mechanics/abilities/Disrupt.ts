import { registerAbility } from '../abilityRegistry';
import { CombatState } from '../../types/combat';
import { createStatModifierAbility } from './abilityFactories';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    return state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0);
}

registerAbility(createStatModifierAbility({
    name: 'Disrupt',
    type: 'combat',
    description: "If you cause health damage, lower the opponent's magic score by 3 for the remainder of the combat.",
    stats: { magic: -3 },
    target: 'enemy',
    canActivate: canActivate,
}));
