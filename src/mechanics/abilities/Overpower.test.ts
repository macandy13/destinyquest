import { describe, it, expect, beforeEach } from 'vitest';
import { AbilityDefinition, getAbilityDefinition } from '../abilityRegistry';
import './Overpower';

describe('Overpower', () => {
    let ability: AbilityDefinition;

    beforeEach(() => {
        const def = getAbilityDefinition('Overpower')!;
        expect(def).toBeDefined();
        ability = def;
    });

    // TODO: Write test
});
