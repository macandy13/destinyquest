import { useState, useCallback } from 'react';
import { CombatState, Enemy } from '../types/combat';
import { Combatant } from '../types/combatant';
import { Hero } from '../types/hero';
import {
    INITIAL_STATE,
    initCombat,
    activateAbility as engineActivateAbility,
    useBackpackItem as engineUseBackpackItem,
    startNewRound,
    applyEndOfRoundDamage,
    applyDamageResult,
    applySpeedResult,
    commitDamageResult,
    commitSpeedResult,
    generateDamageRolls,
    generateSpeedRolls,
    endCombat as engineEndCombat,
    handleReroll as engineHandleReroll,
} from '../mechanics/CombatEngine';

export interface CombatArenaState {
    displayed: CombatState;
    accepted: CombatState;
    finished: boolean;
};

export function useCombat(heroInput: Hero | Combatant<Hero>) {
    const hero: Hero = 'original' in heroInput ? heroInput.original : heroInput;
    const [combat, setCombat] = useState<CombatArenaState>({
        displayed: INITIAL_STATE,
        accepted: INITIAL_STATE,
        finished: false
    });

    const startCombat = useCallback((initialEnemy?: Enemy | Combatant<Enemy>) => {
        setCombat(() => {
            const newState = initCombat(hero, initialEnemy);
            return {
                displayed: newState,
                accepted: newState,
                finished: false
            };
        });
    }, [hero]);

    const activateAbility = (abilityName: string) => {
        setCombat(prev => {
            const newState = engineActivateAbility(prev.displayed, abilityName);
            return {
                ...prev,
                displayed: newState,
                accepted: newState
            };
        });
    };

    const useBackpackItem = (itemIndex: number) => {
        setCombat(prev => {
            const newState = engineUseBackpackItem(prev.displayed, itemIndex);
            return {
                ...prev,
                displayed: newState,
                accepted: newState
            };
        });
    };

    const rollSpeedDice = () => {
        setCombat(prev => {
            const newState = generateSpeedRolls(prev.accepted);
            return {
                ...prev,
                displayed: applySpeedResult(newState),
                accepted: newState
            };
        });
    };

    const commitSpeedAndRollDamageDice = () => {
        setCombat(prev => {
            const newState = generateDamageRolls(commitSpeedResult(prev.displayed));
            return {
                ...prev,
                displayed: applyDamageResult(newState),
                accepted: newState
            };
        });
    }

    const confirmDamage = () => {
        setCombat(prev => {
            const newState = commitDamageResult(prev.displayed);
            return {
                ...prev,
                displayed: applyEndOfRoundDamage(newState),
                accepted: newState
            };
        });
    }

    const handleReroll = (dieIndex: number) => {
        setCombat(prev => {
            const newState = engineHandleReroll(prev.displayed, dieIndex);
            return {
                ...prev,
                displayed: newState,
                accepted: newState
            };
        });
    };

    const endRoundWithoutDamage = () => {
        setCombat(prev => {
            const newState = commitSpeedResult(prev.displayed);
            return {
                ...prev,
                displayed: applyEndOfRoundDamage(newState),
                accepted: newState
            };
        });
    };

    const nextRound = () => {
        setCombat(prev => {
            const newState = startNewRound(prev.displayed);
            return {
                ...prev,
                displayed: newState,
                accepted: newState
            };
        });
    };

    const endCombat = () => {
        setCombat(prev => {
            const newState = engineEndCombat(prev.displayed);
            return {
                displayed: newState,
                accepted: newState,
                finished: true
            };
        });
    };

    return {
        combat,
        startCombat,
        activateAbility,
        useBackpackItem,
        rollSpeedDice,
        commitSpeedAndRollDamageDice,
        endRoundWithoutDamage,
        confirmDamage,
        handleReroll,
        nextRound,
        endCombat,
    };
}
