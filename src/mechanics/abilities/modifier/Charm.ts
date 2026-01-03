import { addLogs } from '../../../types/CombatState';
import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Charm',
    type: 'modifier',
    description: 'Re-roll one of your hero\'s dice; you must accept the second result.',
    icon: '🎲',
    canActivate: (state) => state.phase === 'speed-roll' || (state.phase === 'damage-roll' && state.winner === 'hero'),
    onActivate: (state) => {
        let target: 'damage' | 'hero-speed';
        if (state.phase === 'damage-roll' && state.winner === 'hero') {
            target = 'damage';
        } else if (state.phase === 'speed-roll') {
            target = 'hero-speed';
        } else {
            return state;
        }

        // TODO: Turn into modifier function
        state = {
            ...state,
            rerollState: {
                source: 'Charm',
                target
            }
        };
        return addLogs(
            state,
            { message: `Select a ${target === 'damage' ? 'damage' : 'speed'} die to re-roll.` }
        );
    },
    onReroll: (state, dieIndex) => {
        const target = state.rerollState?.target;
        if (!target) return state;

        const newRoll = { value: Math.floor(Math.random() * 6) + 1, isRerolled: true };
        let newState = { ...state };

        if (target === 'hero-speed' && state.heroSpeedRolls) {
            const rolls = [...state.heroSpeedRolls];
            if (dieIndex >= 0 && dieIndex < rolls.length) {
                rolls[dieIndex] = newRoll;
                newState.heroSpeedRolls = rolls;
            }
        } else if (target === 'damage' && state.damage?.damageRolls) {
            const rolls = [...state.damage.damageRolls];
            if (dieIndex >= 0 && dieIndex < rolls.length) {
                rolls[dieIndex] = newRoll;
                newState.damage = { ...state.damage, damageRolls: rolls };
            }
        }

        newState.rerollState = undefined;

        return addLogs(newState, {
            message: `Charm used. Re-rolled a die to ${newRoll.value}.`
        });
    }
});
