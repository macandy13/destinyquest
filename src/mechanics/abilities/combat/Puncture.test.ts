import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import './Puncture';

describe('Puncture', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Puncture')!;
        expect(def).toBeDefined();
        ability = def;
    });

    // TODO: Write test
});
