import { renderHook } from '@testing-library/react';
import { useCombat } from './useCombat';
import { describe, it, expect } from 'vitest';
import { MOCK_ENEMY, MOCK_HERO } from '../tests/testUtils';

describe('useCombat Hook', () => {
    it('should initialize in inactive state', () => {
        const { result } = renderHook(() => useCombat(MOCK_HERO, MOCK_ENEMY));
        expect(result.current.combat.phase).toBe('combat-start');
    });
});
