import { registerAbility } from '../../abilityRegistry';
import { addLogs, appendEffect, getCombatant } from '../../../types/combatState';

registerAbility({
    name: 'Shadow Fury',
    type: 'combat',
    description: 'Add speed of both main and left-hand weapons to your damage score.',
    onActivate: (state, { owner }) => {
        // Assumes owner is hero or has equipment.
        // state[owner].original might be needed if stats are computed.
        // But active stats might suffice? No, "speed of weapons". This is base stats of items.
        // state[owner].original.equipment...
        // Need to be careful about types. owner can be 'hero' or 'enemy'. Enemy might not have equipment structure.
        // Ability likely restricted to Hero or characters with equipment.

        const character = getCombatant(state, owner);
        if (!character.original || !('equipment' in character.original)) {
            return addLogs(state, { round: state.round, message: "Shadow Fury failed: No equipment found.", type: 'info' });
        }

        // Cast original to Hero-like structure or check properties
        const equipment = (character.original as any).equipment; // Temporary cast if type issues
        const mh = equipment?.mainHand;
        const oh = equipment?.leftHand;

        const mhSpeed = mh?.stats?.speed || 0;
        const ohSpeed = oh?.stats?.speed || 0;

        const bonus = mhSpeed + ohSpeed;

        const newState = appendEffect(state, owner, {
            stats: { damageModifier: bonus },
            source: 'Shadow Fury',
            target: owner,
            duration: 1
        });

        return addLogs(newState, { round: state.round, message: `Used ability: Shadow Fury (+${bonus} Damage).`, type: 'info' });
    }
});
