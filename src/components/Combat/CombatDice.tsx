import React, { useState } from 'react';
import './CombatDice.css';

interface CombatDiceProps {
    onRoll: (total: number, rolls: number[]) => void;
    result?: number;
}

const CombatDice: React.FC<CombatDiceProps> = ({ onRoll, result }) => {
    const [isRolling, setIsRolling] = useState(false);
    const [die1, setDie1] = useState(1);
    const [die2, setDie2] = useState(1);

    const roll = () => {
        if (isRolling) return;
        setIsRolling(true);

        // Animation frames
        const interval = setInterval(() => {
            setDie1(Math.ceil(Math.random() * 6));
            setDie2(Math.ceil(Math.random() * 6));
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            const r1 = Math.ceil(Math.random() * 6);
            const r2 = Math.ceil(Math.random() * 6);
            setDie1(r1);
            setDie2(r2);
            setIsRolling(false);
            onRoll(r1 + r2, [r1, r2]);
        }, 600);
    };

    return (
        <div className="dice-container">
            <div className={`die d6 ${isRolling ? 'rolling' : ''}`} onClick={roll}>
                <span className="die-result">{die1}</span>
            </div>
            <div className={`die d6 ${isRolling ? 'rolling' : ''}`} onClick={roll}>
                <span className="die-result">{die2}</span>
            </div>
            {result !== undefined && !isRolling && (
                <div className="dice-result-total">
                    = {result}
                </div>
            )}
        </div>
    );
};

export default CombatDice;
