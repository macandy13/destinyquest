import React, { useState } from 'react';
import { CombatState } from '../../types/combat';
import { getAbilityDefinition, AbilityDefinition, getAbilityIcon } from '../../mechanics/abilityRegistry';
import CombatAbilityItem from './CombatAbilityItem';
import CombatBackpackItem from './CombatBackpackItem';
import './CombatAbilitySelector.css';

interface CombatAbilitySelectorProps {
    combat: CombatState;
    onActivateAbility: (abilityName: string) => void;
    onUseBackbackItem: (itemIndex: number) => void;
}

const CombatAbilitySelector: React.FC<CombatAbilitySelectorProps> = ({ combat, onActivateAbility, onUseBackbackItem }) => {
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

    const handleBackpackClick = (itemIndex: number) => {
        onUseBackbackItem(itemIndex);
    };

    const handleConfirm = () => {
        if (selectedAbility) {
            onActivateAbility(selectedAbility.name);
            setSelectedAbility(null);
        }
    };

    const activeAbilityInstance = selectedAbility
        ? combat.activeAbilities.find(a => a.name === selectedAbility.name)
        : null;

    const abilityCounts: Record<string, number> = {};
    const availableAbilities = combat.activeAbilities
        .filter(a => canActivateAbility(a.name, a.used))
        .reduce((acc, a) => {
            if (!abilityCounts[a.name]) {
                abilityCounts[a.name] = 0;
                acc.push(a);
            }
            abilityCounts[a.name]++;
            return acc;
        }, [] as typeof combat.activeAbilities)
        .sort((a, b) => a.name.localeCompare(b.name));

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
                {combat.hero?.backpack?.map((item, index) => (
                    item && (item.uses === undefined || item.uses > 0) && <CombatBackpackItem
                        key={`backpack-${index}`}
                        item={item}
                        onClick={() => handleBackpackClick(index)}
                    />
                ))}
            </div>

            {selectedAbility && (
                <div className="ability-modal-overlay" onClick={() => setSelectedAbility(null)}>
                    <div className="ability-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="ability-modal-header">
                            <div className="ability-icon-huge">{getAbilityIcon(selectedAbility)}</div>
                            <span className="ability-modal-title">
                                <h3>{selectedAbility.name}</h3>
                                <span>{abilityCounts[selectedAbility.name] > 1 ? `(x${abilityCounts[selectedAbility.name]})` : ''}</span>
                            </span>
                            <button className="close-btn ability-modal-close" onClick={() => setSelectedAbility(null)}>&times;</button>
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
                            <button className="btn btn-primary" onClick={handleConfirm} style={{ width: '100%' }}>
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
