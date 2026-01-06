import React from 'react';
import { CombatState } from '../../types/combatState';
import CombatPhaseLayout from './CombatPhaseLayout';

interface PassiveDamagePhaseProps {
    combat: CombatState;
    nextRound: () => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const PassiveDamagePhase: React.FC<PassiveDamagePhaseProps> = ({
    combat,
    nextRound,
    activateAbility,
    useBackpackItem
}) => {
    return (
        <CombatPhaseLayout
            title="Passive Damage"
            description="Applying passive damage effects..."
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={nextRound}>
                    Next Round
                </button>
            }
        >
            {/* Visuals for passive damage? */}
            {combat.damage && (
                <div style={{ color: 'var(--dq-gold)' }}>
                    Bottom of round damage: {(combat.damage as any).damageModifier ?? 0}
                </div>
            )}
        </CombatPhaseLayout>
    );
};

export default PassiveDamagePhase;
