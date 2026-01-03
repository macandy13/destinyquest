import { registerAbility } from '../../abilityRegistry';
import { CombatState, dealDamage } from '../../../types/combat';
import { CharacterType } from '../../../types/stats';

function canActivate(state: CombatState, owner: CharacterType): boolean {
    if (owner !== 'hero') return false;
    const ownSpeed = state.hero!.stats.speed || 0;
    const opponentHealth = state.enemy!.stats.health || 0;
    return state.phase === 'speed-roll'
        && /sword/i.test(state.hero!.original.equipment['mainHand']?.name ?? '')
        && opponentHealth > 0
        && opponentHealth <= ownSpeed;
}

registerAbility({
    name: 'Execution',
    type: 'speed',
    description: '(Requires sword in main hand). If an opponent’s health is equal to or less than your speed, you may reduce their health to zero at the start of a round (once per round).',
    canActivate: canActivate,
    onActivate: (state, owner) => {
        if (!canActivate(state, owner)) return {};

        // TODO: Handle multiple enemies
        const opponentHealth = state.enemy!.stats.health || 0;
        return {
            phase: 'combat-end',
            ...dealDamage(state, 'Execution', 'enemy', opponentHealth)
        };
    },
});
