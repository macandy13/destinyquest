import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';

registerAbility({
    name: 'First Strike',
    type: 'passive',
    description: 'Pre-combat damage. Inflict 1 damage die (ignoring armour) and any harmful passive abilities (venom/bleed) before combat begins.',
    onCombatStart: (state) => {
        // TODO: Show dice and allow to reroll with charm?
        let damage = Math.floor(Math.random() * 6) + 1;
        return {
            enemy: { ...state.enemy!, health: Math.max(0, state.enemy!.health - damage) },
            damageDealt: [...state.damageDealt, { target: 'enemy', amount: damage, source: 'First Strike' }],
            logs: addLog(state.logs, { round: state.round, message: `First Strike deals ${damage} damage`, type: 'info' })
        };
    }
});
