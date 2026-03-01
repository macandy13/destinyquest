import React, { useState } from 'react';
import './NumberControl.css';
import './HealthControl.css';

type EditMode = 'current' | 'max';

interface HealthControlProps {
    current: number;
    max: number;
    onCurrentChange: (value: number) => void;
    onMaxChange: (value: number) => void;
}

const HealthControl: React.FC<HealthControlProps> = ({
    current,
    max,
    onCurrentChange,
    onMaxChange
}) => {
    const [mode, setMode] = useState<EditMode>('current');

    const value = mode === 'current' ? current : max;
    const onChange = mode === 'current' ? onCurrentChange : onMaxChange;
    const min = mode === 'current' ? 0 : 1;
    const maxVal = mode === 'current' ? max : 9999;

    const handleChange = (delta: number) => {
        const newValue = Math.min(maxVal, Math.max(min, value + delta));
        onChange(newValue);
    };

    return (
        <div className="number-control health-control">
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

            <div className="nc-display health-display">
                <span
                    className={`nc-value health-value ${mode === 'current' ? 'active' : 'clickable'}`}
                    onClick={mode !== 'current' ? () => setMode('current') : undefined}
                    role={mode !== 'current' ? 'button' : undefined}
                    tabIndex={mode !== 'current' ? 0 : undefined}
                    onKeyDown={mode !== 'current' ? (e) => e.key === 'Enter' && setMode('current') : undefined}
                >
                    {current}
                </span>
                <span className="nc-separator">/</span>
                <span
                    className={`nc-value health-value ${mode === 'max' ? 'active' : 'clickable'}`}
                    onClick={mode !== 'max' ? () => setMode('max') : undefined}
                    role={mode !== 'max' ? 'button' : undefined}
                    tabIndex={mode !== 'max' ? 0 : undefined}
                    onKeyDown={mode !== 'max' ? (e) => e.key === 'Enter' && setMode('max') : undefined}
                >
                    {max}
                </span>
            </div>

            <div className="nc-buttons right">
                <button
                    className="nc-btn"
                    onClick={() => handleChange(1)}
                    disabled={value >= maxVal}
                    aria-label="Increase by 1"
                >
                    +
                </button>
                <button
                    className="nc-btn nc-btn-large"
                    onClick={() => handleChange(10)}
                    disabled={value + 10 > maxVal}
                    aria-label="Increase by 10"
                >
                    +10
                </button>
            </div>
        </div>
    );
};

export default HealthControl;
