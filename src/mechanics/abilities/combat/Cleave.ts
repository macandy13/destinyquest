import { registerAbility } from '../../abilityRegistry';
import { rollDice, sumDice } from '../../../utils/dice';
import { CombatState, dealDamage } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    return owner === 'hero'
        && state.winner === 'hero'
        && state.phase === 'damage-roll';
}
registerAbility({
    name: 'Cleave',
    type: 'combat',
    description: 'Instead of rolling damage after winning a round, roll 1 damage die and apply the result to each opponent, ignoring armour.',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return null;

        const damageRoll = rollDice(1);
        const damage = sumDice(damageRoll);

        return {
            phase: 'round-end',
            damageRolls: damageRoll,
            ...dealDamage(state, 'Cleave', 'enemy', damage),
        };
    }
});
