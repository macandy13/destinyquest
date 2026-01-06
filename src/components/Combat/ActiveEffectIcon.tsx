import React from 'react';
import { Effect } from '../../types/effect';
import { getStatIcon } from '../../types/stats';
import './ActiveEffectIcon.css';

interface ActiveEffectIconProps {
    effect: Effect;
    onClick: () => void;
}

const ActiveEffectIcon: React.FC<ActiveEffectIconProps> = ({ effect, onClick }) => {
    // Determine icon based on what stat is modified
    let icon = '✨'; // Default magic sparkle

    // Check keys in order of precedence/importance or logic
    // Check keys in order of precedence/importance or logic
    if (effect.icon) {
        icon = effect.icon;
    } else {
        const s = effect.stats;
        if (s.damageModifier) icon = getStatIcon('damage');
        else if (s.speed) icon = getStatIcon('speed');
        else if (s.brawn) icon = getStatIcon('brawn');
        else if (s.magic) icon = getStatIcon('magic');
        else if (s.armour) icon = getStatIcon('armour');
        else if (s.health) icon = getStatIcon('health');
        else if (s.speedDice) icon = getStatIcon('die');
    }

    const durationDisplay = effect.duration === undefined ? '∞' : effect.duration;
    return (
        <div className="active-effect-icon" onClick={onClick} title={effect.source}>
            <span className="effect-icon-symbol">{icon}</span>
            <span className="effect-duration-badge">{durationDisplay}</span>
        </div>
    );
};

export default ActiveEffectIcon;
