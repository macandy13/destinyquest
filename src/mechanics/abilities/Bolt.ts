import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { CombatState, dealDamage } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function winnerIsNotCharged(state: CombatState, owner: CharacterType): boolean {
    const isCharged = state.activeEffects
        .some(e => e.modification.source === 'Bolt'
            && e.modification.target === 'hero');
    return state.phase === 'damage-roll'
        && state.winner === owner
        && !isCharged;
}

registerAbility({
    name: 'Bolt',
    type: 'combat',
    description: "Instead of rolling damage, you can 'charge up' your wand. When you win your next round, you inflict 3 damage dice to one opponent, ignoring armour.",
    canActivate: winnerIsNotCharged,
    onActivate: (state, owner) => {
        if (!winnerIsNotCharged(state, owner)) return null;

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
            damageRolls: [],
            modifications: [...state.modifications, chargeMod],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Bolt. Wand charging...", type: 'info' })
        };
    },
    onDamageRoll: (state, winner) => {
        const chargeMod = state.activeEffects.find(
            e => e.modification.source === 'Bolt'
                && e.modification.target === winner);
        if (chargeMod) {
            // Bolt Release!
            const dmgRolls = rollDice(3);
            const dmg = sumDice(dmgRolls);

            // Remove charge
            const newEffects = state.activeEffects.filter(e => e.id !== chargeMod.id);

            return {
                ...dealDamage(state, 'Bolt', 'enemy', dmg),
                activeEffects: newEffects,
                damageRolls: dmgRolls,
            };
        }
        return {};
    }
});
