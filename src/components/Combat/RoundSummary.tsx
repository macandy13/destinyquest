import React from 'react';
import { CombatState } from '../../types/combatState';
import CombatPhaseLayout from './CombatPhaseLayout';

interface RoundSummaryProps {
    combat: CombatState;
    nextRound: () => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const RoundSummary: React.FC<RoundSummaryProps> = ({
    combat,
    nextRound,
    activateAbility,
    useBackpackItem
}) => {
    return (
        <CombatPhaseLayout
            title="Round Summary"
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={nextRound}>
                    Next Round
                </button>
            }
        >
            <div>TODO: Show summary of the changes in this round</div>
        </CombatPhaseLayout>
    );
};

export default RoundSummary;
