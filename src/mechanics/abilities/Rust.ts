import { registerAbility } from '../abilityRegistry';
import { CombatState } from '../../types/combat';
import { createStatModifierAbility } from './abilityFactories';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    return state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0);
}

registerAbility(createStatModifierAbility({
    name: 'Rust',
    type: 'combat',
    description: "If you cause health damage, lower opponent's armour by 2 for the remainder of combat.",
    canActivate: canActivate,
    stats: { armour: -2 },
    target: 'enemy',
    duration: undefined
}));
