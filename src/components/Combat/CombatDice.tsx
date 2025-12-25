import React, { useState } from 'react';
import './CombatDice.css';

interface CombatDiceProps {
    onRoll?: (total: number, rolls: number[]) => void;
    result?: number; // Total result text
    values?: number[]; // Controlled mode: display these specific dice
    count?: number; // Number of dice (default 2)
    label?: string;
}

const CombatDice: React.FC<CombatDiceProps> = ({ onRoll, result, values, count = 2, label }) => {
    const [isRolling, setIsRolling] = useState(false);
    const [internalDice, setInternalDice] = useState<number[]>(new Array(count).fill(1));

    // Determine current dice values to display
    const currentDice = values || internalDice;

    const roll = () => {
        if (isRolling || !onRoll) return; // Disable roll if controlled or already rolling
        setIsRolling(true);

        // Animation frames
        const interval = setInterval(() => {
            setInternalDice(new Array(count).fill(0).map(() => Math.ceil(Math.random() * 6)));
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            const newRolls = new Array(count).fill(0).map(() => Math.ceil(Math.random() * 6));
            setInternalDice(newRolls);
            setIsRolling(false);
            const total = newRolls.reduce((a, b) => a + b, 0);
            onRoll(total, newRolls);
        }, 600);
    };

    return (
        <div className="dice-wrapper" style={{ textAlign: 'center' }}>
            {label && <div className="dice-label" style={{ marginBottom: '4px', fontSize: '0.9rem', color: '#888' }}>{label}</div>}
            <div className="dice-container" style={{ justifyContent: 'center' }}>
                {currentDice.map((val, i) => (
                    <div key={i} className={`die d6 ${isRolling ? 'rolling' : ''}`} onClick={roll}>
                        <span className="die-result">{val}</span>
                    </div>
                ))}
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
