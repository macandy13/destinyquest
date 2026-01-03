import { registerAbility } from '../../abilityRegistry';

registerAbility({
    name: 'Piercing',
    type: 'combat',
    description: 'Ignore armour',
    onActivate: (state) => ({
        modifications: [
            ...state.modifications,
            {
                modification: {
                    source: 'Piercing',
                    target: 'enemy',
                    stats: {
                        armour: -(state.enemy?.stats.armour || 0)
                    }
                },
                duration: 1,
                id: `piercing-${state.round}`
            }
        ]
    })
});
