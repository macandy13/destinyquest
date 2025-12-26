import React, { useState, useEffect, useRef } from 'react';
import './CombatDice.css';

interface CombatDiceProps {
    result?: number; // Total result text
    values?: number[]; // Controlled mode: display these specific dice
    count?: number; // Number of dice (default 2)
    label?: string;
    onDieClick?: (index: number) => void;
}

const CombatDice: React.FC<CombatDiceProps> = ({ result, values, count = 2, label, onDieClick }) => {
    const [isRolling, setIsRolling] = useState(false);
    const [internalDice, setInternalDice] = useState<number[]>(new Array(count).fill(1));
    const prevValuesRef = useRef<string>(''); // Init empty to trigger diff if mounted with values

    // Effect to trigger animation when external values change
    useEffect(() => {
        const valuesStr = JSON.stringify(values);
        if (values && valuesStr !== prevValuesRef.current) {
            prevValuesRef.current = valuesStr;
            setIsRolling(true);

            // Animation loop
            const interval = setInterval(() => {
                setInternalDice(new Array(values.length).fill(0).map(() => Math.ceil(Math.random() * 6)));
            }, 50);

            // Finish animation
            setTimeout(() => {
                clearInterval(interval);
                setIsRolling(false);
                // No need to set internalDice to final values because we switch back to using `values` prop
            }, 600);

            return () => clearInterval(interval);
        } else if (!values) {
            prevValuesRef.current = valuesStr;
        }
    }, [values]);

    // Determine current dice values to display
    // If rolling, show the internal randomized dice. Otherwise prefer props.values, falling back to internalDice.
    const currentDice = isRolling ? internalDice : (values || internalDice);

    const roll = () => {
        if (isRolling) return; // Disable roll if controlled or already rolling
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
        }, 600);
    };

    const handleDieClick = (index: number) => {
        if (onDieClick && !isRolling) {
            onDieClick(index);
        } else if (!onDieClick) {
            roll(); // Fallback to roll behavior if click handler isn't specific
        }
    };

    return (
        <div className="dice-wrapper">
            {label && <div className="dice-label">{label}</div>}
            <div className="dice-container">
                {currentDice.map((val, i) => {
                    const isInteractive = !!onDieClick;
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
