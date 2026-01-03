import { registerAbility } from '../../abilityRegistry';
import { CombatState, dealDamage } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

registerAbility({
    name: 'Reflect',
    type: 'combat',
    description: 'Reflect health damage back to vampire opponents.',
    onDamageDealt: (state: CombatState, owner: CharacterType, target: CharacterType, amount: number): Partial<CombatState> => {
        if (owner !== 'hero' || target !== 'hero' || amount <= 0) return {};

        const enemy = state.enemy;
        if (!enemy) return {};
        if (!enemy.original.abilities.includes('Vampire')) return {};

        return dealDamage(state, 'Reflect', 'enemy', amount);
    }
});
