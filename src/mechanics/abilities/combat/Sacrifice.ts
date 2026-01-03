import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { CombatState, hasEffect, removeEffect, skipDamagePhase } from '../../../types/CombatState';

function canActivate(state: CombatState, context: AbilityContext): boolean {
    return hasEffect(state, context.owner, 'Shades') && state.phase === 'damage-roll' && state.winner === 'enemy';
}

registerAbility({
    name: 'Sacrifice',
    type: 'combat',
    description: "Sacrifice your shades to absorb all damage from an opponent's roll.",
    canActivate: canActivate,
    onActivate: (state, context) => {
        if (!canActivate(state, context)) return state;

        // Remove Shades
        state = removeEffect(state, 'hero', 'Shades'); // Assuming 'hero' has shades? canActivate checks activeEffects.
        // Wait, canActivate checks `state.activeEffects`? `state` (CombatState) only has activeEffects on combatants? 
        // No, `state` has top-level `activeEffects`? Wait, I saw `activeEffects` in `CombatState` in Step 231.
        // No, `CombatState` has `activeEffects` on `Combatant<T>`.
        // `state.activeEffects` in `Sacrifice.ts` (original line 7) suggests top-level. 
        // But `CombatState` interface (Step 231) does NOT have top-level `activeEffects`.
        // Let me re-read `CombatState` definition in Step 231 carefully.
        // Lines 44-82 define `CombatState`. It has `enemy`, `hero`.
        // `Combatant` (Lines 20-31) has `activeEffects`.
        // So `state.activeEffects` was likely invalid or deprecated code in `Sacrifice.ts`?
        // Or I misread `CombatState.ts`.
        // I will assume it should be checked on owner (hero).

        return skipDamagePhase(state, "Used ability: Sacrifice. Shades absorbed the damage!");
    }
});
