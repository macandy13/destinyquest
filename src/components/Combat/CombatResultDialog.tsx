import React from 'react';
import './CombatResultDialog.css';

interface CombatResultDialogProps {
    result: 'victory' | 'defeat';
    onAccept: () => void;
    onRetry: () => void;
}

const CombatResultDialog: React.FC<CombatResultDialogProps> = ({ result, onAccept, onRetry }) => {
    return (
        <div className="combat-result-overlay">
            <div className="combat-result-content">
                <h2 className={`${result}`}>
                    {result === 'victory' ? 'VICTORY' : 'DEFEAT'}
                </h2>

                <div>
                    {result === 'victory'
                        ? "You have triumphed over your enemy!"
                        : "You have been defeated in combat."}
                </div>

                <div className="result-actions">
                    <button className="btn btn-secondary" onClick={onRetry}>
                        Retry
                    </button>
                    <button className="btn btn-primary" onClick={onAccept}>
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CombatResultDialog;
