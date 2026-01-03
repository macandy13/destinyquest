import React from 'react';
import { getStatIcon } from '../../types/Stats';
import './CombatantCard.css';

interface CombatantCardProps {
    name: string;
    currentHealth: number;
    maxHealth: number;
    speed: number;
    brawn: number;
    magic?: number;
    armour?: number;
    isEnemy?: boolean;
}

const CombatantCard: React.FC<CombatantCardProps> = ({
    name,
    currentHealth,
    maxHealth,
    speed,
    brawn,
    magic = undefined,
    armour = undefined,
    isEnemy = false
}) => {
    const healthPct = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100));

    return (
        <div className={`combatant-card ${isEnemy ? 'enemy' : ''}`}>
            <div className="combatant-name">{name}</div>
            <div className="health-bar-container">
                <div className="health-bar" style={{ width: `${healthPct}%` }}></div>
            </div>
            <div>{currentHealth} / {maxHealth} HP</div>
            <div className="combatant-stats">
                <div>{getStatIcon('speed')} {speed}</div>
                {brawn >= (magic ?? -1) ? <div>{getStatIcon('brawn')} {brawn}</div> : null}
                {magic && magic > 0 && magic > brawn ? <div>{getStatIcon('magic')} {magic}</div> : null}
                {armour && armour > 0 ? <div>{getStatIcon('armour')} {armour}</div> : null}
            </div>
        </div>
    );
};

export default CombatantCard;
