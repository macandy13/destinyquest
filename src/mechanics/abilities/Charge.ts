import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Charge',
    type: 'speed',
    description: 'Increase speed by 2 in the first round of combat.',
    onActivate: (state) => {
        const newModifiers = [...state.modifiers, {
            name: 'Charge',
            source: 'Charge',
            type: 'speed-bonus' as const,
            value: 2,
            duration: 1
        }];
        return {
            modifiers: newModifiers,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Charge', type: 'info' }]
        };
    }
});
