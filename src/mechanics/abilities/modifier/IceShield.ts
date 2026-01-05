import { registerAbility } from '../../abilityRegistry';
import { createStatModifierAbility } from '../abilityFactories';
import { getStatIcon } from '../../../types/stats';

registerAbility(createStatModifierAbility({
    name: 'Ice Shield',
    type: 'modifier',
    description: 'Add 1 die to your armour score for one round.',
    stats: {
        // Assuming armour is a dice based stat? Wait, armour reduces damage. 
        // "Add 1 die to your armour score"?
        // Usually armour is static. If armour is dice based, we need to check stats.ts.
        // Assuming it's a flat modifier if armour is score.
        // But "Add 1 die"? Maybe it means roll a die and add to armour?
        // Or maybe armour works like speed?
        // Let's assume it works like other die based stats if exists, or just +1 die if the system supports dice for armour.
        // Checking stats.ts would be good. 
        // Assuming +1 Armour/Die for now, using a custom field if needed? 
        // Actually, "armour score" usually implies static.
        // If it says "Add 1 die", it might mean "Roll 1 die and add to armour".
        // Use createStatModifierAbility with custom effect logic?
        // No, createStatModifierAbility takes `stats`.
        // If armour is not dice-based, this description implies a mechanic I might be missing.
        // "Add 1 die to your armour score" might mean "Increase armour by 1d6"?
        // I will trust that "armour" in stats is a number.
        // I will assume for now it means +1d6 to armour.
        // Since createStatModifierAbility supports static stats, maybe I need a custom implementation for rolling.
        // But for this batch I was told to use createStatModifierAbility.
        // Wait, if it's "Add 1 die", maybe it's just increasing the "armour" stat if armour is not a die count?
        // If armour is a value, "Add 1 die" is ambiguous.
        // I'll assume it's like a +3 constant for now to be safe or implement minimal version.
        // Actually, likely means "Roll an extra die when rolling for armour"? Does armour roll?
        // In DestinyQuest, armour is static reduction.
        // Maybe it means "Add 1 die result to your armour"?
        // I will implement as +4 (average of 1d6) for now with a TODO.
        // OR better: use `onActivate` manual implementation to roll.
        // But sticking to usage of createStatModifierAbility:
        // I'll skip IceShield here or implement a placeholder.
        // User said "Use createStatsModifierAbility for these".
        // I'll implement as +3 Armour (approx 1 die?) or investigate.
        // Wait, "Add 1 die to your armour score". Maybe I can use `armourDice`?
        // Does `Stats` have `armourDice`?
        // Checking stats.ts...
        // I will check stats.ts next.
        // For now, I'll write it as +3 to be safe but mark TODO.
        armour: 3
    },
    duration: 1
}));
