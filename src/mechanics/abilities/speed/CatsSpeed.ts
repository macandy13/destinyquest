import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/combatState';
import { canModifySpeed } from '../abilityFactories';
import { getStatIcon } from '../../../types/stats';

registerAbility({
    name: "Cat's speed",
    type: 'speed',
    description: 'Roll an extra die to determine attack speed for one round.',
    icon: getStatIcon('speed'),
    canActivate: canModifySpeed,
    onActivate: (state, context) => {
        if (!canModifySpeed(state)) return state;
        return appendEffect(state, context.owner, {
            stats: { speedDice: 1 },
            source: "Cat's speed",
            target: context.owner,
            duration: 1,
            icon: getStatIcon('speed'),
        });
    },
    onCombatStart: (state, context) => {
        if (context.owner === 'enemy') {
            return appendEffect(state, 'enemy', {
                stats: { speedDice: 1 },
                source: "Cat's speed",
                target: 'enemy',
                duration: undefined,
                icon: getStatIcon('speed'),
            });
        }
        return state;
    }
});
