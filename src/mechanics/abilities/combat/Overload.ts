import { CombatState } from '../../../types/CombatState';
import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';
import { CharacterType } from '../../../types/Stats';

registerAbility(createStatModifierAbility({
    name: 'Overload',
    type: 'combat',
    description: 'Roll an extra die for your damage score.',
    stats: { damageDice: 1 },
    duration: 1,
    target: 'hero',
    canActivate: (state: CombatState, _owner: CharacterType) => state.phase === 'damage-roll' && state.winner === 'hero'
}));    
