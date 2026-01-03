import { registerAbility } from '../abilityRegistry';
import { rollDice, sumDice } from '../../utils/dice';
import { createStatModification, isHeroDamageRollPhase } from './abilityFactories';
import { dealDamage } from '../../types/combat';

registerAbility({
    name: 'Puncture',
    type: 'combat',
    description: "Instead of rolling damage, inflict 2 damage dice (ignoring armour) and reduce opponent's armour by 1 for the remainder of the combat.",
    canActivate: isHeroDamageRollPhase,
    onActivate: (state) => {
        if (!isHeroDamageRollPhase(state)) return null;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);

        const enemy = state.enemy;
        if (!enemy) return null;

        const statMod = createStatModification({
            stats: {
                armour: -1
            },
            name: 'Puncture',
            description: 'Reduce opponent\'s armour by 1 for the remainder of the combat.',
            target: 'enemy',
            duration: undefined
        });
        return {
            ...statMod,
            ...dealDamage(state, 'Puncture', 'enemy', dmg),
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
        };
    }
});
