import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './ShadowFury';
import { INITIAL_STATE, createCombatant, heroWithStats, testEquipment } from '../../../tests/testUtils';
import { CombatState } from '../../../types/combat';
import { Combatant } from '../../../types/combatant';
import { Hero } from '../../../types/hero';

describe('Shadow Fury', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Shadow Fury')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add weapon speed to damage score', () => {
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
        const result = ability.onActivate?.(state, 'hero');

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageModifier).toBe(3); // 2+1
    });
});
