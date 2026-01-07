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
    let value: number | undefined;
    const s = effect.stats;
    if (s.damageModifier) { icon = getStatIcon('damage'); value = s.damageModifier; }
    else if (s.speed) { icon = getStatIcon('speed'); value = s.speed; }
    else if (s.brawn) { icon = getStatIcon('brawn'); value = s.brawn; }
    else if (s.magic) { icon = getStatIcon('magic'); value = s.magic; }
    else if (s.armour) { icon = getStatIcon('armour'); value = s.armour; }
    else if (s.health) { icon = getStatIcon('health'); value = s.health; }
    else if (s.speedDice) { icon = getStatIcon('die'); value = s.speedDice; }
    else if (s.damageDice) { icon = getStatIcon('die'); value = s.damageDice; }
    if (effect.icon) {
        icon = effect.icon;
    }

    let valueDisplay = value === undefined ? '' : value;
    if (value ?? 0 > 0) valueDisplay = '+' + valueDisplay;

    const durationDisplay = effect.duration === undefined ? '∞' : effect.duration;
    return (
        <div className="active-effect-icon" onClick={onClick} title={effect.source}>
            <span>{icon}</span>
            {valueDisplay ? <span className="effect-value">{valueDisplay}</span> : null}
            {durationDisplay ? <span className="effect-duration-badge">{durationDisplay}</span> : null}
        </div>
    );
};

export default ActiveEffectIcon;
