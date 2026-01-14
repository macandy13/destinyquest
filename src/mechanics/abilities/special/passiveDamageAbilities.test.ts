import { describe, expect, it, beforeEach } from 'vitest';
import { CombatState, hasEffect, requireAbilityDefinition } from '../../../types/combatState';
import {
    createCombatant,
    MOCK_HERO,
    MOCK_ENEMY,
    INITIAL_STATE
} from '../../../tests/testUtils';
import '../../allAbilities';

describe('DoT Abilities (passiveDamageAbilities)', () => {
    let state: CombatState;

    beforeEach(() => {
        state = {
            ...INITIAL_STATE,
            enemy: createCombatant(MOCK_ENEMY),
            hero: createCombatant(MOCK_HERO),
        };
    });

    describe('Always condition', () => {
        it('Black coils: should deal 2 damage ignoring armour', () => {
            state.hero = createCombatant({
                ...MOCK_HERO,
                stats: { ...MOCK_HERO.stats, health: 30, armour: 10 }
            });

            const def = requireAbilityDefinition('Black coils');
            state = def.onPassiveAbility!(state, { owner: 'enemy', target: 'hero' });

            expect(state.hero.stats.health).toBe(28);
            expect(state.damageDealt).toEqual([
                { target: 'hero', source: 'Black coils', amount: 2 }
            ]);
        });

        it('Fiery aura: should deal 3 damage', () => {
            state.hero.stats.health = 30;

            const def = requireAbilityDefinition('Fiery aura');
            state = def.onPassiveAbility!(state, { owner: 'enemy' });

            expect(state.hero.stats.health).toBe(27);
        });
    });

    describe('On-damage condition', () => {
        it('Black venom: should apply effect when damage dealt', () => {
            const def = requireAbilityDefinition('Black venom');

            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                5
            );
            expect(hasEffect(state, 'hero', 'Black venom')).toBe(true);

            state = def.onPassiveAbility!(state, { owner: 'enemy' });
            expect(state.hero.stats.health).toBe(28);
        });

        it('Black venom: should not apply effect when no damage', () => {
            const def = requireAbilityDefinition('Black venom');

            state = def.onDamageDealt!(
                state,
                { owner: 'enemy', target: 'hero' },
                'Attack',
                0
            );
            expect(hasEffect(state, 'hero', 'Black venom')).toBe(false);
        });
    });
});
