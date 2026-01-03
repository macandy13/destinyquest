import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/CombatState';

registerAbility({
    name: 'Rust',
    type: 'combat',
    description: "If you cause health damage, lower opponent's armour by 2 for the remainder of combat.",
    onDamageDealt: (state, { target }, _source, amount) => {
        if (amount <= 0) return state;
        return appendEffect(state, target!, {
            stats: { armour: -2 },
            source: 'Rust',
            target: target!,
            duration: undefined,
        });
    },
});
