import { describe, it, expect } from 'vitest';
import { getAbilityDefinition, registerAbility, AbilityDefinition } from './abilityDefinitions';
import { CombatState, Enemy } from '../types/combat';
import { Hero } from '../types/hero';

// Mocks
const MOCK_HERO: Hero = {
    name: 'Test Hero',
    path: 'Warrior',
    career: 'Test Class',
    stats: {
        speed: 4,
        brawn: 4,
        magic: 4,
        armour: 0,
        health: 20,
        maxHealth: 20
    },
    equipment: {
        mainHand: { id: 'sword', name: 'Sword', type: 'mainHand', act: 1, stats: {}, abilities: [] },
    },
    backpack: [],
    money: 0
};

const MOCK_ENEMY: Enemy = {
    name: 'Test Enemy',
    speed: 3,
    brawn: 3,
    magic: 0,
    armour: 0,
    health: 20,
    maxHealth: 20,
    abilities: []
};

const INITIAL_STATE: CombatState = {
    round: 1,
    phase: 'combat-start',
    enemy: MOCK_ENEMY,
    heroHealth: 20,
    winner: null,
    activeAbilities: [],
    modifiers: [],
    logs: []
};

describe('Ability Registry', () => {
    it('should retrieve registered abilities', () => {
        const acid = getAbilityDefinition('Acid');
        expect(acid).toBeDefined();
        expect(acid?.name).toBe('Acid');
    });

    it('should return undefined for unknown abilities', () => {
        const unknown = getAbilityDefinition('UnknownAbility');
        expect(unknown).toBeUndefined();
    });

    it('should allow registering new abilities', () => {
        const newAbility: AbilityDefinition = {
            name: 'TestAbility',
            type: 'passive',
            description: 'Test Description',
            onCombatStart: (state) => ({ ...state, logs: [] })
        };
        registerAbility(newAbility);
        expect(getAbilityDefinition('TestAbility')).toBe(newAbility);
    });
});

describe('Ability Implementations', () => {
    describe('Acid', () => {
        it('should add 1 damage per die rolled', () => {
            const acid = getAbilityDefinition('Acid');
            const bonus = acid?.onDamageCalculate?.(INITIAL_STATE, MOCK_HERO, 10, [1, 4, 6]);
            expect(bonus).toBe(3);
        });
    });

    describe('Barbs', () => {
        it('should inflict 1 damage to enemy on round end', () => {
            const barbs = getAbilityDefinition('Barbs');
            const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 10 } };

            const updates = barbs?.onRoundEnd?.(state, MOCK_HERO);

            expect(updates?.enemy?.health).toBe(9);
            expect(updates?.logs?.[0].message).toContain('Barbs inflicts 1 damage');
        });

        it('should not reduce enemy health below 0', () => {
            const barbs = getAbilityDefinition('Barbs');
            const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 0 } };

            // The implementation checks if newHealth < oldHealth. If health is 0, max(0, -1) is 0. 
            // 0 < 0 is false, so it returns {}.
            const updates = barbs?.onRoundEnd?.(state, MOCK_HERO);
            expect(updates).toEqual({});
        });
    });

    describe('Adrenaline', () => {
        it('should add speed bonus modifier on activation', () => {
            const adrenaline = getAbilityDefinition('Adrenaline');
            const updates = adrenaline?.onActivate?.(INITIAL_STATE, MOCK_HERO);

            expect(updates?.modifiers).toHaveLength(1);
            expect(updates?.modifiers?.[0]).toMatchObject({
                name: 'Adrenaline',
                type: 'speed-bonus',
                value: 2,
                duration: 2
            });
        });
    });

    describe('Parry', () => {
        it('should be activatable only in damage-roll phase when enemy won', () => {
            const parry = getAbilityDefinition('Parry');

            // Valid state
            const validState: CombatState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'enemy' };
            expect(parry?.canActivate?.(validState, MOCK_HERO)).toBe(true);

            // Invalid phase
            const invalidPhase: CombatState = { ...INITIAL_STATE, phase: 'speed-roll', winner: 'enemy' };
            expect(parry?.canActivate?.(invalidPhase, MOCK_HERO)).toBe(false);

            // Invalid winner
            const invalidWinner: CombatState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'hero' };
            expect(parry?.canActivate?.(invalidWinner, MOCK_HERO)).toBe(false);
        });

        it('should cancel damage rolls on activation', () => {
            const parry = getAbilityDefinition('Parry');
            const validState: CombatState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'enemy' };

            const updates = parry?.onActivate?.(validState, MOCK_HERO);

            expect(updates?.phase).toBe('round-end');
            expect(updates?.damageRolls).toEqual([0]);
            expect(updates?.logs?.[0].message).toContain('blocked');
        });
    });

    describe('Heal', () => {
        it('should restore 4 health up to max', () => {
            const heal = getAbilityDefinition('Heal');
            const damagedState = { ...INITIAL_STATE, heroHealth: 10 };

            const updates = heal?.onActivate?.(damagedState, MOCK_HERO);
            expect(updates?.heroHealth).toBe(14);
        });

        it('should execute clamping to max health', () => {
            const heal = getAbilityDefinition('Heal');
            const mildDamageState = { ...INITIAL_STATE, heroHealth: 19 };

            const updates = heal?.onActivate?.(mildDamageState, MOCK_HERO);
            expect(updates?.heroHealth).toBe(20);
        });

        it('should return false for canActivate if health is full', () => {
            const heal = getAbilityDefinition('Heal');
            const fullHealthState = { ...INITIAL_STATE, heroHealth: 20 };
            expect(heal?.canActivate?.(fullHealthState, MOCK_HERO)).toBe(false);
        });

        it('should return true for canActivate if health is not full', () => {
            const heal = getAbilityDefinition('Heal');
            const damagedState = { ...INITIAL_STATE, heroHealth: 10 };
            expect(heal?.canActivate?.(damagedState, MOCK_HERO)).toBe(true);
        });
    });
});
