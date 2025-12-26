import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Quicksilver',
    type: 'speed',
    description: 'Increase speed by 2 for one round.',
    onActivate: (state) => {
        const newModifiers = [...state.modifiers, {
            name: 'Quicksilver',
            source: 'Quicksilver',
            type: 'speed-bonus' as const,
            value: 2,
            duration: 1
        }];
        return {
            modifiers: newModifiers,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Quicksilver', type: 'info' }]
        };
    }
});
