import { registerAbility } from '../../abilityRegistry';
import { CombatState, healDamage } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

registerAbility({
    name: 'Leech',
    type: 'passive',
    description: 'Restore 2 health every time you cause health damage (cannot exceed max health).',
    onDamageDealt: (state: CombatState, owner: CharacterType, target: CharacterType, amount: number): Partial<CombatState> => {
        if (owner === target) return {};
        if (amount <= 0) return {};
        return healDamage(state, 'Leech', owner, 2);
    }
});
