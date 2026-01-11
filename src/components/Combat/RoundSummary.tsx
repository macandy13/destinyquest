import React from 'react';
import { CombatState } from '../../types/combatState';
import CombatPhaseLayout from './CombatPhaseLayout';
import CombatStateEditor from './CombatStateEditor';

interface RoundSummaryProps {
    combat: CombatState;
    nextRound: () => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
    onUpdateState: (state: CombatState) => void;
}

const RoundSummary: React.FC<RoundSummaryProps> = ({
    combat,
    nextRound,
    activateAbility,
    useBackpackItem,
    onUpdateState
}) => {
    const [isEditing, setIsEditing] = React.useState(false);

    return (
        <CombatPhaseLayout
            title="Round Summary"
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <>
                    <button className="btn btn-secondary btn-phase-action" onClick={() => setIsEditing(true)}>
                        Fix State
                    </button>
                    <button className="btn btn-primary btn-phase-action" onClick={nextRound}>
                        Next Round
                    </button>
                </>
            }
        >
            <<div>>TODO: Show summary of the changes in this round</div>
            {isEditing && (
                <CombatStateEditor
                    combat={combat}
                    onApply={(state) => {
                        onUpdateState(state);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </CombatPhaseLayout>
    );
};

export default RoundSummary;
