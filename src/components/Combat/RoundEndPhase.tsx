import React from 'react';
import { CombatState } from '../../types/combatState';
import CombatPhaseLayout from './CombatPhaseLayout';

interface RoundEndPhaseProps {
    combat: CombatState;
    nextRound: () => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const RoundEndPhase: React.FC<RoundEndPhaseProps> = ({
    combat,
    nextRound,
    activateAbility,
    useBackpackItem
}) => {
    return (
        <CombatPhaseLayout
            title="Round End"
            description={`Round ${combat.round} complete. prepare for next round.`}
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={nextRound}>
                    Start Round {combat.round + 1}
                </button>
            }
        >
            {/* Round summary stats? */}
        </CombatPhaseLayout>
    );
};

export default RoundEndPhase;
