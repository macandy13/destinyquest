import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect, dealDamage } from '../../../types/CombatState';
import { CombatState } from '../../../types/CombatState';
import { CharacterType } from '../../../types/Character';

function canActivate(state: CombatState, { owner }: { owner: CharacterType }): boolean {
    // Check if owner has > 4 health
    return (state[owner].stats.health) > 4;
}

registerAbility({
    name: 'Dark Pact',
    type: 'combat',
    description: 'Sacrifice 4 health to increase your damage score by 4.',
    canActivate: (state, { owner }) => canActivate(state, { owner }),
    onActivate: (state, { owner }) => {
        if (!canActivate(state, { owner })) return state;

        // Pay cost: 4 health
        // Use dealDamage to handle health reduction, but we might want to flag it as "Sacrifice" or "Cost".
        // dealDamage checks armour? No, dealDamage deals raw damage amount to health. 
        // Wait, dealDamage(state, source, target, amount).
        // If I pass 'Dark Pact' as source.
        // It should just reduce health.

        let newState = { ...state };

        // Manual reduction to ensure no weird interactions if dealDamage handles something else?
        // Actually dealDamage is safe for simple health reduction.
        const costResult = dealDamage(state, 'Dark Pact Cost', owner, 4);
        newState = { ...newState, ...costResult };

        // Apply buff directly
        newState = appendEffect(newState, owner, {
            stats: { damageModifier: 4 },
            source: 'Dark Pact',
            target: owner,
            duration: 1
        });

        return addLogs(newState, { round: state.round, message: "Used ability: Dark Pact. Sacrificed health for power!", type: 'info' });
    }
});
