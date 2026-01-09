import React from 'react';
import { CombatState } from '../../types/combatState';
import { getPassiveAbilityPreview, PassivePreview } from '../../mechanics/CombatEngine';
import CombatPhaseLayout from './CombatPhaseLayout';
import './ApplyDamagePhase.css';

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
            title="Passive Damage"
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <div>
                    <button className="btn btn-primary btn-phase-action" onClick={confirmBonusDamage}>
                        Apply Passive Abilities
                    </button>
                </div>
            }
        >
            <div className="passive-preview-list" style={{ marginBottom: '1rem' }}>
                {getPassiveAbilityPreview(combat).previews.map((preview, idx) => (
                    <div key={idx} className={`passive-preview-item ${preview.owner}`}>
                        <strong>{preview.abilityName}:</strong>
                        <ul style={{ margin: '0.5rem 0 0 1rem', padding: 0 }}>
                            {preview.changes.map((change, cIdx) => (
                                <li key={cIdx} style={{ listStyle: 'none' }}>
                                    {change.message}
                                </li>
                            ))}
                        </ul>
                        {!preview.changes.length && <span style={{ marginLeft: '0.5em' }}>{preview.description}</span>}
                    </div>
                ))}
            </div>
        </CombatPhaseLayout>
    );
};

export default ApplyDamagePhase;
