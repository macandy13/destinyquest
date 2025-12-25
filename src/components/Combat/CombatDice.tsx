import React, { useState } from 'react';
import './CombatDice.css';

interface CombatDiceProps {
    onRoll?: (rolls: number[]) => void;
    result?: number; // Total result text
    values?: number[]; // Controlled mode: display these specific dice
    count?: number; // Number of dice (default 2)
    label?: string;
    onDieClick?: (index: number) => void;
}

const CombatDice: React.FC<CombatDiceProps> = ({ onRoll, result, values, count = 2, label, onDieClick }) => {
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
            onRoll(newRolls);
        }, 600);
    };

    const handleDieClick = (index: number) => {
        if (onDieClick && !isRolling) {
            onDieClick(index);
        } else if (!onDieClick && onRoll) {
            roll(); // Fallback to roll behavior if click handler isn't specific
        }
    };

    return (
        <div className="dice-wrapper">
            {label && <div className="dice-label">{label}</div>}
            <div className="dice-container">
                {currentDice.map((val, i) => {
                    const isInteractive = !!onDieClick || !!onRoll;
                    return (
                        <div
                            key={i}
                            className={`die d6 ${isRolling ? 'rolling' : ''} ${onDieClick ? 'interactive' : ''} ${!isInteractive ? 'static' : ''}`}
                            onClick={() => handleDieClick(i)}
                        >
                            <span className="die-result">{val}</span>
                        </div>
                    );
                })}
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
