import { registerAbility } from '../../abilityRegistry';
import { appendEffect } from '../../../types/CombatState';
import { getOpponent } from '../../../types/Character';

registerAbility({
    name: 'Time Shift',
    type: 'speed',
    description: "Match opponent's speed for three rounds; no other speed abilities can be played during this time.",
    onActivate: (state, { owner }) => {
        const mySpeed = state[owner].stats.speed;
        const opponentSpeed = state[getOpponent(owner)].stats.speed;
        const diff = opponentSpeed - mySpeed;

        // TODO: disable when opnnent speed is lower
        // TODO: Prevent other speed abilities to be played.
        return appendEffect(state, owner, {
            stats: { speed: diff },
            source: 'Time Shift',
            target: owner,
            duration: 3
        });
    }
});
