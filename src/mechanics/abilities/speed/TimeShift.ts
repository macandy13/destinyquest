import { registerAbility } from '../../abilityRegistry';
import { getCombatant, appendEffect } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Time Shift',
    type: 'speed',
    description: "Match opponent's speed for three rounds; no other speed abilities can be played during this time.",
    onActivate: (state, { owner }) => {
        const mySpeed = getCombatant(state, owner).stats.speed;
        const opponentSpeed = getCombatant(state, getOpponent(owner)).stats.speed;
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
