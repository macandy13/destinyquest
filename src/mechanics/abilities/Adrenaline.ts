import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Adrenaline',
    type: 'speed',
    description: 'Increase your speed by 2 for two combat rounds.',
    onActivate: (state) => {
        const newModifiers = [...state.modifiers, {
            name: 'Adrenaline',
            source: 'Adrenaline', // Ideally source comes from item but we might lose that context here unless passed
            type: 'speed-bonus' as const,
            value: 2,
            duration: 2
        }];
        return {
            modifiers: newModifiers,
            logs: [...state.logs, { round: state.round, message: 'Used ability: Adrenaline', type: 'info' }]
        };
    }
});
