import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { addAbility, addLogs, requireAbilityDefinition, getCombatant } from '../../../types/combatState';

export const FromTheAshes: AbilityDefinition = {
    name: 'From the ashes',
    type: 'special',
    description: "At the end of the combat, the Phoenix rises again as Phoenix risen.",
    reviewed: false,
    // TODO: This requires spawning a new enemy after combat ends.
    // For now, we log a message as a placeholder.
    onCombatEnd: (state, { owner }) => {
        // Only trigger when owner is defeated
        const combatant = getCombatant(state, { type: owner, enemyIndex: 0 }); // Default to 0 for now as FromTheAshes owner is mostly likely enemy 0 or single enemy
        // Ideally owner should be CombatantSelector
        if (!combatant) return state;

        if (combatant.stats.health <= 0) {
            state = addLogs(state, {
                message: 'From the ashes: The Phoenix rises again! (TODO: Spawn Phoenix risen)'
            });
            const newEnemy = {
                ...state.enemies[0],
                name: 'Phoenix risen',
                stats: {
                    ...state.enemies[0].stats,
                    health: 10,
                    maxHealth: 10,
                    speedDice: 2,
                    damageDice: 2
                },
                activeEffects: []
            };
            const newEnemies = [...state.enemies];
            newEnemies[0] = newEnemy;

            state = {
                ...state,
                phase: 'round-start',
                enemies: newEnemies
            }
            addAbility(state.enemies[0], requireAbilityDefinition('Body of flame'));
        }
        return state;
    }
};

registerAbility(FromTheAshes);
