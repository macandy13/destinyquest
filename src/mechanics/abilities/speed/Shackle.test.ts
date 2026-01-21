import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { MOCK_HERO } from '../../../tests/testUtils';
import { endRound, MOCK_ENEMY, startCombat, startRound } from '../../CombatEngine';
import './Shackle';
import { getActiveEnemy } from '../../../types/combatState';

describe('Shackle', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Shackle')!;
        expect(def).toBeDefined();
        ability = def;
    });

    it('should add speed reduction to enemy on activation', () => {
        let state = startCombat(MOCK_HERO, [MOCK_ENEMY]);
        expect(ability.canActivate!(state, { owner: 'hero' })).toBe(true);

        const result = ability.onActivate!(state, { owner: 'hero' });
        expect(getActiveEnemy(result!).activeEffects).toEqual([
            expect.objectContaining({
                stats: { speedDice: -1 },
                target: 'enemy',
                duration: 1,
            }),
        ]);
    });

    it('should not be available if used once per combat', () => {
        let state = startCombat(MOCK_HERO, [MOCK_ENEMY]);
        state = ability.onActivate!(state, { owner: 'hero' });
        state = endRound(state);
        state = startRound(state);
        expect(ability.canActivate!(state, { owner: 'hero' })).toBe(false);
    });
});
