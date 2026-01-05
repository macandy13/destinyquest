import { registerAbility, AbilityContext } from '../../abilityRegistry';
import { addLogs, CombatState, dealDamage, skipDamagePhase } from '../../../types/combatState';
import { rollDice, sumDice } from '../../../types/dice';


function canActivate(state: CombatState, _context: AbilityContext): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
}

registerAbility({
    name: 'Rake',
    type: 'combat',
    description: 'After winning a round, inflict 3 damage dice (ignoring armour). Modifiers cannot be used.',
    canActivate: canActivate,
    onActivate: (state, context) => {
        if (!canActivate(state, context)) return state;

        const dmgRolls = rollDice(3);
        const dmg = sumDice(dmgRolls);
        const rollValues = dmgRolls.map(r => r.value).join('+');

        state = dealDamage(state, 'Rake', 'enemy', dmg);
        state = addLogs(state, { round: state.round, message: `Rake! Inflicted ${dmg} damage (${rollValues}).`, type: 'damage-hero' });

        return skipDamagePhase(state, 'Rake skipped normal damage roll');
    }
});
