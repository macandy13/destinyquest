import React from 'react';
import { Effect, formatEffect } from '../../types/effect';
import CombatOverlay from './CombatOverlay';
import { PrimaryButton } from '../Shared/Button';
import {
    getAbilityDefinition,
    getAbilityIcon
} from '../../mechanics/abilityRegistry';
import './ActiveEffectOverlay.css';

interface ActiveEffectOverlayProps {
    effect: Effect;
    onClose: () => void;
    onRemove?: () => void;
}

const ActiveEffectOverlay: React.FC<ActiveEffectOverlayProps> = ({
    effect,
    onClose,
    onRemove
}) => {
    let icon = effect.icon;
    if (!icon) {
        const def = getAbilityDefinition(effect.source);
        icon = getAbilityIcon(def);
    }

    const effectDescription = formatEffect(effect);
    const durationText = effect.duration === undefined
        ? 'Infinite'
        : `${effect.duration} rounds`;

    return (
        <CombatOverlay
            title={effect.source}
            icon={icon}
            onClose={onClose}>
            <CombatOverlay.Content>
                <div className="effect-overlay-content">
                    {effectDescription && <p>{effectDescription}</p>}
                    <p className="effect-overlay-duration">
                        Duration: {durationText}
                    </p>
                </div>
            </CombatOverlay.Content>
            <CombatOverlay.Actions>
                <>
                    {onRemove ? (
                        <PrimaryButton
                            className="btn-remove-effect"
                            onClick={onRemove}>
                            Remove Effect
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton onClick={onClose}>Close</PrimaryButton>
                    )}
                </>
            </CombatOverlay.Actions>
        </CombatOverlay>
    );
};

export default ActiveEffectOverlay;

