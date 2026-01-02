import { registerAbility } from '../abilityRegistry';
import { addLog } from '../../utils/statUtils';
import { CombatState } from '../../types/combat';
import { CharacterType } from '../../types/stats';

function canActivate(state: CombatState, _owner: CharacterType): boolean {
    return state.phase !== 'round-end';
}

registerAbility({
    name: 'Fatal Blow',
    type: 'combat',
    description: "Ignore half of your opponent's armour (rounding up).",
    canActivate: canActivate,
    onActivate: (state: CombatState, owner: CharacterType) => {
        if (!canActivate(state, owner)) return null;
        return {
            modifications: [
                ...state.modifications,
                {
                    modification: { stats: { armour: -Math.ceil((state.enemy?.stats.armour || 0) / 2) }, source: 'Fatal Blow', target: 'enemy' },
                    id: `fatal-blow-${state.round}`,
                    duration: 1
                }
            ],
            logs: addLog(state.logs, { round: state.round, message: "Used ability: Fatal Blow.", type: 'info' })
        };
    },
});
