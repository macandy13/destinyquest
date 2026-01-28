import { describe, it, expect } from 'vitest';
import {
    startCombat,
    startRound,
    endRound,
    rollForSpeed,
    rollForDamage,
    applyDamage,
    applyPassiveAbilities,
    useBackpackItem,
    activateAbility,
} from '../CombatEngine';
import { TEST_BOOK, deterministicRoll, mockDiceRolls } from '../../tests/testUtils';
import { Hero } from '../../types/hero';
import { Enemy } from '../../types/character';
import { getActiveEnemy } from '../../types/combatState';

describe('Combat Scenarios', () => {
    it('Scenario: Ben vs Minorian', () => {
        const BEN_NEVIS: Hero = {
            type: 'hero',
            name: 'Ben Nevis',
            stats: {
                speed: 10,
                brawn: 12,
                magic: 0,
                armour: 3,
                health: 35,
                maxHealth: 35,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {
                mainHand: { id: 'daggers', type: 'mainHand', act: 1, name: 'Twin Daggers', abilities: ['Deep Wound'] } as any,
                talisman: {
                    id: 'ben-abilities', type: 'talisman', act: 1, name: 'Abilities',
                    abilities: [
                        'First Strike', 'Deadly Poisons', 'Webbed', 'Deep Wound', 'Piercing', 'Sidestep',
                        'Bleed', 'Life Spark', 'Venom', 'Charm', 'Critical Strike', 'Last Laugh', 'Heal'
                    ]
                } as any
            },
            backpack: [
                {
                    name: 'Gourd of Healing',
                    effect: { stats: { health: 6 }, source: 'Gourd of Healing', target: 'hero', duration: 0 },
                    uses: 1
                } as any,
                {
                    name: 'Pot of Brawn',
                    effect: { stats: { brawn: 2 }, source: 'Pot of Brawn', target: 'hero', duration: 1 },
                    duration: 1,
                    uses: 1
                } as any
            ],
            path: '',
            career: '',
            money: 0
        };

        const MINORIAN: Enemy = {
            type: 'enemy',
            name: 'Minorian',
            stats: {
                speed: 11,
                brawn: 10,
                magic: 0,
                armour: 8,
                health: 80,
                maxHealth: 80,
            },
            bookRef: TEST_BOOK,
            abilities: ['Charge', 'Trample', 'Bleed']
        };

        // --- START ---

        mockDiceRolls([2]);
        let state = startCombat(BEN_NEVIS, [MINORIAN]);
        expect(getActiveEnemy(state).stats.health).toBe(78); // 80 - 2 (First Strike)
        state = startRound(state);

        // --- ROUND 1 ---
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([3, 5]),
            /*enemy=*/ deterministicRoll([3, 5, 5]));
        expect(state.winner).toBe('enemy');

        state = rollForDamage(state, deterministicRoll([5]));
        state = activateAbility(state, 'Sidestep');
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(35); // Sidestep avoids damage.
        expect(getActiveEnemy(state).stats.health).toBe(74); // -1 Bleed & -3 Venom

        // --- ROUND 2 ---
        state = startRound(state);
        state = activateAbility(state, 'Webbed');

        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([3, 1]),
            /*enemy=*/ deterministicRoll([6]));
        expect(state.winner).toBe('enemy'); // 14 vs 17

        state = rollForDamage(state, deterministicRoll([6]));
        state = activateAbility(state, 'Last Laugh'); // Mock call
        state = rollForDamage(state, deterministicRoll([2]));
        // Damage: Trample on 6 -> +5. Reroll to 2.
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(25); // 35 - 9 (dmg) - 1 (bleed)
        expect(getActiveEnemy(state).stats.health).toBe(70); // 74 - 4 (Bleed & Venom)

        // --- ROUND 3 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([6, 3]),
            /*enemy=*/ deterministicRoll([4, 1]));
        expect(state.winner).toBe('hero'); // 19 vs 16

        state = rollForDamage(state, deterministicRoll([5]));
        state = activateAbility(state, 'Piercing');
        state = useBackpackItem(state, 1); // Pot of Brawn
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 5 + 12(Brawn) + 2(Pot) = 19. Armour 0 (Piercing).
        expect(getActiveEnemy(state).stats.health).toBe(47); // 70 - 19 - 4
        expect(state.hero!.stats.health).toBe(24); // 26 (No damage)

        // --- ROUND 4 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([2, 4]),
            /*enemy=*/ deterministicRoll([5, 4]));
        // Charm Reroll logic manually simulated or if capability exists
        state = activateAbility(state, 'Charm');
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([3, 4]),
            /*enemy=*/ deterministicRoll([5, 4]));
        expect(state.winner).toBe('enemy'); // 17 vs 20

        state = rollForDamage(state, deterministicRoll([3]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 3 + 10 = 13. Armour 3. 10 Dmg.
        expect(state.hero!.stats.health).toBe(13); // 24 - 10 - 1
        expect(getActiveEnemy(state).stats.health).toBe(43); // 47 - 4

        // --- POST R4 HEAL ---
        state = useBackpackItem(state, 0); // Gourd +6
        state = activateAbility(state, 'Heal'); // +4
        expect(state.hero!.stats.health).toBe(23); // 13 + 6 + 4 = 23

        // --- ROUND 5 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([6, 5]),
            /*enemy=*/ deterministicRoll([2, 6]));
        expect(state.winner).toBe('hero');

        state = activateAbility(state, 'Deep Wound');
        state = rollForDamage(state, deterministicRoll([1, 5]));
        state = activateAbility(state, 'Critical Strike'); // Sets to 6, 6
        // Automatically triggers LifeSpark (double 6)
        state = applyDamage(state); // Heal 4
        expect(state.hero!.stats.health).toBe(27); // 23 + 4 = 27

        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 6+6 + 12 = 24. Armour 8. 16 Dmg.
        expect(getActiveEnemy(state).stats.health).toBe(23); // 43 - 16 - 4
        expect(state.hero!.stats.health).toBe(26); // 23 + 4 - 1 = 26

        // --- ROUND 6 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([2, 2]),
            /*enemy=*/ deterministicRoll([5, 4]));
        expect(state.winner).toBe('enemy'); // 14 vs 20

        state = rollForDamage(state, deterministicRoll([6]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 6 + 10 + 5(Trample) = 21. Armour 3. 18 Dmg.
        // HP: 30 (26+4) - 18 - 1 = 11.
        expect(state.hero!.stats.health).toBe(11);
        expect(getActiveEnemy(state).stats.health).toBe(19); // 23 - 4

        // --- ROUND 7 ---
        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([4, 6]),
            /*enemy=*/ deterministicRoll([1, 4]));
        expect(state.winner).toBe('hero');

        state = rollForDamage(state, deterministicRoll([1]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 1 + 12 = 13. Armour 8. 5 Dmg.
        expect(getActiveEnemy(state).stats.health).toBe(10); // 19 - 5 - 4
        expect(state.hero!.stats.health).toBe(10); // 11 - 1 (bleed)

        // --- ROUND 8 ---
        state = startRound(state);
        state = rollForSpeed(state,
            /*hero=*/ deterministicRoll([3, 5]),
            /*enemy=*/ deterministicRoll([2, 2]));
        expect(state.winner).toBe('hero');

        state = rollForDamage(state, deterministicRoll([2]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        // Dmg: 2 + 12 = 14. Armour 8. 6 Dmg.
        expect(getActiveEnemy(state).stats.health).toBe(0); // 10 - 6 - 4 => 0.
        expect(state.hero!.stats.health).toBe(9); // 10 - 1 (bleed)
    });

    it('Scenario: Sir Hugo vs Serpent', () => {
        const SIR_HUGO: Hero = {
            type: 'hero',
            name: 'Sir Hugo',
            stats: {
                speed: 4,
                brawn: 7,
                magic: 1,
                armour: 5,
                health: 30,
                maxHealth: 30,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {},
            backpack: [],
            path: '',
            career: '',
            money: 0
        };

        const SERPENT: Enemy = {
            type: 'enemy',
            name: 'Serpent',
            stats: {
                speed: 6,
                brawn: 3,
                magic: 0,
                armour: 2,
                health: 12,
                maxHealth: 12,
            },
            bookRef: TEST_BOOK,
            abilities: ['Venom']
        };

        let state = startCombat(SIR_HUGO, [SERPENT]);
        state = startRound(state);

        // --- ROUND 1 ---
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([2, 4]),
            /*enemy=*/ deterministicRoll([5, 6]));
        expect(state.winner).toBe('enemy');

        state = rollForDamage(state, deterministicRoll([6]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(24); // 30 - 4 - 2
        expect(state.enemies[0].stats.health).toBe(12);

        state = startRound(state);
        state = rollForSpeed(
            state,
            /*hero=*/ deterministicRoll([5, 6]),
            /*enemy=*/ deterministicRoll([2, 2]));
        expect(state.winner).toBe('hero');
        state = rollForDamage(state, deterministicRoll([5]));
        state = applyDamage(state);
        state = applyPassiveAbilities(state);
        state = endRound(state);

        expect(state.hero!.stats.health).toBe(22);
        expect(state.enemies[0].stats.health).toBe(2);
    });

    it('Scenario: Gladiator vs Troll (Battle of Attrition)', () => {
        // Gladiator: High Brawn/Armour, 'Knockdown'
        const HERO: Hero = {
            type: 'hero',
            name: 'Maximus',
            path: 'Warrior',
            career: 'Gladiator',
            stats: {
                speed: 9,
                brawn: 14,
                magic: 0,
                armour: 6,
                health: 40,
                maxHealth: 40,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {
                mainHand: { id: 'sword', type: 'mainHand', act: 1, name: 'Gladius', abilities: ['Knockdown'] } as any
            },
            backpack: [],
            money: 0
        };

        // Troll: S5 B6 A3 H60, Knockdown, Regeneration
        const ENEMY: Enemy = {
            type: 'enemy',
            name: 'Troll',
            stats: {
                speed: 5,
                brawn: 6,
                magic: 0,
                armour: 3,
                health: 60,
                maxHealth: 60,
            },
            bookRef: TEST_BOOK,
            abilities: ['Knockdown', 'Regeneration']
        };

        // Mock dice for startCombat just in case (e.g. initiative or passive triggers)
        mockDiceRolls([3, 3, 3, 3, 3]);

        let state = startCombat(HERO, [ENEMY]);
        state = startRound(state);

        // Round 1
        // Hero Speed: 9 + [4, 5] = 18
        // Enemy Speed: 5 + [2, 3] = 10
        state = rollForSpeed(
            state,
            deterministicRoll([4, 5]),
            deterministicRoll([2, 3])
        );
        expect(state.winner).toBe('hero');

        // Hero Damage
        // Damage Dice: 1. Roll: 6.
        // Total: 6 + 14 = 20. Armour 3. Result: 17 dmg.
        state = rollForDamage(state, deterministicRoll([6]));
        state = applyDamage(state);

        expect(getActiveEnemy(state).stats.health).toBe(43); // 60 - 17 = 43

        state = applyPassiveAbilities(state);
        state = endRound(state);
    });

    it('Scenario: Pyromancer vs Bat Swarm (Speed Kills)', () => {
        // Hero: Mage, High Magic, Low Brawn
        const HERO: Hero = {
            type: 'hero',
            name: 'Ignis',
            path: 'Mage',
            career: 'Pyromancer',
            stats: {
                speed: 8,
                brawn: 6,
                magic: 14,
                armour: 2,
                health: 30,
                maxHealth: 30,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {
                talisman: { id: 'wand', type: 'talisman', act: 1, name: 'Fire Wand', abilities: [] } as any
            },
            backpack: [],
            money: 0
        };

        // Bat Swarm: S7 B8 A4 H20
        const ENEMY: Enemy = {
            type: 'enemy',
            name: 'Bat Swarm',
            stats: {
                speed: 7,
                brawn: 8,
                magic: 0,
                armour: 4,
                health: 20,
                maxHealth: 20,
            },
            bookRef: TEST_BOOK,
            abilities: ['Watch your step', 'Wounded']
        };

        mockDiceRolls([1, 1]); // Minimal random calls

        let state = startCombat(HERO, [ENEMY]);
        state = startRound(state);

        // Round 1
        // Speed: Hero 8 + [6, 6] = 20.
        // Enemy 7 + [6, 6] = 19.
        state = rollForSpeed(
            state,
            deterministicRoll([6, 6]),
            deterministicRoll([6, 6])
        );
        expect(state.winner).toBe('hero');

        // Hero Damage
        // 6 (Roll) + 6 (Brawn) = 12. Armour 4. Dmg 8.
        state = rollForDamage(state, deterministicRoll([6]));
        state = applyDamage(state);

        expect(getActiveEnemy(state).stats.health).toBe(4); // 20 - 16 (16 dmg: 6 roll + 14 magic - 4 armour)

        state = applyPassiveAbilities(state);
        state = endRound(state);
    });

    it('Scenario: Assassin vs Stone Giant (Piercing Armour)', () => {
        // Hero: Rogue, High Speed
        const HERO: Hero = {
            type: 'hero',
            name: 'Shade',
            path: 'Rogue',
            career: 'Assassin',
            stats: {
                speed: 13,
                brawn: 8,
                magic: 5,
                armour: 3,
                health: 35,
                maxHealth: 35,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {
                mainHand: { id: 'daggers', type: 'mainHand', act: 1, name: 'Stilettos', abilities: ['Deep Wound', 'Piercing'] } as any
            },
            backpack: [],
            money: 0
        };

        // Stone Giant: S10 B10 A12 H50, Body of rock (halves damage? or adds armour?)
        const ENEMY: Enemy = {
            type: 'enemy',
            name: 'Stone Giant',
            stats: {
                speed: 10,
                brawn: 10,
                magic: 0,
                armour: 12,
                health: 50,
                maxHealth: 50,
            },
            bookRef: TEST_BOOK,
            abilities: ['Body of rock', 'Knockdown']
        };

        let state = startCombat(HERO, [ENEMY]);
        state = startRound(state);

        // Round 1: Speed
        // Hero 13 + [3, 3] = 19
        // Enemy 10 + [4, 4] = 18
        state = rollForSpeed(
            state,
            deterministicRoll([3, 3]),
            deterministicRoll([4, 4])
        );
        expect(state.winner).toBe('hero');

        // Damage
        // Roll 6. Dmg = 6 + 8 = 14.
        // Armour 12. Normal dmg = 2.
        // BUT 'Piercing' ignores armour.
        // So Dmg = 14.
        // 'Body of rock' might reduce it. Let's assume generic logic or just check Piercing works.
        state = rollForDamage(state, deterministicRoll([6]));
        state = activateAbility(state, 'Piercing');
        state = applyDamage(state);

        // If Piercing worked: 50 - 14 = 36.
        // If Body of rock worked (halve damage?): 14 / 2 = 7. 50 - 7 = 43.
        // If both: 50 - 7 = 43.

        state = endRound(state);
    });

    it('Scenario: Paladin vs Vampire (Healing vs Drain)', () => {
        const HERO: Hero = {
            type: 'hero',
            name: 'Godric',
            path: 'Warrior',
            career: 'Paladin',
            stats: {
                speed: 8,
                brawn: 12,
                magic: 8,
                armour: 8,
                health: 45,
                maxHealth: 45,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {
                talisman: { id: 'holy-symbol', type: 'talisman', act: 1, name: 'Holy Symbol', abilities: ['Heal'] } as any,
                mainHand: { id: 'mace', type: 'mainHand', act: 1, name: 'Mace', abilities: [] } as any
            },
            backpack: [],
            money: 0
        };

        // Vampire: S8 B- (uses Speed?) A8 H60
        // Vampire ability: Drains health on hit.
        const ENEMY: Enemy = {
            type: 'enemy',
            name: 'Baron Greylock',
            stats: {
                speed: 8,
                brawn: 8,
                magic: 5,
                armour: 5,
                health: 60,
                maxHealth: 60,
            },
            bookRef: TEST_BOOK,
            abilities: ['Vampire', 'Blood harvest']
        };

        let state = startCombat(HERO, [ENEMY]);
        state = startRound(state);

        // Round 1: Enemy Wins
        // Hero 8 + [2, 2] = 12
        // Enemy 8 + [5, 5] = 18
        state = rollForSpeed(
            state,
            deterministicRoll([2, 2]),
            deterministicRoll([5, 5])
        );
        expect(state.winner).toBe('enemy');

        // Enemy Damage
        // Roll 5. Dmg = 5 + 8 = 13.
        // Armour 8. 5 Dmg.
        // Vampire ability should heal enemy equal to damage dealt (5).
        state = rollForDamage(state, deterministicRoll([5]));
        state = applyDamage(state);

        expect(state.hero!.stats.health).toBe(40); // 45 - 5
        // Enemy health should be 60 + 5 (if Vampire works) -> 65 (capped at maxHealth usually?)
        // If capped, it stays 60.

        // Hero uses Heal immediately start of next round (or end of this one?)
        // Heal is usually an Action ability used in combat round if Hero wins, or special phase.
        // In this game actiovation depends on timing.
        state = endRound(state);
    });

    it('Scenario: Beastmaster vs Wolf Pack (Minion vs Pack)', () => {
        const HERO: Hero = {
            type: 'hero',
            name: 'Rex',
            path: 'Warrior',
            career: 'Beastmaster',
            stats: {
                speed: 10,
                brawn: 10,
                magic: 4,
                armour: 5,
                health: 40,
                maxHealth: 40,
                speedDice: 2,
                damageDice: 1
            },
            equipment: {
                mainHand: { id: 'whip', type: 'mainHand', act: 1, name: 'Whip', abilities: ['First Strike'] } as any // First Strike to simulate quick pet attack
            },
            backpack: [],
            money: 0
        };

        // Big bad wolf
        const ENEMY: Enemy = {
            type: 'enemy',
            name: 'Big Bad Wolf',
            stats: {
                speed: 12,
                brawn: 12,
                magic: 0,
                armour: 0,
                health: 40, // Buffed for scenario
                maxHealth: 40,
            },
            bookRef: TEST_BOOK,
            abilities: []
        };

        mockDiceRolls([1, 1]); // initial rolls if any

        let state = startCombat(HERO, [ENEMY]);

        // Before Round 1: First Strike (Hero ability)
        // First Strike does dmg = Roll value?
        // With mockDiceRolls([1]), dmg = 1.

        state = startRound(state);

        // Round 1:
        // Hero 10 + [4, 6] = 20
        // Enemy 12 + [1, 2] = 15
        state = rollForSpeed(
            state,
            deterministicRoll([4, 6]),
            deterministicRoll([1, 2])
        );
        expect(state.winner).toBe('hero');

        state = rollForDamage(state, deterministicRoll([4]));
        // Damage: 4 + 10 = 14. Armour 0.
        state = applyDamage(state);

        // Initial Health 40.
        // First Strike: -1 (Total 39).
        // Round 1 Dmg: -14 (Total 25).
        expect(getActiveEnemy(state).stats.health).toBe(25);

        state = endRound(state);
    });

});
