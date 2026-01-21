import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Haunt';
import { INITIAL_STATE } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combatState';

describe('Haunt', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Haunt')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should summon spirit', () => {
        const state = INITIAL_STATE;
        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.enemies[0].activeEffects).toHaveLength(1);
        expect(result?.enemies[0].activeEffects[0].source).toBe('Haunt Spirit');
    });

    it('should inflict damage at round end if spirit active', () => {
        const state: CombatState = {
            ...INITIAL_STATE,
            enemies: [{
                ...INITIAL_STATE.enemies[0],
                activeEffects: [{
                    stats: {},
                    source: 'Haunt Spirit',
                    target: 'enemy',
                    duration: 1
                }]
            }],
        };
        const result = ability.onPassiveAbility?.(state, { owner: 'hero' });

        // Check logs for damage
        expect(result?.logs.some(l => l.message?.includes('Haunt dealt 2 damage'))).toBe(true);

        // Or check stats
        expect(result?.enemies[0].stats.health).toBeLessThan(INITIAL_STATE.enemies[0].stats.health);
    });

    it('should dispel on double roll', () => {
        const rolls = [{ value: 3, isRerolled: false }, { value: 3, isRerolled: false }];
        const state: CombatState = {
            ...INITIAL_STATE,
            enemies: [{
                ...INITIAL_STATE.enemies[0],
                activeEffects: [{
                    stats: {},
                    source: 'Haunt Spirit',
                    target: 'enemy',
                    duration: 1
                }]
            }],
            heroSpeedRolls: rolls
        };

        const result = ability.onSpeedRoll?.(state, { owner: 'hero' });

        expect(result?.enemies[0].activeEffects).toEqual([]);
    });
});
