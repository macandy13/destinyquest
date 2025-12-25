import { useState, useCallback } from 'react';
import { CombatState, Enemy, CombatLog } from '../types/combat';
import { HeroStats } from '../types/hero';

const INITIAL_STATE: CombatState = {
    isActive: false,
    round: 0,
    phase: 'combat-end', // Start inactive
    enemy: null,
    heroHealth: 0,
    winner: null,
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
            phase: 'speed-roll',
            enemy: { ...MOCK_ENEMY },
            heroHealth: heroStats.health,
            winner: null,
            logs: [{ round: 1, message: 'Combat started!', type: 'info' }]
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

    // Phase 1: Speed Roll
    // Phase 1: Speed Roll
    interface SpeedRoundParams {
        heroRolls: number[];
        enemyRolls: number[];
    }

    const resolveSpeedRound = ({ heroRolls, enemyRolls }: SpeedRoundParams) => {
        if (!combat.enemy) return;

        const heroRoll = heroRolls.reduce((a, b) => a + b, 0);
        const enemyRoll = enemyRolls.reduce((a, b) => a + b, 0);

        const heroTotal = heroRoll + heroStats.speed;
        const enemyTotal = enemyRoll + combat.enemy.speed;
        let winner: 'hero' | 'enemy' | null = null;
        let message = `Speed: Hero ${heroTotal} vs Enemy ${enemyTotal}. `;

        if (heroTotal > enemyTotal) {
            winner = 'hero';
            message += 'Hero wins execution round!';
        } else if (enemyTotal > heroTotal) {
            winner = 'enemy';
            message += 'Enemy wins execution round!';
        } else {
            message += 'Draw! No damage this round.';
        }

        setCombat(prev => ({
            ...prev,
            phase: winner ? 'damage-roll' : 'round-end',
            winner,
            heroSpeedRolls: heroRolls,
            enemySpeedRolls: enemyRolls,
            logs: [...prev.logs, { round: prev.round, message, type: 'info' }]
        }));
    };

    // Phase 2: Damage Roll
    interface DamageRoundParams {
        damageRoll: number;
        rolls: number[];
    }

    const resolveDamageAndArmour = ({ damageRoll, rolls }: DamageRoundParams) => {
        if (!combat.enemy || !combat.winner) return;

        setCombat(prev => {
            if (!prev.enemy || !prev.winner) return prev;

            let logMsg = '';
            let newHeroHealth = prev.heroHealth;
            let newEnemyHealth = prev.enemy.health;
            let type: CombatLog['type'] = 'info';

            if (prev.winner === 'hero') {
                const modifier = Math.max(heroStats.brawn, heroStats.magic);
                const rawDamage = damageRoll + modifier;
                const actualDamage = Math.max(0, rawDamage - prev.enemy.armour);
                newEnemyHealth = Math.max(0, prev.enemy.health - actualDamage);

                logMsg = `Hero hits for ${rawDamage} (Rolled ${damageRoll} + ${modifier}). Enemy armour absorbs ${prev.enemy.armour}. 💥 ${actualDamage} Damage!`;
                type = 'damage-enemy';
            } else {
                const modifier = Math.max(prev.enemy.brawn, prev.enemy.magic);
                const rawDamage = damageRoll + modifier;
                const actualDamage = Math.max(0, rawDamage - heroStats.armour);
                newHeroHealth = Math.max(0, prev.heroHealth - actualDamage);

                logMsg = `Enemy hits for ${rawDamage} (Rolled ${damageRoll} + ${modifier}). Hero armour absorbs ${heroStats.armour}. 💔 ${actualDamage} Damage taken!`;
                type = 'damage-hero';
            }

            // Check for defeat
            const isFinished = newHeroHealth <= 0 || newEnemyHealth <= 0;
            const nextPhase = isFinished ? 'combat-end' : 'round-end';

            const logs = [...prev.logs, { round: prev.round, message: logMsg, type }];

            if (newHeroHealth <= 0) logs.push({ round: prev.round, message: 'Hero Defeated!', type: 'loss' });
            if (newEnemyHealth <= 0) logs.push({ round: prev.round, message: 'Enemy Defeated!', type: 'win' });

            return {
                ...prev,
                heroHealth: newHeroHealth,
                enemy: { ...prev.enemy, health: newEnemyHealth },
                phase: nextPhase,
                damageRolls: rolls,
                logs
            };
        });
    };

    const nextRound = () => {
        setCombat(prev => ({
            ...prev,
            round: prev.round + 1,
            winner: null,
            heroSpeedRolls: undefined,
            enemySpeedRolls: undefined,
            damageRolls: undefined,
            phase: 'speed-roll',
            logs: [...prev.logs, { round: prev.round + 1, message: `Round ${prev.round + 1}`, type: 'info' }]
        }));
    };

    return {
        combat,
        startCombat,
        endCombat,
        nextRound,
        resolveSpeedRound,
        resolveDamageAndArmour,
        addLog
    };
}
