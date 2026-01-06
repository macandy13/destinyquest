import React from 'react';
import { CombatState } from '../../types/combatState';
import { getAbilityIcon } from '../../mechanics/abilityRegistry';
import './CombatModal.css';

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
            // All steps completed
            onResolve(newResponses as any);
        }
    };

    return (
        <div className="ability-modal-overlay">
            <div className="ability-modal-content">
                <div className="ability-modal-header">
                    <div className="ability-icon-huge">{getAbilityIcon(interaction.ability.def)}</div>
                    <span className="ability-modal-title">
                        <h3>{interaction.ability.name}</h3>
                    </span>
                    {/* No close button as interactions must be resolved */}
                </div>

                <div className="ability-modal-body">
                    <p className="ability-modal-description">{interaction.ability.def.description}</p>
                    <div className="text-dim text-sm" style={{ marginTop: '1rem' }}>
                        Step {currentStep + 1} of {interaction.requests.length}
                    </div>
                </div>

                <div className="ability-modal-actions">
                    {currentRequest.choices.map((choice, index) => (
                        <button
                            key={index}
                            className="btn btn-secondary"
                            onClick={() => handleChoice(index)}
                            style={{ flex: 1 }}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InteractionOverlay;
