import { describe, it, expect, vi } from 'vitest';
import { getAbilityDefinition, registerAbility, AbilityDefinition } from './abilityDefinitions';
import { CombatState, Enemy } from '../types/combat';
import { Hero } from '../types/hero';

// Mocks
const MOCK_HERO: Hero = {
    name: 'Test Hero',
    path: 'Warrior',
    career: 'Gladiator',
    stats: { speed: 3, brawn: 5, magic: 1, armour: 2, health: 30, maxHealth: 30 },
    equipment: {
        mainHand: { id: 'sword1', name: 'Sword', type: 'mainHand', act: 1, stats: { brawn: 2 }, abilities: ['Sunder'] },
    },
    backpack: [],
    money: 100
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

// Generic mock state for ability testing
const INITIAL_STATE: CombatState = {
    hero: MOCK_HERO,
    enemy: MOCK_ENEMY,
    round: 1,
    phase: 'speed-roll',
    heroSpeedRolls: undefined,
    enemySpeedRolls: undefined,
    damageRolls: undefined,
    winner: 'hero',
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
            const bonus = acid?.onDamageCalculate?.(INITIAL_STATE, { total: 10, rolls: [1, 4, 6] });
            expect(bonus).toBe(3);
        });
    });

    describe('Barbs', () => {
        it('should inflict 1 damage to enemy on round end', () => {
            const barbs = getAbilityDefinition('Barbs');
            const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 10 } };

            const updates = barbs?.onRoundEnd?.(state);

            expect(updates?.enemy?.health).toBe(9);
            expect(updates?.logs?.[0].message).toContain('Barbs inflicts 1 damage');
        });

        it('should not reduce enemy health below 0', () => {
            const barbs = getAbilityDefinition('Barbs');
            const state = { ...INITIAL_STATE, enemy: { ...MOCK_ENEMY, health: 0 } };

            // The implementation checks if newHealth < oldHealth. If health is 0, max(0, -1) is 0. 
            // 0 < 0 is false, so it returns {}.
            const updates = barbs?.onRoundEnd?.(state);
            expect(updates).toEqual({});
        });
    });

    describe('Charm', () => {
        it('should allow activation when rolls exist', () => {
            const charm = getAbilityDefinition('Charm');
            // Speed phase
            const speedState: CombatState = { ...INITIAL_STATE, phase: 'speed-roll', heroSpeedRolls: [2, 3] };
            expect(charm?.canActivate?.(speedState)).toBe(true);

            // Damage phase (hero winning)
            const damageState: CombatState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'hero', damageRolls: [4] };
            expect(charm?.canActivate?.(damageState)).toBe(true);

            // Invalid phases
            const startState: CombatState = { ...INITIAL_STATE, phase: 'combat-start' };
            expect(charm?.canActivate?.(startState)).toBe(false);
        });

        it('should set pendingInteraction on activate', () => {
            const charm = getAbilityDefinition('Charm');
            const speedState: CombatState = { ...INITIAL_STATE, phase: 'speed-roll', heroSpeedRolls: [2, 3], logs: [] };

            const result = charm?.onActivate?.(speedState);
            expect(result?.pendingInteraction).toEqual({
                abilityName: 'Charm',
                type: 'reroll',
                target: 'hero-speed'
            });
        });

        it('should reroll speed die on interaction', () => {
            const charm = getAbilityDefinition('Charm');
            const state: CombatState = {
                ...INITIAL_STATE,
                phase: 'speed-roll',
                heroSpeedRolls: [1, 1],
                pendingInteraction: { abilityName: 'Charm', type: 'reroll', target: 'hero-speed' },
                logs: []
            };

            // Mock Math.random to roll a 6
            const spy = vi.spyOn(Math, 'random').mockReturnValue(0.99); // 6

            const updates = charm?.onReroll?.(state, 0);

            expect(updates?.heroSpeedRolls).toEqual([6, 1]);
            expect(updates?.pendingInteraction).toBeUndefined();

            spy.mockRestore();
        });
    });

    describe('Adrenaline', () => {
        it('should add speed bonus modifier on activation', () => {
            const adrenaline = getAbilityDefinition('Adrenaline');
            const state: CombatState = { ...INITIAL_STATE, logs: [] };
            const result = adrenaline?.onActivate?.(state);

            expect(result?.modifiers).toHaveLength(1);
            expect(result?.modifiers![0]).toMatchObject({
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
            expect(parry?.canActivate?.(validState)).toBe(true);

            // Invalid phase
            const invalidPhase: CombatState = { ...INITIAL_STATE, phase: 'speed-roll', winner: 'enemy' };
            expect(parry?.canActivate?.(invalidPhase)).toBe(false);

            // Invalid winner
            const invalidWinner: CombatState = { ...INITIAL_STATE, phase: 'damage-roll', winner: 'hero' };
            expect(parry?.canActivate?.(invalidWinner)).toBe(false);

            const updates = parry?.onActivate?.(validState);

            expect(updates?.phase).toBe('round-end');
            expect(updates?.damageRolls).toEqual([0]);
            expect(updates?.logs?.[0].message).toContain('blocked');
        });
    });

    describe('Heal', () => {
        it('should restore 4 health up to max', () => {
            const heal = getAbilityDefinition('Heal');
            const damagedState = {
                ...INITIAL_STATE,
                hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 10 } }
            };

            const updates = heal?.onActivate?.(damagedState);
            expect(updates?.hero?.stats.health).toBe(14);
        });

        it('should execute clamping to max health', () => {
            const heal = getAbilityDefinition('Heal');
            const mildDamageState = {
                ...INITIAL_STATE,
                hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 29 } }
            };

            const updates = heal?.onActivate?.(mildDamageState);
            expect(updates?.hero?.stats.health).toBe(30);
        });

        it('should return false for canActivate if health is full', () => {
            const heal = getAbilityDefinition('Heal');
            const fullHealthState = {
                ...INITIAL_STATE,
                hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 30 } }
            };
            expect(heal?.canActivate?.(fullHealthState)).toBe(false);
        });

        it('should return true for canActivate if health is not full', () => {
            const heal = getAbilityDefinition('Heal');
            const damagedState = {
                ...INITIAL_STATE,
                hero: { ...MOCK_HERO, stats: { ...MOCK_HERO.stats, health: 10 } }
            };
            expect(heal?.canActivate?.(damagedState)).toBe(true);
        });
    });
});
