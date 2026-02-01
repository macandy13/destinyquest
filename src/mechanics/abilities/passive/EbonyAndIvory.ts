import { hasEquipment } from '../../../types/combatState';
import { AbilityDefinition, getAbilityDefinition, registerAbility } from '../../abilityRegistry';
import { ActiveAbility } from '../../../types/combatState';

export const ebonyAndIvory: AbilityDefinition = {
    name: 'Ebony and ivory',
    type: 'passive',
    description: 'Equipping both swords allows use of the cripple ability.',
    icon: '⚔️',
    reviewed: true,
    onCombatStart: (state, context) => {
        if (context.owner !== 'hero') return state;

        const hasEbony = hasEquipment(state.hero, /^Ebony$/);
        const hasIvory = hasEquipment(state.hero, /^Ivory$/);
        if (hasEbony && hasIvory) {
            // Add Cripple ability to active abilities
            const crippleDef = getAbilityDefinition('Cripple');
            if (crippleDef) {
                const crippleAbility: ActiveAbility = {
                    name: 'Cripple',
                    owner: 'hero',
                    def: crippleDef,
                    // TODO: Use sources (Ebony and Ivory)
                };
                // We need to register it so it can be used/triggered
                state.hero.activeAbilities.set('cripple', crippleAbility);
            }
        }
        return state;
    }
};

registerAbility(ebonyAndIvory);

