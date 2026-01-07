import React from 'react';
import { CombatState } from '../../types/combatState';
import { getAbilityIcon } from '../../mechanics/abilityRegistry';
import CombatOverlay from './CombatOverlay';
import { SecondaryButton } from '../Shared/Button';

interface InteractionOverlayProps {
    combat: CombatState;
    onResolve: (data: { selectedIndex: number }) => void;
}

const InteractionOverlay: React.FC<InteractionOverlayProps> = ({ combat, onResolve }) => {
    const interaction = combat.pendingInteraction;
    const [currentStep, setCurrentStep] = React.useState(0);
    const [responses, setResponses] = React.useState<any[]>([]);

    React.useEffect(() => {
        // Reset state when interaction changes
        setCurrentStep(0);
        setResponses([]);
    }, [interaction]);


    if (!interaction) return null;

    const currentRequest = interaction.requests[currentStep];
    if (!currentRequest || currentRequest.type !== 'choices' || !currentRequest.choices) return null;

    const handleChoice = (index: number) => {
        const newResponses = [...responses, { request: currentRequest, selectedIndex: index }];

        if (currentStep < interaction.requests.length - 1) {
            setResponses(newResponses);
            setCurrentStep(currentStep + 1);
        } else {
            onResolve(newResponses as any);
        }
    };

    return (
        <CombatOverlay
            title={interaction.ability.name}
            icon={getAbilityIcon(interaction.ability.def)}>
            <CombatOverlay.Content>
                <p className="ability-modal-description">{interaction.ability.def.description}</p>
                <div className="text-dim text-sm" style={{ marginTop: '1rem' }}>
                    Step {currentStep + 1} of {interaction.requests.length}
                </div>
            </CombatOverlay.Content>
            <CombatOverlay.Actions>
                {currentRequest.choices.map((choice, index) => (
                    <SecondaryButton key={index} onClick={() => handleChoice(index)}>
                        {choice}
                    </SecondaryButton>
                ))}
            </CombatOverlay.Actions>
        </CombatOverlay >
    );
};

export default InteractionOverlay;
