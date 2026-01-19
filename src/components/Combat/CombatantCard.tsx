import React from 'react';
import { getStatIcon } from '../../types/stats';
import { Effect } from '../../types/effect';
import ActiveEffectIcon from './ActiveEffectIcon';
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
    activeEffects?: Effect[];
}

const CombatantCard: React.FC<CombatantCardProps> = ({
    name,
    currentHealth,
    maxHealth,
    speed,
    brawn,
    magic = undefined,
    armour = undefined,
    isEnemy = false,
    activeEffects = []
}) => {
    const healthPct = Math.max(0, Math.min(100, (currentHealth / maxHealth) * 100));

    return (
        <div className={`combatant-card ${isEnemy ? 'enemy' : ''}`}>
            <div className="combatant-name">{name}</div>
            <div className="health-bar-row">
                <div className="health-bar-container">
                    <div className="health-bar" style={{ width: `${healthPct}%` }}></div>
                </div>
                <div className="health-bar-text">{currentHealth}/{maxHealth}</div>
            </div>
            <div className="combatant-stats">
                <div>{getStatIcon('speed')} {speed}</div>
                {brawn >= (magic ?? -1) ? <div>{getStatIcon('brawn')} {brawn}</div> : <div>{getStatIcon('magic')} {magic}</div>}
                {armour && armour > 0 ? <div>{getStatIcon('armour')} {armour}</div> : null}
            </div>

            {activeEffects.length > 0 && (
                <div className="combatant-effects">
                    {activeEffects.map((effect, idx) => (
                        <ActiveEffectIcon
                            key={idx}
                            effect={effect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CombatantCard;

