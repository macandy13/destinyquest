import { registerAbility } from '../../abilityRegistry';
import { getCombatant, addLogs, dealDamage } from '../../../types/combatState';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Stake',
    type: 'passive',
    description: 'Instantly win if a vampire opponent\'s health is 10 or less.',
    onDamageDealt: (state, { owner }) => {
        const opponent = getOpponent(owner);
        const oppChar = getCombatant(state, opponent);

        // Check if vampire? "vampire opponent".
        // How to check creature type? Currently `Enemy` has `abilities`.
        // If it has 'Vampirism' ability? Or name contains Vampire?
        // Or `type`? The Enemy interface has `type: 'enemy'`.
        // I'll check for 'Vampire' in name or 'Vampirism' ability.
        const isVampire = oppChar.name.toLowerCase().includes('vampire') ||
            oppChar.activeAbilities.has('Vampirism');
        if (isVampire && oppChar.stats.health <= 10) {
            state = dealDamage(state, 'Stake', opponent, 10);
        }
        return state;
    }
});
