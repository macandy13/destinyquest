import { describe, it, expect } from 'vitest';
import { startCombat, checkForCombatEnd } from './CombatEngine';
import { MOCK_HERO, MOCK_ENEMY } from '../tests/testUtils';
import { getCombatant, updateCombatant, getActiveEnemy, getAliveEnemies } from '../types/combatState';

describe('CombatEngine Multi-Enemy', () => {

    it('should initialize with multiple enemies having unique IDs', () => {
        const state = startCombat(MOCK_HERO, [MOCK_ENEMY, { ...MOCK_ENEMY, name: 'Enemy 2' }]);

        expect(state.enemies).toHaveLength(2);
        expect(state.enemies[0].id).toBe('enemy-0');
        expect(state.enemies[1].id).toBe('enemy-1');
        expect(state.enemies[0].stats).toEqual(MOCK_ENEMY.stats);
        expect(state.enemies[1].name).toBe('Enemy 2');
    });

    it('should allow targeting specific enemy via CombatantSelector', () => {
        const state = startCombat(MOCK_HERO, [
            { ...MOCK_ENEMY, name: 'Target 1', stats: { ...MOCK_ENEMY.stats, health: 10 } },
            { ...MOCK_ENEMY, name: 'Target 2', stats: { ...MOCK_ENEMY.stats, health: 10 } }
        ]);

        const e1 = getCombatant(state, { type: 'enemy', enemyIndex: 0 });
        const e2 = getCombatant(state, { type: 'enemy', enemyIndex: 1 });

        expect(e1.name).toBe('Target 1');
        expect(e2.name).toBe('Target 2');
    });

    it('should update specific enemy status', () => {
        let state = startCombat(MOCK_HERO, [
            { ...MOCK_ENEMY, stats: { ...MOCK_ENEMY.stats, health: 10, maxHealth: 10 } },
            { ...MOCK_ENEMY, stats: { ...MOCK_ENEMY.stats, health: 10, maxHealth: 10 } }
        ]);

        // Deal damage to enemy 1
        const target2 = getCombatant(state, { type: 'enemy', enemyIndex: 1 });
        const damaged = { ...target2, stats: { ...target2.stats, health: 5 } };

        state = updateCombatant(state, { type: 'enemy', enemyIndex: 1 }, damaged);

        expect(state.enemies[1].stats.health).toBe(5);
        expect(state.enemies[0].stats.health).toBe(10);
    });

    it('should handle master enemy win condition', () => {
        // Master + Minion
        const master = { ...MOCK_ENEMY, name: 'Master', isMaster: true, stats: { ...MOCK_ENEMY.stats, health: 10 } };
        const minion = { ...MOCK_ENEMY, name: 'Minion', stats: { ...MOCK_ENEMY.stats, health: 10 } };

        let state = startCombat(MOCK_HERO, [master, minion]);
        expect(state.phase).not.toBe('combat-end');

        // Kill minion -> Combat continues
        state.enemies[1].stats.health = 0;
        state = checkForCombatEnd(state);
        expect(state.phase).not.toBe('combat-end');

        // Kill master -> Combat ends
        state.enemies[0].stats.health = 0;
        state = checkForCombatEnd(state);
        expect(state.phase).toBe('combat-end');
    });

    it('should handle all enemies dead win condition', () => {
        // Two normal enemies
        let state = startCombat(MOCK_HERO, [MOCK_ENEMY, MOCK_ENEMY]);

        // Kill first
        state.enemies[0].stats.health = 0;
        state = checkForCombatEnd(state);
        expect(state.phase).not.toBe('combat-end');

        // Kill second
        state.enemies[1].stats.health = 0;
        state = checkForCombatEnd(state);
        expect(state.phase).toBe('combat-end');
    });

    it('should correctly identify alive enemies', () => {
        let state = startCombat(MOCK_HERO, [MOCK_ENEMY, MOCK_ENEMY]);
        expect(getAliveEnemies(state)).toHaveLength(2);

        state.enemies[0].stats.health = 0;
        expect(getAliveEnemies(state)).toHaveLength(1);
        expect(getAliveEnemies(state)[0].id).toBe('enemy-1');
    });

    it('getActiveEnemy should always return index 0 for backwards compatibility', () => {
        // Even if enemy 0 is dead, getActiveEnemy returns it (legacy logic relies on this or checks health)
        // Wait, legacy usually expects "The Enemy". If multiple, index 0 is the "Main" one conceptually?
        // Yes, as per plan alias.
        let state = startCombat(MOCK_HERO, [MOCK_ENEMY, { ...MOCK_ENEMY, name: 'E2' }]);
        expect(getActiveEnemy(state).name).toBe(MOCK_ENEMY.name);
    });
});
