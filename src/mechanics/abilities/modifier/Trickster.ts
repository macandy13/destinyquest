// This module logic is already unit tested! Adapt any test cases in your test files to fit changes in type usage or APIs here.

import { registerAbility } from '../../abilityRegistry';
import { canModifySpeedDice, modifySpeedRolls } from '../abilityFactories';
import { getOpponent, CharacterType } from '../../../types/character';

/**
 * Find the lowest owner's index and highest opponent's index for swapping.
 */
function findSwapIndexes(
    ownerRolls: { value: number }[],
    opponentRolls: { value: number }[]
): { minOwnerIndex: number; maxOpponentIndex: number } | null {
    if (!ownerRolls.length || !opponentRolls.length) return null;

    let minOwnerIndex = 0;
    for (let i = 1; i < ownerRolls.length; i++) {
        if (ownerRolls[i].value < ownerRolls[minOwnerIndex].value) minOwnerIndex = i;
    }

    let maxOpponentIndex = 0;
    for (let i = 1; i < opponentRolls.length; i++) {
        if (opponentRolls[i].value > opponentRolls[maxOpponentIndex].value) maxOpponentIndex = i;
    }

    if (ownerRolls[minOwnerIndex].value >= opponentRolls[maxOpponentIndex].value) return null;
    return { minOwnerIndex, maxOpponentIndex };
}

/**
 * Determine the opponent and each side's speed rolls (typed).
 */
function getOwnerAndOpponentRolls(
    state: any,
    owner: CharacterType // fixed type
) {
    const opponent = getOpponent(owner);
    const ownerRolls = state[owner === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];
    const opponentRolls = state[opponent === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls'];
    return { ownerRolls, opponentRolls, opponent };
}

/**
 * Swap dice using resolved indexes and update state.
 */
function swapRollsAndUpdateState(
    state: any,
    owner: CharacterType,
    ownerRolls: any,
    opponent: CharacterType,
    opponentRolls: any,
    minOwnerIndex: number,
    maxOpponentIndex: number
) {
    const newOwnerRolls = [...ownerRolls];
    const newOpponentRolls = [...opponentRolls];

    const temp = newOwnerRolls[minOwnerIndex].value;
    newOwnerRolls[minOwnerIndex] = { ...newOwnerRolls[minOwnerIndex], value: newOpponentRolls[maxOpponentIndex].value, isRerolled: true };
    newOpponentRolls[maxOpponentIndex] = { ...newOpponentRolls[maxOpponentIndex], value: temp, isRerolled: true };

    let newState = modifySpeedRolls(state, owner, () => newOwnerRolls);
    newState = modifySpeedRolls(newState, opponent, () => newOpponentRolls);
    return newState;
}

/**
 * Register Trickster: swaps lowest owner speed die with highest opponent (if beneficial).
 */
registerAbility({
    name: 'Trickster',
    type: 'modifier',
    description: "Swap one of your opponent's speed dice for your own.",
    canActivate: (state, { owner }: { owner: CharacterType }) => {
        if (state.phase !== 'speed-roll') return false;
        const { ownerRolls, opponentRolls } = getOwnerAndOpponentRolls(state, owner);
        if (!ownerRolls || !opponentRolls) return false;
        return !!findSwapIndexes(ownerRolls, opponentRolls);
    },
    onActivate: (state, { owner }: { owner: CharacterType }) => {
        const { ownerRolls, opponentRolls, opponent } = getOwnerAndOpponentRolls(state, owner);
        if (!ownerRolls || !opponentRolls) return state;

        const indexes = findSwapIndexes(ownerRolls, opponentRolls);
        if (!indexes) return state;

        const { minOwnerIndex, maxOpponentIndex } = indexes;

        return swapRollsAndUpdateState(state, owner, ownerRolls, opponent, opponentRolls, minOwnerIndex, maxOpponentIndex);
    }
});
