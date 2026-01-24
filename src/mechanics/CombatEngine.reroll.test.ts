import { describe, it, expect } from 'vitest';
import { startCombat, resolveInteraction, rollForSpeed } from './CombatEngine';
import { MOCK_ENEMY } from './CombatEngine';
import { MOCK_HERO } from '../tests/testUtils';
import { CombatState } from '../types/combatState';
import { deterministicRoll } from '../types/dice';

describe('CombatEngine Reroll Bug', () => {
    it('should update winner after rerolling speed dice via interaction', () => {
        // Setup: Ensure hero loses initially
        const hero = { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, speed: 0 } };
        const enemy = { ...MOCK_ENEMY, stats: { ...MOCK_ENEMY.stats, speed: 100 } }; // Enemy definitely wins

        let state = startCombat(hero, [enemy]);

        // Force speed rolls where Hero loses
        state = rollForSpeed(state, deterministicRoll([1]), deterministicRoll([6]));
        expect(state.winner).toBe('enemy');
        expect(state.phase).toBe('speed-roll');


        // Simulate an interaction that "rerolls" dice to make Hero win
        // We'll mock the pending interaction state directly
        const rerollInteraction = {
            ability: { name: 'Reroll Ability', owner: 'hero' as const, def: { name: 'Reroll Ability', type: 'speed', uses: 1 }, uses: 1 },
            requests: [{ type: 'dice' as const, mode: 'select' as const, count: 1 }],
            callback: (s: CombatState) => ({
                ...s,
                heroSpeedRolls: deterministicRoll([200]), // Huge roll to ensure win
            })
        };

        state.pendingInteraction = rerollInteraction as any;

        // Resolve interaction (data doesn't matter for this mock callback)
        state = resolveInteraction(state, []);

        // Assertion: Winner should now be Hero
        expect(state.heroSpeedRolls?.[0].value).toBe(200); // Verify roll updated
        expect(state.winner).toBe('hero');
    });
});
