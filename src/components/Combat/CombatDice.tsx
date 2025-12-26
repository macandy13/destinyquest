import React, { useState, useEffect, useRef } from 'react';
import { DiceRoll } from '../../types/combat';
import { sumDice } from '../../utils/dice';
import './CombatDice.css';

interface CombatDiceProps {
    values?: DiceRoll[]; // Controlled mode: display these specific dice
    count?: number; // Number of dice (default 2)
    label?: string;
    baseValue?: number; // Base stat value (e.g. speed, brawn)
    modifierValue?: number; // Additional modifiers
    onDieClick?: (index: number) => void;
}

const CombatDice: React.FC<CombatDiceProps> = ({ values, count = 2, label, baseValue = 0, modifierValue = 0, onDieClick }) => {
    // Track which specific dice indices are currently "rolling" (animating)
    const [rollingIndices, setRollingIndices] = useState<number[]>([]);

    // Internal dice is just numbers for animation
    const [internalDice, setInternalDice] = useState<number[]>(new Array(count).fill(1));
    const prevValuesRef = useRef<string>('');

    // Effect to trigger animation when external values change
    useEffect(() => {
        const valuesStr = JSON.stringify(values);
        if (values && valuesStr !== prevValuesRef.current) {
            // Parse previous values to compare
            const prevValues: DiceRoll[] = prevValuesRef.current ? JSON.parse(prevValuesRef.current) : [];
            prevValuesRef.current = valuesStr;

            // Determine which indices changed and should animate
            const newRollingIndices: number[] = [];
            values.forEach((val, i) => {
                const prev = prevValues[i];
                // Animate if:
                // 1. New die (index didn't exist)
                // 2. Value changed
                // 3. Reroll status changed (e.g. became rerolled, even if value is same by chance, visual feedback is good)
                // Note: If strictly identical 3->3 and no flag change, we skip animation, which is desirable to "keep others stable".
                // If rerolling 3->3, logic would usually flag isRerolled true, so it triggers.
                if (!prev || prev.value !== val.value || prev.isRerolled !== val.isRerolled) {
                    newRollingIndices.push(i);
                }
            });

            if (newRollingIndices.length > 0) {
                setRollingIndices(newRollingIndices);

                // Animation loop
                const interval = setInterval(() => {
                    setInternalDice(new Array(values.length).fill(0).map(() => Math.ceil(Math.random() * 6)));
                }, 50);

                // Finish animation
                setTimeout(() => {
                    clearInterval(interval);
                    setRollingIndices([]);
                }, 600);

                return () => clearInterval(interval);
            }
        } else if (!values) {
            // Uncontrolled reset
            prevValuesRef.current = valuesStr;
        }
    }, [values]);

    // Determine current dice values to display
    // For each index: if in rollingIndices, use internalDice[i], else use values[i] (or fallback)
    const currentDice = values
        ? values.map((val, i) => {
            if (rollingIndices.includes(i)) {
                return { value: internalDice[i], isRerolled: false } as DiceRoll;
            }
            return val;
        })
        : internalDice.map((val) => ( // Fallback for uncontrolled mode
            { value: val, isRerolled: false } as DiceRoll
        ));

    // Fallback manual roll for uncontrolled mode
    const roll = () => {
        // If controlled, do nothing (logic handled by prop change)
        if (values) return;

        // Rolling all
        setRollingIndices(new Array(count).fill(0).map((_, i) => i));

        const interval = setInterval(() => {
            setInternalDice(new Array(count).fill(0).map(() => Math.ceil(Math.random() * 6)));
        }, 50);

        setTimeout(() => {
            clearInterval(interval);
            const newRolls = new Array(count).fill(0).map(() => Math.ceil(Math.random() * 6));
            setInternalDice(newRolls);
            setRollingIndices([]);
        }, 600);
    };

    const handleDieClick = (index: number, diceRoll: DiceRoll) => {
        const isDieRolling = rollingIndices.includes(index);

        // Only allow clicking if NOT rolling and onDieClick is provided
        if (isDieRolling) return;

        if (onDieClick) {
            if (diceRoll.isRerolled) return;
            onDieClick(index);
        } else if (!values) {
            // Uncontrolled interactive
            roll();
        }
    };

    return (
        <div className="dice-wrapper">
            {label && <div className="dice-label">{label}</div>}
            <div className="dice-container">
                {currentDice.map((diceRoll, i) => {
                    const isDieRolling = rollingIndices.includes(i);
                    const isInteractive = !!onDieClick && !isDieRolling && !diceRoll.isRerolled;

                    return (
                        <div
                            key={i}
                            className={`die d6 ${isDieRolling ? 'rolling' : ''} ${isInteractive ? 'interactive' : 'static'} ${diceRoll.isRerolled ? 'rerolled' : ''}`}
                            onClick={() => handleDieClick(i, diceRoll)}
                        >
                            <span className="die-result">{diceRoll.value}</span>
                        </div>
                    );

                })}
            </div>
            {
                rollingIndices.length === 0 && (
                    <div className="dice-result-container">
                        {(baseValue !== 0 || modifierValue !== 0) && (
                            <div className="dice-result-breakdown text-dim">
                                {sumDice(currentDice)} (Roll)
                                {baseValue !== 0 && ` + ${baseValue} (Base)`}
                                {modifierValue !== 0 && ` + ${modifierValue} (Mod)`}
                            </div>
                        )}
                        <div className="dice-result-total">
                            = {sumDice(currentDice) + baseValue + modifierValue}
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default CombatDice;
