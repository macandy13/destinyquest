import { useState, useCallback } from 'react';
import { CombatState, Enemy, CombatLog } from '../types/combat';
import { HeroStats } from '../types/hero';

const INITIAL_STATE: CombatState = {
    isActive: false,
    round: 0,
    enemy: null,
    heroHealth: 0,
    logs: []
};

// Default easy enemy for testing
const MOCK_ENEMY: Enemy = {
    name: 'Training Dummy',
    speed: 2,
    brawn: 2,
    magic: 0,
    armour: 0,
    health: 20,
    maxHealth: 20,
    abilities: []
};

export function useCombat(heroStats: HeroStats) {
    const [combat, setCombat] = useState<CombatState>(INITIAL_STATE);

    const startCombat = useCallback(() => {
        setCombat({
            isActive: true,
            round: 1,
            enemy: { ...MOCK_ENEMY }, // Clone to avoid mutation
            heroHealth: heroStats.health,
            logs: [{ round: 1, message: 'Combat started vs Training Dummy!', type: 'info' }]
        });
    }, [heroStats]);

    const endCombat = useCallback(() => {
        setCombat(INITIAL_STATE);
    }, []);

    const addLog = (message: string, type: CombatLog['type']) => {
        setCombat(prev => ({
            ...prev,
            logs: [...prev.logs, { round: prev.round, message, type }]
        }));
    };

    const nextRound = () => {
        setCombat(prev => ({
            ...prev,
            round: prev.round + 1,
            logs: [...prev.logs, { round: prev.round + 1, message: `Round ${prev.round + 1}`, type: 'info' }]
        }));
    };

    const damageEnemy = (amount: number) => {
        setCombat(prev => {
            if (!prev.enemy) return prev;
            const newHealth = Math.max(0, prev.enemy.health - amount);
            return {
                ...prev,
                enemy: { ...prev.enemy, health: newHealth },
                logs: [...prev.logs, { round: prev.round, message: `Enemy took ${amount} damage!`, type: 'damage-enemy' }]
            };
        });
    };

    const damageHero = (amount: number) => {
        setCombat(prev => {
            const newHealth = Math.max(0, prev.heroHealth - amount);
            return {
                ...prev,
                heroHealth: newHealth,
                logs: [...prev.logs, { round: prev.round, message: `Hero took ${amount} damage!`, type: 'damage-hero' }]
            };
        });
    };

    return {
        combat,
        startCombat,
        endCombat,
        nextRound,
        damageEnemy,
        damageHero,
        addLog
    };
}
