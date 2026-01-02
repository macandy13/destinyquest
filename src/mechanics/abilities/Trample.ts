import { registerAbility } from '../abilityRegistry';
import { CombatState, DiceRoll } from '../../types/combat';
import { CharacterType } from '../../types/stats';

registerAbility({
    name: 'Trample',
    type: 'passive',
    description: 'If the enemy rolls a 6 on their damage roll, add 5 to the damage.',
    onDamageCalculate: (state: CombatState, _target: CharacterType, damage: { total: number, rolls: DiceRoll[] }) => {
        if (state.winner === 'hero') {
            return 0;
        }
        return damage.rolls.some(r => r.value === 6) ? 5 : 0;
    }
});