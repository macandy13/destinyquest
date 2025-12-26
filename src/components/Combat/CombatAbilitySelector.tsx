import React, { useState } from 'react';
import { CombatState } from '../../types/combat';
import { getAbilityDefinition, AbilityDefinition, getAbilityIcon } from '../../mechanics/abilityDefinitions';
import CombatAbilityItem from './CombatAbilityItem';
import './CombatAbilitySelector.css';

interface CombatAbilitySelectorProps {
    combat: CombatState;
    onActivate: (abilityName: string) => void;
}

const CombatAbilitySelector: React.FC<CombatAbilitySelectorProps> = ({ combat, onActivate }) => {
    const [selectedAbility, setSelectedAbility] = useState<AbilityDefinition | null>(null);

    const canActivateAbility = (abilityName: string, used?: boolean) => {
        const def = getAbilityDefinition(abilityName);
        if (!def || def.type === 'passive' || !def.onActivate || used) return false;
        if (def.canActivate) return def.canActivate(combat);
        return true;
    };

    const handleAbilityClick = (abilityName: string) => {
        const def = getAbilityDefinition(abilityName);
        if (def) {
            setSelectedAbility(def);
        }
    };

    const handleConfirm = () => {
        if (selectedAbility) {
            onActivate(selectedAbility.name);
            setSelectedAbility(null);
        }
    };

    const activeAbilityInstance = selectedAbility
        ? combat.activeAbilities.find(a => a.name === selectedAbility.name)
        : null;

    const alreadySeenAbilities = new Set<string>();
    const availableAbilities = combat.activeAbilities
        .filter(a => canActivateAbility(a.name, a.used))
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(a => {
            if (alreadySeenAbilities.has(a.name)) return false;
            alreadySeenAbilities.add(a.name);
            return true;
        });

    if (availableAbilities.length === 0) return null;

    return (
        <div className="ability-selector-container">
            <div className="ability-list-horizontal">
                {availableAbilities.map((ability, index) => (
                    <CombatAbilityItem
                        key={index}
                        ability={ability}
                        onClick={() => handleAbilityClick(ability.name)}
                    />
                ))}
            </div>

            {selectedAbility && (
                <div className="ability-modal-overlay" onClick={() => setSelectedAbility(null)}>
                    <div className="ability-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="ability-modal-header">
                            <div className="ability-icon-huge">{getAbilityIcon(selectedAbility)}</div>
                            <h3>{selectedAbility.name}</h3>
                        </div>

                        <div className="ability-modal-body">
                            <p className="ability-modal-description">{selectedAbility.description}</p>
                            {activeAbilityInstance && (
                                <p className="text-dim text-sm" style={{ marginTop: '8px' }}>
                                    Source: {activeAbilityInstance.source}
                                </p>
                            )}
                        </div>

                        <div className="ability-modal-actions">
                            <button className="btn-cancel" onClick={() => setSelectedAbility(null)}>
                                Cancel
                            </button>
                            <button className="btn-confirm" onClick={handleConfirm}>
                                Use Ability
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CombatAbilitySelector;
