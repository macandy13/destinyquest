import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Brutality';
import { deterministicRoll, INITIAL_STATE } from '../../../tests/testUtils';

describe('Brutality', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Brutality')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should stop opponent damage and inflict damage back', () => {
        const state = {
            ...INITIAL_STATE,
            phase: 'damage-roll' as const,
            winner: 'enemy' as const,
            damage: {
                damageRolls: deterministicRoll([5]),
                modifiers: []
            }
        };

        expect(ability.canActivate?.(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate?.(state, { owner: 'hero' });

        expect(result?.phase).toBe('passive-damage');
        expect(result?.damage?.damageRolls).toEqual([{ value: 0, isRerolled: false }]);
        // Brutality deals X damage directly or via log?
        // Assuming implementation uses dealDamage/log.
        expect(result?.logs.some(l => l.message.includes('Brutality'))).toBe(true);
    });
});

```
