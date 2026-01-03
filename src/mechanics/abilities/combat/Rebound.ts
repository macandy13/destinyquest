import { registerAbility } from '../../abilityRegistry';
import { CombatState, appendEffect } from '../../../types/CombatState';
import { CharacterType } from '../../../types/Character';

registerAbility({
    name: 'Rebound',
    type: 'combat',
    description: 'If you take health damage, increase your speed by 2 for the next round.',
    onDamageDealt: (state: CombatState, { owner, target }: { owner: CharacterType, target?: CharacterType }, _source: string, amount: number): CombatState => {
        // Owner is ability owner. Target is victim (who took damage).
        // If owner took damage (owner == target), trigger.
        if (!target || target !== owner) return state;
        if (amount <= 0) return state;

        return appendEffect(state, owner, {
            stats: { speed: 2 },
            source: 'Rebound',
            target: owner,
            duration: 2
        });
    }
});
