import { calculateDamageBreakdown, MOCK_ENEMY, startCombat } from './CombatEngine';
import { CombatState } from '../types/combatState';
import { Hero } from '../types/hero';

describe('calculateDamageBreakdown', () => {
    const mockHero: Hero = {
        name: 'Test Hero',
        type: 'hero',
        stats: {
            speed: 2,
            brawn: 5,
            magic: 1,
            armour: 1,
            health: 30,
            maxHealth: 30,
        },
        equipment: {},
        backpack: [],
        money: 0,
        path: '',
        career: ''
    };

    let state: CombatState;

    beforeEach(() => {
        state = startCombat(mockHero, MOCK_ENEMY);
        // Force state to match damage roll phase requirements
        state.phase = 'damage-roll';
        state.winner = 'hero';
        state.damage = {
            damageRolls: [{ value: 3, isRerolled: false }],
            modifiers: []
        };
    });

    it('should calculate basic damage correctly', () => {
        // Hero Brawn: 5, Roll: 3, Enemy Armour: 0
        // Total = 3 + 5 - 0 = 8
        const breakdown = calculateDamageBreakdown(state);
        expect(breakdown).not.toBeNull();
        expect(breakdown?.diceTotal).toBe(3);
        expect(breakdown?.skill).toBe(5);
        expect(breakdown?.armour).toBe(0);
        expect(breakdown?.modifiersTotal).toBe(0);
        expect(breakdown?.totalDamage).toBe(8);
        expect(breakdown?.skillName).toBe('brawn');
    });

    it('should use magic if higher', () => {
        state.hero.stats.magic = 10;
        // Hero Brawn: 5, Magic: 10 => uses Magic
        const breakdown = calculateDamageBreakdown(state);
        expect(breakdown?.skill).toBe(10);
        expect(breakdown?.skillName).toBe('magic');
    });

    it('should include modifiers', () => {
        state.damage!.modifiers.push({ source: 'Buff', amount: 2, target: 'enemy' });
        // Hero Brawn: 5, Roll: 3, Mod: +2, Enemy Armour: 0
        // Total = 3 + 5 + 2 - 0 = 10
        const breakdown = calculateDamageBreakdown(state);
        expect(breakdown?.modifiersTotal).toBe(2);
        expect(breakdown?.totalDamage).toBe(10);
        expect(breakdown?.modifiers).toHaveLength(1);
    });

    it('should account for armour', () => {
        // Give enemy some armour
        state.enemy.stats.armour = 2;
        // Hero Brawn: 5, Roll: 3, Enemy Armour: 2
        // Total = 3 + 5 - 2 = 6
        const breakdown = calculateDamageBreakdown(state);
        expect(breakdown?.armour).toBe(2);
        expect(breakdown?.totalDamage).toBe(6);
    });

    it('should clamp damage to 0', () => {
        // Give huge armour
        state.enemy.stats.armour = 20;
        // Hero Brawn: 5, Roll: 3, Enemy Armour: 20
        // Total = 3 + 5 - 20 = -12 => 0
        const breakdown = calculateDamageBreakdown(state);
        expect(breakdown?.totalDamage).toBe(0);
    });

    it('should return null if no damage state', () => {
        state.damage = undefined;
        const breakdown = calculateDamageBreakdown(state);
        expect(breakdown).toBeNull();
    });
});
