import { describe, it, expect } from 'vitest';
import { getAbilityDefinition } from '../../abilityRegistry';
import './AvengingSpirit';
import { enemyWithStats, heroWithStats, INITIAL_STATE } from '../../../tests/testUtils';
import { getActiveEnemy } from '../../../types/combatState';

describe('Avenging Spirit', () => {
    it('should inflict damage back on taking partial damage', () => {
        const ability = getAbilityDefinition('Avenging Spirit');
        const state = {
            ...INITIAL_STATE,
            hero: heroWithStats({ armour: 2 }),
            enemies: [enemyWithStats({ health: 10 })], activeEnemyIndex: 0
        };
        // Mock damage dealt to hero
        const result = ability?.onDamageDealt?.(state, { owner: 'hero', target: 'hero' }, 'Attack', 5);
        expect(getActiveEnemy(result!).stats.health).toBe(8);
    });
});
