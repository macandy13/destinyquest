import { registerAbility } from '../../abilityRegistry';
import { modifySpeedRolls } from '../abilityFactories';
import { getOpponent } from '../../../types/character';

registerAbility({
    name: 'Trickster',
    type: 'modifier',
    description: "Swap one of your opponent's speed dice for your own.",
    // Same as Deceive.
    onSpeedRoll: (state, { owner }) => {
        const opponent = getOpponent(owner);
        const ownerRolls = state[owner === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];
        const opponentRolls = state[opponent === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];

        if (!ownerRolls || !opponentRolls || ownerRolls.length === 0 || opponentRolls.length === 0) return state;

        const newOwnerRolls = [...ownerRolls];
        const newOpponentRolls = [...opponentRolls];

        // Swap: Give lowest, take highest.
        let minOwnerIndex = 0;
        for (let i = 1; i < newOwnerRolls.length; i++) {
            if (newOwnerRolls[i].value < newOwnerRolls[minOwnerIndex].value) minOwnerIndex = i;
        }

        let maxOpponentIndex = 0;
        for (let i = 1; i < newOpponentRolls.length; i++) {
            if (newOpponentRolls[i].value > newOpponentRolls[maxOpponentIndex].value) maxOpponentIndex = i;
        }

        const temp = newOwnerRolls[minOwnerIndex].value;
        newOwnerRolls[minOwnerIndex] = { ...newOwnerRolls[minOwnerIndex], value: newOpponentRolls[maxOpponentIndex].value, isRerolled: true };
        newOpponentRolls[maxOpponentIndex] = { ...newOpponentRolls[maxOpponentIndex], value: temp, isRerolled: true };

        let newState = modifySpeedRolls(state, owner, () => newOwnerRolls);
        newState = modifySpeedRolls(newState, opponent, () => newOpponentRolls);

        return newState;
    }
});
