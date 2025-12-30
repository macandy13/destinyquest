import { useState, useCallback } from 'react';
import { CombatState, Enemy, DiceRoll } from '../types/combat';
import { Combatant } from '../types/combatant';
import { Hero } from '../types/hero';
import { 
    INITIAL_STATE, 
    initCombat, 
    endCombat as engineEndCombat,
    activateAbility as engineActivateAbility,
    useBackpackItem as engineUseBackpackItem,
    generateSpeedRolls as engineGenerateSpeedRolls,
    resolveSpeedRolls as engineResolveSpeedRolls,
    commitSpeedResult as engineCommitSpeedResult,
    resolveDamageRolls as engineResolveDamageRolls,
    commitDamageResult as engineCommitDamageResult,
    nextRound as engineNextRound,
    handleReroll as engineHandleReroll
} from '../mechanics/CombatEngine';

export function useCombat(heroInput: Hero | Combatant<Hero>) {
    const hero: Hero = 'original' in heroInput ? heroInput.original : heroInput;
    const [combat, setCombat] = useState<CombatState>(INITIAL_STATE);

    const startCombat = useCallback((initialEnemy?: Enemy) => {
        setCombat(initCombat(hero, initialEnemy));
    }, [hero]);

    const endCombat = () => {
        setCombat(prev => engineEndCombat(prev));
    };

    const activateAbility = (abilityName: string) => {
        setCombat(prev => engineActivateAbility(prev, abilityName));
    };

    const useBackpackItem = (itemIndex: number) => {
        setCombat(prev => engineUseBackpackItem(prev, itemIndex));
    };

    const generateSpeedRolls = () => {
        setCombat(prev => engineGenerateSpeedRolls(prev));
    };

    // For testing or manual injection if needed, but mostly internal consumption
    const resolveSpeedRolls = ({ heroRolls, enemyRolls }: { heroRolls: DiceRoll[], enemyRolls: DiceRoll[] }) => {
        setCombat(prev => engineResolveSpeedRolls(prev, heroRolls, enemyRolls));
    };

    const commitSpeedResult = () => {
        setCombat(prev => engineCommitSpeedResult(prev));
    };

    const resolveDamageRolls = (rolls: DiceRoll[]) => {
        setCombat(prev => engineResolveDamageRolls(prev, rolls));
    };

    const commitDamageResult = () => {
        setCombat(prev => engineCommitDamageResult(prev));
    };

    const nextRound = () => {
        setCombat(prev => engineNextRound(prev));
    };

    const handleReroll = (dieIndex: number) => {
        setCombat(prev => engineHandleReroll(prev, dieIndex));
    };

    return {
        combat,
        startCombat,
        activateAbility,
        useBackpackItem,
        generateSpeedRolls,
        resolveSpeedRolls,
        commitSpeedResult,
        resolveDamageRolls,
        commitDamageResult,
        handleReroll,
        nextRound,
        endCombat,
    };
}
