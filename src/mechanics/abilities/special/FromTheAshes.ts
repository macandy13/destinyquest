import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../types/combatState';
import { createCombatant } from '../../../tests/testUtils';
import { Enemy } from '../../../types/character';

export const FromTheAshes: AbilityDefinition = {
    name: 'From the ashes',
    type: 'special',
    description: "At the end of the combat, the Phoenix rises again as Phoenix risen.",
    reviewed: false,
    // TODO: This requires spawning a new enemy after combat ends.
    // For now, we log a message as a placeholder.
    onCombatEnd: (state, { owner }) => {
        // Only trigger when owner is defeated
        if (state[owner].stats.health <= 0) {
            state = addLogs(state, {
                message: 'From the ashes: The Phoenix rises again! (TODO: Spawn Phoenix risen)'
            });
            state = {
                ...state,
                phase: 'round-start',
                enemy: createCombatant({
                    name: 'Phoenix risen',
                    stats: {
                        ...state.enemy.stats,
                        health: 10,
                        maxHealth: 10,
                        speedDice: 2,
                        damageDice: 2
                    }
                    // TODO: Add Phoenix risen stats
                } as Enemy)
            }

        }
        return state;
    }
};

registerAbility(FromTheAshes);
