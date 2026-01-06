import React from 'react';
import { CombatState } from '../../types/combatState';
import CombatPhaseLayout from './CombatPhaseLayout';

interface RoundStartPhaseProps {
    combat: CombatState;
    rollSpeedDice: () => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const RoundStartPhase: React.FC<RoundStartPhaseProps> = ({ combat, rollSpeedDice, activateAbility, useBackpackItem }) => {
    return (
        <CombatPhaseLayout
            title={`Round ${combat.round}`}
            description="Prepare for the next round!"
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={rollSpeedDice}>
                    Roll Speed Dice
                </button>
            }
        >
            {/* Maybe show modifiers here? */}
        </CombatPhaseLayout>
    );
};

export default RoundStartPhase;
