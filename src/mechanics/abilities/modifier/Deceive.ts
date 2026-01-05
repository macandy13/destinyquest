import { registerAbility } from '../../abilityRegistry';
import { canModifySpeedDice, modifySpeedRolls } from '../abilityFactories';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Deceive',
    type: 'modifier',
    description: "Swap one of your opponent's speed dice for your own.",
    canActivate: canModifySpeedDice,
    onSpeedRoll: (state, { owner }) => {
        // TODO: Allow selection
        const opponent = getOpponent(owner);
        const ownerRolls = state[owner === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];
        const opponentRolls = state[opponent === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];
        if (!ownerRolls || !opponentRolls || ownerRolls.length === 0 || opponentRolls.length === 0) return state;

        // Clone
        const newOwnerRolls = [...ownerRolls];
        const newOpponentRolls = [...opponentRolls];

        // Find indices to swap. 
        const minOwnerIndex = newOwnerRolls.reduce((minIndex, roll, index) => roll.value < newOwnerRolls[minIndex].value ? index : minIndex, 0);
        const maxOpponentIndex = newOpponentRolls.reduce((maxIndex, roll, index) => roll.value > newOpponentRolls[maxIndex].value ? index : maxIndex, 0);

        // Swap values
        const temp = newOwnerRolls[minOwnerIndex].value;
        newOwnerRolls[minOwnerIndex].value = newOpponentRolls[maxOpponentIndex].value;
        newOpponentRolls[maxOpponentIndex].value = temp;

        // Apply
        state = modifySpeedRolls(state, owner, () => newOwnerRolls);
        state = modifySpeedRolls(state, opponent, () => newOpponentRolls);
        return state;
    }
});
