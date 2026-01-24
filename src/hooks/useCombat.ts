import { useState } from 'react';
import { Enemy } from '../types/character';
import { Hero } from '../types/hero';
import {
    startCombat,
    startRound,
    rollForSpeed,
    rollForDamage,
    applyDamage,
    activateAbility as engineActivateAbility,
    useBackpackItem as engineUseBackpackItem,
    endRound,
    endCombat as engineEndCombat,
    applyPassiveAbilities,
    resolveInteraction as engineResolveInteraction,
    checkForCombatEnd,
} from '../mechanics/CombatEngine';
import { CombatState } from '../types/combatState';

export function useCombat(hero: Hero, enemies: Enemy | Enemy[]) {
    const enemyArray = Array.isArray(enemies) ? enemies : [enemies];
    const initialCombatState = startCombat(hero, enemyArray);

    // State now holds both current combat state and history
    const [state, setState] = useState<{
        current: CombatState;
        history: CombatState[];
    }>({
        current: initialCombatState,
        history: [],
    });

    const combat = state.current;

    // Helper to update state and push to history
    const updateCombat = (updater: (prev: CombatState) => CombatState) => {
        setState(prevState => {
            const nextCombatState = updater(prevState.current);
            if (nextCombatState === prevState.current) {
                return prevState;
            }
            // If the *previous* state had a pending interaction, it means we are in the middle of resolving it.
            // We should NOT push that intermediate state to history.
            // Instead, we keep the history as is (which points to before the interaction started).
            const isIntermediateState = !!prevState.current.pendingInteraction;
            if (isIntermediateState) {
                return {
                    current: nextCombatState,
                    history: prevState.history,
                };
            }

            return {
                current: nextCombatState,
                history: [...prevState.history, prevState.current],
            };
        });
    };

    const undo = () => {
        setState(prevState => {
            if (prevState.history.length === 0) return prevState;
            const previous = prevState.history[prevState.history.length - 1];
            const newHistory = prevState.history.slice(0, -1);
            return {
                current: previous,
                history: newHistory,
            };
        });
    };

    const canUndo = state.history.length > 0;

    const activateAbility = (abilityName: string) => {
        updateCombat(prev => engineActivateAbility(prev, abilityName));
    };

    const useBackpackItem = (itemIndex: number) => {
        updateCombat(prev => engineUseBackpackItem(prev, itemIndex));
    };

    const rollSpeedDice = () => {
        updateCombat(prev => rollForSpeed(prev));
    };

    const commitSpeedAndRollDamageDice = () => {
        updateCombat(prev => rollForDamage(prev));
    };

    const confirmDamageRoll = () => {
        updateCombat(prev => applyDamage(prev));
    }

    const confirmBonusDamage = () => {
        updateCombat(prev => applyPassiveAbilities(prev));
    };

    const nextRound = () => {
        updateCombat(prev => startRound(endRound(prev)));
    };

    const endCombat = () => {
        updateCombat(prev => engineEndCombat(prev));
    };

    const restartCombat = () => {
        const enemyArray = Array.isArray(enemies) ? enemies : [enemies];
        const newCombatState = startCombat(hero, enemyArray);
        setState({
            current: newCombatState,
            history: [],
        });
    };

    const setActiveEnemy = (index: number) => {
        // Changing view doesn't necessarily need to be undone, but consistent with other state changes
        // it might be better to track it if it affects gameplay (it does for target selection).
        updateCombat(prev => {
            if (index < 0 || index >= prev.enemies.length) return prev;
            return { ...prev, activeEnemyIndex: index };
        });
    };

    const resolveInteraction = (data: any) => {
        updateCombat(prev => engineResolveInteraction(prev, data));
    };

    const updateCombatState = (newState: CombatState) => {
        // After manual state edits, check if combat should end (e.g., health <= 0)
        updateCombat(_ => checkForCombatEnd(newState));
    };

    return {
        combat,
        activateAbility,
        useBackpackItem,
        rollSpeedDice,
        commitSpeedAndRollDamageDice,
        confirmDamageRoll,
        confirmBonusDamage,
        nextRound,
        endCombat,
        restartCombat,
        resolveInteraction,
        updateCombatState,
        setActiveEnemy,
        undo,
        canUndo,
    };
}
