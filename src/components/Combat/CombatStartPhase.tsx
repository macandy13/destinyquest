import React from 'react';
import { CombatState } from '../../types/combatState';
import CombatPhaseLayout from './CombatPhaseLayout';

interface CombatStartPhaseProps {
    combat: CombatState;
    rollSpeedDice: () => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const CombatStartPhase: React.FC<CombatStartPhaseProps> = ({ combat, rollSpeedDice, activateAbility, useBackpackItem }) => {
    return (
        <CombatPhaseLayout
            title="Combat Start"
            description="Prepare to fight!"
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={rollSpeedDice}>
                    Roll Speed Dice
                </button>
            }
        >
            {/* Visual flair or empty? */}
        </CombatPhaseLayout>
    );
};

export default CombatStartPhase;
