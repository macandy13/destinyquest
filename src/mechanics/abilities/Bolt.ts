import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    const isCharged = state.activeEffects.some(e => e.modification.source === 'Bolt');
    return state.phase === 'damage-roll' && state.winner === 'hero' && !isCharged;
}

registerAbility({
    name: 'Bolt',
    type: 'combat',
    description: "Instead of rolling damage, you can 'charge up' your wand. When you win your next round, you inflict 3 damage dice to one opponent, ignoring armour.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;

        // Charge up
        const chargeMod = {
            modification: {
                stats: {}, // No stats change, just a marker
                source: 'Bolt',
                target: 'hero' as const
            },
            id: `bolt-charge-${state.round}`,
            duration: undefined // Until consumed
        };

        return {
            phase: 'round-end',
            damageRolls: [{ value: 0, isRerolled: false }],
            modifications: [...state.modifications, chargeMod],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Bolt. Wand charging...", type: 'info' })
        };
    },
    onDamageRoll: (state, _rolls) => {
        const chargeMod = state.activeEffects.find(e => e.modification.source === 'Bolt');
        if (chargeMod && state.winner === 'hero') {
            // Bolt Release!
            const dmgRolls = rollDice(3);
            const dmg = sumDice(dmgRolls);
            const boltRolls = dmgRolls.map(r => r.value);

            // Remove charge
            const newEffects = state.activeEffects.filter(e => e.id !== chargeMod.id);

            return {
                activeEffects: newEffects,
                damageRolls: [{ value: 0, isRerolled: false }],
                damageDealt: [...state.damageDealt, { target: 'enemy', amount: dmg, source: 'Bolt' }],
                logs: addLog(state.logs, {
                    round: state.round,
                    message: `Bolt Released! Inflicted ${dmg} damage (${boltRolls.join('+')}).`,
                    type: 'damage-hero'
                })
            };
        }
        return {};
    }
});
