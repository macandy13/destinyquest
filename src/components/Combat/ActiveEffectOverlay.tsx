import React from 'react';
import { Effect, formatEffect } from '../../types/effect';
import './ActiveEffectOverlay.css';

interface ActiveEffectOverlayProps {
    effect: Effect;
    onClose: () => void;
}

const ActiveEffectOverlay: React.FC<ActiveEffectOverlayProps> = ({ effect, onClose }) => {
    return (
        <div className="active-effect-overlay-backdrop" onClick={onClose}>
            <div className="active-effect-overlay-content" onClick={e => e.stopPropagation()}>
                <h3>{effect.source}</h3>
                <div className="effect-details">
                    <p>{formatEffect(effect)}</p>
                    <p className="effect-duration">
                        Duration: {effect.duration === undefined ? 'Infinite' : `${effect.duration} rounds`}
                    </p>
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ActiveEffectOverlay;
