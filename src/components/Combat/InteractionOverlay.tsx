import React from 'react';
import { ActiveAbility, InteractionRequest, InteractionResponse } from '../../types/combatState';
import { getAbilityIcon } from '../../mechanics/abilityRegistry';
import CombatOverlay from './CombatOverlay';
import { SecondaryButton } from '../Shared/Button';

interface InteractionOverlayProps {
    ability: ActiveAbility;
    interaction: InteractionRequest;
    onResolve: (data: InteractionResponse) => void;
}

const InteractionOverlay: React.FC<InteractionOverlayProps> = ({ ability, interaction, onResolve }) => {
    if (!interaction || interaction.type !== 'choices' || !interaction.choices) return null;

    const handleChoice = (index: number) => {
        onResolve({ request: interaction, selectedIndexes: [index] } as any);
    };

    return (
        <CombatOverlay
            title={ability.name}
            icon={getAbilityIcon(ability.def)}>
            <CombatOverlay.Content>
                <p className="ability-modal-description">{ability.def.description}</p>
            </CombatOverlay.Content>
            <CombatOverlay.Actions>
                {interaction.choices.map((choice, index) => (
                    <SecondaryButton key={index} onClick={() => handleChoice(index)}>
                        {choice}
                    </SecondaryButton>
                ))}
            </CombatOverlay.Actions>
        </CombatOverlay >
    );
};

export default InteractionOverlay;
