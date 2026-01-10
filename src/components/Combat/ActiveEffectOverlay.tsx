import React from 'react';
import { Effect, formatEffect } from '../../types/effect';
import CombatOverlay from './CombatOverlay';
import { PrimaryButton } from '../Shared/Button';
import { getAbilityDefinition, getAbilityIcon } from '../../mechanics/abilityRegistry';

interface ActiveEffectOverlayProps {
    effect: Effect;
    onClose: () => void;
}

const ActiveEffectOverlay: React.FC<ActiveEffectOverlayProps> = ({ effect, onClose }) => {
    let icon = effect.icon;
    if (!icon) {
        const def = getAbilityDefinition(effect.source);
        icon = getAbilityIcon(def);
    }

    const effectDescription = formatEffect(effect);

    return (
        <CombatOverlay
            title={effect.source}
            icon={icon}
            onClose={onClose}>
            <CombatOverlay.Content>
                <div style={{ textAlign: 'center' }}>
                    {effectDescription && <p>{effectDescription}</p>}
                    <p style={{ fontStyle: 'italic', marginTop: '0.5rem', color: 'var(--dq-light-grey)' }}>
                        Duration: {effect.duration === undefined ? 'Infinite' : `${effect.duration} rounds`}
                    </p>
                </div>
            </CombatOverlay.Content>
            <CombatOverlay.Actions>
                <PrimaryButton onClick={onClose}>Close</PrimaryButton>
            </CombatOverlay.Actions>
        </CombatOverlay>
    );
};

export default ActiveEffectOverlay;
