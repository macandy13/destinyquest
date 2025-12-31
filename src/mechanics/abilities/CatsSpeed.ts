import { CombatState } from '../../types/combat';
import { registerAbility } from '../abilityRegistry';
import { createStatModifierAbility } from './abilityFactories';

registerAbility(createStatModifierAbility({
    name: "Cat's Speed",
    type: 'speed',
    description: 'Roll an extra die to determine attack speed for one round.',
    stats: { speed: 1 },
    target: 'hero',
    duration: 1,
    canActivate: (state: CombatState) => state.phase === 'speed-roll',
}));
