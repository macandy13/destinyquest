import { CombatState } from '../../types/combat';
import { registerAbility } from '../abilityRegistry';
import { createStatModifierAbility } from './abilityFactories';
import { CharacterType } from '../../types/stats';

registerAbility(createStatModifierAbility({
    name: 'Overload',
    type: 'combat',
    description: 'Roll an extra die for your damage score.',
    stats: { damageDice: 1 },
    duration: 1,
    target: 'hero',
    canActivate: (state: CombatState, owner: CharacterType) => state.phase === 'damage-roll' && state.winner === 'hero'
}));    
