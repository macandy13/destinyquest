import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.winner === 'hero';
}

registerAbility({
    name: 'Ignite',
    type: 'combat',
    description: 'After winning a round, roll 2 damage dice and apply to each opponent (ignoring armour) and cause them to burn.',
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        const dmgRolls = rollDice(2);
        const dmg = sumDice(dmgRolls);

        return {
            phase: 'round-end',
            damageRolls: dmgRolls,
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Ignite' }],
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: { health: -dmg }, source: 'Ignite', target: 'enemy' },
                    id: `ignite-burn-damage-${state.round}`,
                    duration: 1,
                },
                {
                    modification: { stats: {}, source: 'Ignite', target: 'enemy' },
                    id: `ignite-burn-state-${state.round}`,
                    duration: undefined // Burn lasts until removed? 'cause them to burn'. Usually lasts for combat or until Cauterise.
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: `Ignite! Inflicted ${dmg} damage and applied Burn.`, type: 'damage-hero' })
        };
    }
});
