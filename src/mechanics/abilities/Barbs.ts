import { registerAbility } from '../abilityRegistry';

registerAbility({
    name: 'Barbs',
    type: 'passive',
    description: 'At the end of every combat round, automatically inflict 1 damage to all opponents.',
    onRoundEnd: (state) => {
        if (!state.enemy) return {};
        const newEnemyHealth = Math.max(0, state.enemy.health - 1);
        if (newEnemyHealth < state.enemy.health) {
            return {
                enemy: { ...state.enemy, health: newEnemyHealth },
                logs: [...state.logs, {
                    round: state.round,
                    message: 'Barbs inflicts 1 damage.',
                    type: 'damage-enemy'
                }]
            };
        }
        return {};
    }
});
