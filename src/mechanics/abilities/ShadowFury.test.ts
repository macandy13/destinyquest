import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './ShadowFury';
import { INITIAL_STATE, createCombatant, heroWithStats, testEquipment } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';
import { Combatant } from '../../types/combatant';
import { Hero } from '../../types/hero';

describe('Shadow Fury', () => {
    it('should add weapon speed to damage score', () => {
        const ability = getAbilityDefinition('Shadow Fury');

        const customHero = {
            ...heroWithStats({}).original,
            equipment: {
                mainHand: testEquipment({
                    name: 'Sword',
                    type: 'mainHand',
                    stats: { speed: 2 },
                }),
                leftHand: testEquipment({
                    name: 'Dagger',
                    type: 'leftHand',
                    stats: { speed: 1 },
                })
            }
        };

        const state: CombatState = {
            ...INITIAL_STATE,
            hero: createCombatant(customHero) as Combatant<Hero>,
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageModifier).toBe(3); // 2+1
    });
});
