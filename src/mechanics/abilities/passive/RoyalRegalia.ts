import { AbilityDefinition, getAbilityDefinition } from '../../abilityRegistry';
import { ActiveAbility, hasEquipment } from '../../../types/combatState';

export const royalRegalia: AbilityDefinition = {
    name: 'Royal regalia',
    type: 'passive', // It's listed as a set bonus effectively
    description: 'Equipping both majesty set items allows use of the cripple ability.',
    icon: '🤴',
    reviewed: false,
    onCombatStart: (state, context) => {
        if (context.owner !== 'hero') return state;

        const hasMajestySet = hasEquipment(state.hero, /Majestic greaves/) &&
            hasEquipment(state.hero, /Majestic shoulders/);
        if (hasMajestySet) {
            const crippleDef = getAbilityDefinition('Cripple');
            if (crippleDef && !state.hero.activeAbilities.has('cripple')) {
                const crippleAbility: ActiveAbility = {
                    name: 'Cripple',
                    owner: 'hero',
                    def: crippleDef,
                    uses: undefined,
                    // TODO: Add sources
                };
                state.hero.activeAbilities.set('cripple', crippleAbility);
            }
        }

        return state;
    }
};
