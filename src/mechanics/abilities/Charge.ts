import { registerAbility } from '../abilityRegistry';
import { createStatModifierAbility } from './abilityFactories';
import { CombatState } from '../../types/combat';

registerAbility(createStatModifierAbility({
    name: 'Charge',
    type: 'speed',
    description: 'Increase speed by 2 in the first round of combat.',
    stats: { speed: 2 },
    duration: 1,
    target: 'hero',
    canActivate: (state: CombatState) => state.round === 1
}));
