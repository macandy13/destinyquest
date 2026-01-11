import { registerAbility } from '../../abilityRegistry';
import { CombatState, dealDamage, hasEquipment } from '../../../types/combatState';
import { CharacterType } from '../../../types/character';

function canActivate(state: CombatState, { owner }: { owner: CharacterType }): boolean {
    if (owner !== 'hero') return false;
    const ownSpeed = state.hero!.stats.speed || 0;
    const opponentHealth = state.enemy!.stats.health || 0;
    return ['round-start', 'start-combat'].includes(state.phase)
        && hasEquipment(state.hero!, /sword/, ['mainHand', 'leftHand'])
        && opponentHealth > 0
        && opponentHealth <= ownSpeed;
}

registerAbility({
    name: 'Execution',
    type: 'speed',
    description: '(Requires sword in main hand). If an opponent’s health is equal to or less than your speed, you may reduce their health to zero at the start of a round (once per round).',
    canActivate: canActivate,
    onActivate: (state, { owner }) => {
        if (!canActivate(state, { owner })) return state;

        // TODO: Handle multiple enemies
        const opponentHealth = state.enemy!.stats.health || 0;
        return dealDamage(state, 'Execution', 'enemy', opponentHealth);
    },
});

