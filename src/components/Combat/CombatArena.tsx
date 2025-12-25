import React, { useState } from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import CombatDice from './CombatDice';
import './CombatArena.css';

interface CombatArenaProps {
    hero: Hero;
}

const CombatArena: React.FC<CombatArenaProps> = ({ hero }) => {
    const { combat, startCombat, nextRound, resolveSpeedRound, resolveDamageAndArmour } = useCombat(hero.stats);
    const [diceTotal, setDiceTotal] = useState<number | undefined>(undefined);

    if (!combat.isActive || !combat.enemy) {
        return (
            <div className="dq-card combat">
                <h2 className="dq-card-title">Combat</h2>
                <p className="text-dim">Prepare for battle...</p>
                <button className="btn-primary" onClick={startCombat}>Find Enemy</button>
            </div>
        );
    }

    const handleRoll = (total: number, rolls: number[]) => {
        setDiceTotal(total);
        // Phase logic
        if (combat.phase === 'speed-roll') {
            const enemyRoll1 = Math.floor(Math.random() * 6) + 1;
            const enemyRoll2 = Math.floor(Math.random() * 6) + 1;
            const enemyTotal = enemyRoll1 + enemyRoll2;
            resolveSpeedRound(total, rolls, enemyTotal, [enemyRoll1, enemyRoll2]);
        } else if (combat.phase === 'damage-roll') {
            resolveDamageAndArmour(rolls[0]);
        }
    };

    const enemyHealthPct = (combat.enemy.health / combat.enemy.maxHealth) * 100;
    const heroHealthPct = (combat.heroHealth / hero.stats.maxHealth) * 100;

    const getPhaseInstruction = () => {
        switch (combat.phase) {
            case 'speed-roll': return "Roll Speed (2d6) to execute turn";
            case 'damage-roll': return combat.winner === 'hero' ? "You won! Roll Damage (1d6)" : "Enemy won! Their Damage Roll...";
            case 'round-end': return "Round Complete. Proceed?";
            case 'combat-end': return "Combat Finished";
            default: return "";
        }
    };

    return (
        <div className="combat-arena">
            <div className="text-dim round-indicator">Round {combat.round}</div>

            <div className="combatants">
                {/* Hero Card */}
                <div className="combatant-card">
                    <div className="combatant-name">{hero.name}</div>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${heroHealthPct}%` }}></div>
                    </div>
                    <div className="combatant-stats">
                        <div>{combat.heroHealth} / {hero.stats.maxHealth} HP</div>
                        <div>⚡ {hero.stats.speed} 💪 {hero.stats.brawn}</div>
                    </div>
                </div>

                {/* VS Separator */}
                <div className="vs-separator">VS</div>

                {/* Enemy Card */}
                <div className="combatant-card enemy">
                    <div className="combatant-name">{combat.enemy.name}</div>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${enemyHealthPct}%` }}></div>
                    </div>
                    <div className="combatant-stats">
                        <div>{combat.enemy.health} / {combat.enemy.maxHealth} HP</div>
                        <div>⚡ {combat.enemy.speed} 💪 {combat.enemy.brawn}</div>
                    </div>
                </div>
            </div>

            {/* Phase Instruction */}
            <div style={{ margin: '10px 0', textAlign: 'center', color: 'var(--dq-gold)' }}>
                {getPhaseInstruction()}
            </div>

            {/* SPEED PHASE: Dual Dice Display */}
            {/* Always show speed dice if we have rolls, to persist them into damage phase */}
            <div className="speed-rolls" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div className="hero-dice">
                    <CombatDice
                        label="Your Speed"
                        count={2}
                        values={combat.heroSpeedRolls} // Persist if exists
                        onRoll={combat.phase === 'speed-roll' ? handleRoll : undefined} // Only interactive in speed phase and if not already rolled (implied by lack of values check but onRoll handles it)
                        result={combat.heroSpeedRolls ? combat.heroSpeedRolls.reduce((a, b) => a + b, 0) + hero.stats.speed : undefined}
                    />
                    {/* Only show result modifier text if rolled */}
                    {combat.heroSpeedRolls && (
                        <div className="text-center text-dim" style={{ fontSize: '0.8rem' }}>
                            {combat.heroSpeedRolls.reduce((a, b) => a + b, 0)} + {hero.stats.speed} (Spd)
                        </div>
                    )}
                </div>

                <div className="enemy-dice">
                    <CombatDice
                        label="Enemy Speed"
                        count={2}
                        values={combat.enemySpeedRolls}
                        result={combat.enemySpeedRolls ? combat.enemySpeedRolls.reduce((a, b) => a + b, 0) + combat.enemy.speed : undefined}
                    />
                    {combat.enemySpeedRolls && (
                        <div className="text-center text-dim" style={{ fontSize: '0.8rem' }}>
                            {combat.enemySpeedRolls.reduce((a, b) => a + b, 0)} + {combat.enemy.speed} (Spd)
                        </div>
                    )}
                </div>
            </div>

            {/* DAMAGE PHASE: Single Die Display */}
            {combat.phase === 'damage-roll' && (
                <div className="damage-roll-container" style={{ borderTop: '1px solid #333', paddingTop: '20px', marginTop: '10px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--dq-gold)' }}>
                        {combat.winner === 'hero' ? '💥 ROLL FOR DAMAGE!' : '🛡️ BRACE FOR IMPACT!'}
                    </div>

                    {combat.winner === 'hero' && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <CombatDice
                                label="Damage (1d6)"
                                count={1}
                                onRoll={(total, rolls) => handleRoll(total, rolls)}
                            />
                        </div>
                    )}

                    {combat.winner === 'enemy' && (
                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <p className="text-dim">Enemy is attacking...</p>
                            <button className="btn-primary" onClick={() => {
                                const dmg = Math.floor(Math.random() * 6) + 1;
                                handleRoll(dmg, [dmg]);
                            }}>Resolve Enemy Attack</button>
                        </div>
                    )}
                </div>
            )}

            {combat.phase === 'round-end' && (
                <button className="btn-primary btn-next-round" onClick={nextRound}>Next Round</button>
            )}

            <div className="combat-log">
                {[...combat.logs].reverse().map((log, i) => (
                    <div key={i} className={`log-entry ${log.type}`}>
                        [{log.round}] {log.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CombatArena;
