import React, { useState } from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import CombatDice from './CombatDice';
import './CombatArena.css';

interface CombatArenaProps {
    hero: Hero;
}

const CombatArena: React.FC<CombatArenaProps> = ({ hero }) => {
    const { combat, startCombat, nextRound, damageEnemy, damageHero, addLog } = useCombat(hero.stats);
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
        // Placeholder logic for now - typically you'd compare vs speed/brawn etc
        addLog(`Rolled ${total} (${rolls.join(' + ')})`, 'info');
    };

    const enemyHealthPct = (combat.enemy.health / combat.enemy.maxHealth) * 100;
    const heroHealthPct = (combat.heroHealth / hero.stats.maxHealth) * 100;

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

            <CombatDice onRoll={handleRoll} result={diceTotal} />

            <div className="combat-controls">
                <button className="btn-primary btn-hit-enemy" onClick={() => damageEnemy(1)}>Hit Enemy</button>
                <button className="btn-primary" onClick={() => damageHero(1)}>Hit Hero</button>
            </div>

            <button className="btn-primary btn-next-round" onClick={nextRound}>Next Round</button>

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
