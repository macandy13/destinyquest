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
} from '../mechanics/CombatEngine';
import { CombatState } from '../types/combatState';


export function useCombat(hero: Hero, enemy: Enemy) {
    const combatState = startCombat(hero, enemy);
    const [combat, setCombat] = useState<CombatState>(
        combatState,
    );

    const activateAbility = (abilityName: string) => {
        setCombat(prev => {
            return engineActivateAbility(prev, abilityName);
        });
    };

    const useBackpackItem = (itemIndex: number) => {
        setCombat(prev => {
            return engineUseBackpackItem(prev, itemIndex);
        });
    };

    const rollSpeedDice = () => {
        setCombat(prev => {
            return rollForSpeed(prev);
        });
    };

    const commitSpeedAndRollDamageDice = () => {
        setCombat(prev => rollForDamage(prev));
    };

    const confirmDamageRoll = () => {
        setCombat(prev => applyDamage(prev));
    }

    const confirmBonusDamage = () => {
        setCombat(prev => applyPassiveAbilities(prev));
    };

    const nextRound = () => {
        setCombat(prev => startRound(endRound(prev)));
    };

    const endCombat = () => {
        setCombat(prev => engineEndCombat(prev));
    };

    const restartCombat = () => {
        const combatState = startCombat(hero, enemy);
        setCombat(combatState);
    };

    const resolveInteraction = (data: any) => {
        setCombat(prev => engineResolveInteraction(prev, data));
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
    };
}
