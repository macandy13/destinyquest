import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../abilityRegistry';
import './ShadowFury';
import { INITIAL_STATE, MOCK_HERO } from '../../tests/testUtils';
import { CombatState } from '../../types/combat';

describe('Shadow Fury', () => {
    it('should add weapon speed to damage score', () => {
        const ability = getAbilityDefinition('Shadow Fury');

        const customHero = {
            ...MOCK_HERO,
            equipment: {
                mainHand: { id: 's', name: 'Sword', type: 'mainHand', stats: { speed: 2 }, act: 1, book: 'core' } as any,
                leftHand: { id: 'd', name: 'Dagger', type: 'leftHand', stats: { speed: 1 }, act: 1, book: 'core' } as any
            }
        };

        const state: CombatState = {
            ...INITIAL_STATE,
            hero: {
                ...INITIAL_STATE.hero!,
                original: customHero
            },
            logs: []
        };
        const result = ability?.onActivate?.(state);

        expect(result?.modifications).toHaveLength(1);
        expect(result?.modifications![0].modification.stats.damageModifier).toBe(3); // 2+1
    });
});
