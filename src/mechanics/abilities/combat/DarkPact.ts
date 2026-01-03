import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { CombatState } from '../../../types/combat';

function canActivate(state: CombatState): boolean {
    return (state.hero?.stats.health || 0) > 4;
}

registerAbility({
    name: 'Dark Pact',
    type: 'combat',
    description: 'Sacrifice 4 health to increase your damage score by 4.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        // Valid if health > 4? 
        // Allows suicide? "Sacrifice" usually implies cost.
        // Assuming strictly > 0 after cost or just allow it.

        return {
            modifications: [
                ...state.modifications,
                // Cost
                { modification: { stats: { health: -4 }, source: 'Dark Pact Cost', target: 'hero' }, id: `dark-pact-cost-${state.round}`, duration: undefined },
                // Benefit
                { modification: { stats: { damageModifier: 4 }, source: 'Dark Pact', target: 'hero' }, id: `dark-pact-${state.round}`, duration: 1 }
            ],
            logs: addLogs(state.logs, { round: state.round, message: "Used ability: Dark Pact. Sacrificed health for power!", type: 'info' })
        };
    }
});
