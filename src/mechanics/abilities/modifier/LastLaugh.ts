import { registerAbility } from '../../abilityRegistry';
import { canModifyDamage, canModifySpeed } from '../abilityFactories';

registerAbility({
    name: 'Last Laugh',
    type: 'modifier',
    description: 'Reroll enemy die',
    canActivate: (state) => canModifySpeed(state) || canModifyDamage(state),
    onActivate: (state) => ({
        ...state,
        rerollState: {
            source: 'Last Laugh',
            target: canModifySpeed(state) ? 'enemy-speed' : 'damage'
        }
    }),
});
