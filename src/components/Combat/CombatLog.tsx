import React, { useState } from 'react';
import { CombatLog as CombatLogType } from '../../types/combatLog';
import './CombatLog.css';

interface CombatLogProps {
    logs: CombatLogType[];
}

const CombatLog: React.FC<CombatLogProps> = ({ logs }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
        <div className={`combat-log ${isFullscreen ? 'fullscreen' : ''}`}>
            <div className="log-header">
                <span className="log-title">Combat Log</span>
                <button
                    className="log-toggle"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                >
                    {isFullscreen ? '▼ Minimize' : '▲ Expand'}
                </button>
            </div>
            <div className="log-content">
                {[...logs].reverse().map((log, i) => (
                    <div key={i} className={`log-entry ${log.type}`}>
                        [{log.round}] {log.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CombatLog;
