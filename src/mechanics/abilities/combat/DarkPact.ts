import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect, dealDamage, getCombatant } from '../../../types/combatState';
import { CombatState } from '../../../types/combatState';
import { CharacterType } from '../../../types/character';

function canActivate(state: CombatState, { owner }: { owner: CharacterType }): boolean {
    // Check if owner has > 4 health
    const char = getCombatant(state, owner);
    return char.stats.health > 4;
}

registerAbility({
    name: 'Dark Pact',
    type: 'combat',
    description: 'Sacrifice 4 health to increase your damage score by 4.',
    canActivate: (state, { owner }) => canActivate(state, { owner }),
    onActivate: (state, { owner }) => {
        // Manual reduction to ensure no weird interactions if dealDamage handles something else?
        // Actually dealDamage is safe for simple health reduction.
        const costResult = dealDamage(state, 'Dark Pact Cost', owner, 4);
        state = { ...state, ...costResult };

        // Apply buff directly
        state = appendEffect(state, owner, {
            stats: { damageModifier: 4 },
            source: 'Dark Pact',
            target: owner,
            duration: 1
        });

        return addLogs(state, {
            message: "Used ability: Dark Pact. Sacrificed health for power!",
        });
    }
});
