import React from 'react';
import './NumberControl.css';

interface NumberControlProps {
    value: number;
    onChange: (value: number) => void;
    min?: number;
    max?: number;
    step?: number; // Not used for buttons (fixed to 1/10) but for logical validation if needed
    label?: string;
}

const NumberControl: React.FC<NumberControlProps> = ({ value, onChange, min = 0, max = 9999, label }) => {

    const handleChange = (delta: number) => {
        const newValue = Math.min(max, Math.max(min, value + delta));
        onChange(newValue);
    };

    return (
        <div className="number-control">
            <div className="nc-buttons left">
                <button
                    className="nc-btn nc-btn-large"
                    onClick={() => handleChange(-10)}
                    disabled={value - 10 < min}
                    aria-label="Decrease by 10"
                >
                    -10
                </button>
                <button
                    className="nc-btn"
                    onClick={() => handleChange(-1)}
                    disabled={value <= min}
                    aria-label="Decrease by 1"
                >
                    -
                </button>
            </div>

            <div className="nc-display">
                <span className="nc-value">{value}</span>
                {label && <span className="nc-label">{label}</span>}
            </div>

            <div className="nc-buttons right">
                <button
                    className="nc-btn"
                    onClick={() => handleChange(1)}
                    disabled={value >= max}
                    aria-label="Increase by 1"
                >
                    +
                </button>
                <button
                    className="nc-btn nc-btn-large"
                    onClick={() => handleChange(10)}
                    disabled={value + 10 > max}
                    aria-label="Increase by 10"
                >
                    +10
                </button>
            </div>
        </div>
    );
};

export default NumberControl;
