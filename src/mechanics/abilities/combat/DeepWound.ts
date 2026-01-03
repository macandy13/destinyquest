import { registerAbility } from '../../abilityRegistry';
import { createStatModification } from '../abilityFactories';

registerAbility({
    name: 'Deep Wound',
    type: 'combat',
    description: 'Roll an extra die when determining your damage score.',
    canActivate: (state, owner) => state.phase === 'damage-roll' && state.winner === owner,
    onActivate: (state, owner) => {
        const currentDamageDiceCount = state[owner]!.stats.damageDice ?? 1;
        return createStatModification(
            {
                name: 'Deep Wound',
                description: `Increased damage dice from ${currentDamageDiceCount} to ${currentDamageDiceCount + 1}`,
                stats: {
                    damageDice: 1, // Will automatically be added.
                },
                target: owner,
                duration: 1
            });
    }
});
