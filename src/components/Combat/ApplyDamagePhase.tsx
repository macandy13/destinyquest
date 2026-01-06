import React from 'react';
import { CombatState } from '../../types/combatState';
import CombatPhaseLayout from './CombatPhaseLayout';

interface ApplyDamagePhaseProps {
    combat: CombatState;
    confirmBonusDamage: () => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const ApplyDamagePhase: React.FC<ApplyDamagePhaseProps> = ({
    combat,
    confirmBonusDamage,
    activateAbility,
    useBackpackItem
}) => {
    return (
        <CombatPhaseLayout
            title="Apply Damage"
            description="Damage dealt. Checking for passive effects..."
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={confirmBonusDamage}>
                    Apply Passive Abilities
                </button>
            }
        >
            {/* Could show summary of damage dealt here? */}
        </CombatPhaseLayout>
    );
};

export default ApplyDamagePhase;
