import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../types/Dice';
import { isHeroDamageRollPhase } from '../abilityFactories';
import { dealDamage, appendEffect, skipDamagePhase } from '../../../types/CombatState';
import { Effect } from '../../../types/Effect';

registerAbility({
    name: 'Puncture',
    type: 'combat',
    description: "Instead of rolling damage, inflict 2 damage dice (ignoring armour) and reduce opponent's armour by 1 for the remainder of the combat.",
    canActivate: isHeroDamageRollPhase,
    onActivate: (state, context) => {
        if (!isHeroDamageRollPhase(state)) return state;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);

        const enemy = state.enemy;
        if (!enemy) return state; // Should be safe with isHeroDamageRollPhase logic usually

        const statMod: Effect = {
            stats: {
                armour: -1
            },
            source: 'Puncture',
            target: 'enemy',
            duration: undefined
        };

        // Apply damage then effect then skip phase
        // Puncture deals 2 damage dice ignoring armour (is dealDamage ignoring armour? dealDamage is plain damage, ignore armour is calling side check?)
        // dealDamage simply subtracts health. It does not look at armour. So "ignore armour" is implicit if we pass raw damage. Correct.
        state = dealDamage(state, 'Puncture', 'enemy', dmg);
        // appendEffect doesn't exist? Check CombatState.ts. It does.
        // Wait, current code used spread: `...statMod`. `statMod` is likely an Effect object or partial.
        // `createStatModification` returns Effect.
        // I need to use `appendEffect`.

        state = appendEffect(state, 'enemy', statMod);
        return skipDamagePhase(state, 'Puncture dealt damage and reduced armour');
    }
});
