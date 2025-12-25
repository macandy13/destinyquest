import React from 'react';
import './CombatantCard.css';

interface CombatantCardProps {
    name: string;
    currentHealth: number;
    maxHealth: number;
    speed: number;
    brawn: number;
    isEnemy?: boolean;
}

const CombatantCard: React.FC<CombatantCardProps> = ({
    name,
    currentHealth,
    maxHealth,
    speed,
    brawn,
    isEnemy = false
}) => {
    const healthPct = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100));

    return (
        <div className={`combatant-card ${isEnemy ? 'enemy' : ''}`}>
            <div className="combatant-name">{name}</div>
            <div className="health-bar-container">
                <div className="health-bar" style={{ width: `${healthPct}%` }}></div>
            </div>
            <div className="combatant-stats">
                <div>{currentHealth} / {maxHealth} HP</div>
                <div>⚡ {speed} 💪 {brawn}</div>
            </div>
        </div>
    );
};

export default CombatantCard;
