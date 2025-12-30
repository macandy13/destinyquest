import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Last Laugh',
    type: 'modifier',
    description: 'Reroll enemy die',
    onActivate: () => ({ rerollState: { source: 'Last Laugh', target: 'damage' } }),
});
