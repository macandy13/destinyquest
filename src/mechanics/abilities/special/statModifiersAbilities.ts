import { CharacterType } from "../../../types/character";
import { appendEffect } from "../../../types/combatState";
import { Stats, getStatIcon } from "../../../types/stats";
import { registerAbility } from "../../abilityRegistry";

/**
 * Creates a simple stat modifier ability (e.g., +2 Damage).
 */
function createStatCombatModifierAbility(config: {
    name: string;
    description: string;
    stats: Partial<Stats>;
    target?: CharacterType;
    icon?: string;
}) {
    const skillIcons = Object.keys(config.stats).map(name => getStatIcon(name as string));
    const icon = config.icon ?? skillIcons.length > 0 ? skillIcons[0] : getStatIcon('enemy');
    registerAbility({
        name: config.name,
        type: 'modifier',
        description: config.description,
        icon: icon,
        onCombatStart(state, { owner }) {
            state = appendEffect(state, config.target ?? owner, {
                stats: config.stats,
                source: config.name,
                target: owner,
                duration: undefined,
                icon: icon,
            });
            return state;
        },
    });
}

// Simple combat modifiers (Speed/Damage)
createStatCombatModifierAbility({
    name: 'Avian\'s aid', // "Avian's aid"
    description: 'Add 2 to your damage score for the entire combat.',
    stats: { damageModifier: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Holy Water',
    description: 'You may add 2 to your damage score in this combat.',
    stats: { damageModifier: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Holy Flame',
    description: 'Add 4 to the Architect\'s damage score.',
    stats: { damageModifier: 4 },
    target: 'enemy',
});

createStatCombatModifierAbility({
    name: 'Team Effort',
    description: 'The hero adds 2 to their damage score, and 2 to their armour.',
    stats: { damageModifier: 2, armour: 2 },
});

createStatCombatModifierAbility({
    name: 'Power of Shadow',
    description: 'Your brawn and magic are raised by 5.',
    stats: { brawn: 5, magic: 5 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Holy Aura',
    description: 'The hero adds 2 to their brawn and magic scores.',
    stats: { brawn: 2, magic: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Caleb\'s Shield',
    description: 'The hero\'s armour is increased by 2.',
    stats: { armour: 2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Fatigue',
    description: 'The hero reduces their brawn and magic by 2 for the combat.',
    stats: { brawn: -2, magic: -2 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Thorn Spines',
    description: 'Reduce hero speed by 1 for the entire combat.',
    stats: { speed: -1 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Wing buffet',
    description: 'You must reduce your speed by 1 for the entire combat.',
    stats: { speed: -1 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Dread',
    description: 'Causes Fear, reducing brawn and magic by 1 for the entire combat.',
    stats: { brawn: -1, magic: -1 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Mighty blows',
    description: 'Voldring rolls 2 damage dice.',
    stats: { damageDice: 1 },
    target: 'enemy',
});

createStatCombatModifierAbility({
    name: 'Double Danger',
    description: 'The enemy rolls 2 damage dice.',
    stats: { damageDice: 1 },
    target: 'enemy',
});

createStatCombatModifierAbility({
    name: 'Cat\'s speed',
    description:
        'Shara Khana rolls 3 dice to determine her attack speed. ' +
        'Your hero special abilities can be used to reduce this number.',
    stats: { speedDice: 1 },
    target: 'enemy',
});

createStatCombatModifierAbility({
    name: 'Piercing Claws',
    description: 'The ghouls\' attacks ignore armour.',
    stats: { armour: -100 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Stingers',
    description: 'Attacks ignore armour.',
    stats: { armour: -100 },
    target: 'hero',
});

createStatCombatModifierAbility({
    name: 'Dervish',
    description: 'Attacks ignore armour.',
    stats: { armour: -100 },
    target: 'hero',
});

