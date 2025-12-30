import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';

function canActivate(state: CombatState): boolean {
    return state.damageDealt.some(d => d.target === 'enemy' && d.amount > 0);
}

registerAbility({
    name: 'Rust',
    type: 'combat',
    description: "If you cause health damage, lower opponent's armour by 2 for the remainder of combat.",
    canActivate: canActivate,
    onActivate: (state) => {
        if (!canActivate(state)) return null;
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: { armour: -2 }, source: 'Rust', target: 'enemy' },
                    id: `rust-${state.round}`,
                    duration: undefined
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Rust. Opponent's armour corroded!", type: 'info' })
        };
    }
});
