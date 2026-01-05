import { registerAbility } from '../../abilityRegistry';
import { healDamage, getCombatant, updateCombatant } from '../../../types/combatState';

registerAbility({
    name: 'Kick Start',
    type: 'passive',
    description: 'When reduced to 0 health, automatically restore to 15 health and remove all passive effects.',
    // Requires a hook on death or damage? 
    // Implementing onDamageDealt to intercept death?
    // "When reduced to 0 health".
    // I need to check if there is a 'onDeath' or similar, or check health in onDamageDealt.
    onDamageDealt: (state, { owner }) => {
        const char = getCombatant(state, owner);
        if (char.stats.health > 0) return state;

        // Restore to 15
        state = healDamage(state, 'Kick Start', owner, 15);

        const targetChar = getCombatant(state, owner);
        const newChar: typeof targetChar = {
            ...targetChar,
            activeAbilities: new Map(targetChar.activeAbilities
                .entries()
                .filter(([_, a]) => a.def.type !== 'passive'))
        };
        return updateCombatant(state, owner, newChar);
    }
});
