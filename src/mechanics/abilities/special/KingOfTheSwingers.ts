import { AbilityDefinition, registerAbility } from '../../abilityRegistry';
import { dealDamage } from '../../../types/combatState';

export const KingOfTheSwingers: AbilityDefinition = {
    name: 'King of the swingers',
    type: 'special',
    description: "At the end of every combat round you automatically take 15 damage. Armour can be used to absorb this damage.",
    reviewed: false,
    onPassiveAbility: (state, { owner }) => {
        // This ability deals damage to the hero at end of round
        // owner is the enemy with this ability
        if (owner !== 'enemy') return state;

        // Calculate damage after armour
        const heroArmour = state.hero.stats.armour ?? 0;
        const damageAfterArmour = Math.max(0, 15 - heroArmour);
        if (damageAfterArmour > 0) {
            state = dealDamage(state, 'King of the swingers', 'hero', damageAfterArmour,
                `King of the swingers deals ${damageAfterArmour} damage (15 - ${heroArmour} armour)`);
        }
        return state;
    }
};

registerAbility(KingOfTheSwingers);
