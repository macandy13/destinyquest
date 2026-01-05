import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';

registerAbility(createStatModifierAbility({
    name: 'Knockdown',
    type: 'speed',
    description: "Reduce opponent's speed dice by 1 for one round.",
    stats: { speedDice: -1 },
    duration: 1,
    target: 'opponent',
    canActivate: (state, { owner }) => (
        state.phase === 'speed-roll'
        && !hasAbility(state, getOpponent(owner), 'Steadfast')),
}));
