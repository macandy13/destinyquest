import React, { useState } from 'react';
import { ActiveAbility, CombatState } from '../../types/combatState';
import { getAbilityDefinition, getAbilityIcon } from '../../mechanics/abilityRegistry';
import CombatAbilityItem from './CombatAbilityItem';
import CombatBackpackItem from './CombatBackpackItem';
import './CombatModal.css';
import './CombatAbilitySelector.css';

interface CombatAbilitySelectorProps {
    combat: CombatState;
    onActivateAbility: (abilityName: string) => void;
    onUseBackbackItem: (itemIndex: number) => void;
}

const CombatAbilitySelector: React.FC<CombatAbilitySelectorProps> = ({ combat, onActivateAbility, onUseBackbackItem }) => {
    const [selectedAbility, setSelectedAbility] = useState<ActiveAbility | null>(null);

    const canActivateAbility = (abilityName: string) => {
        const def = getAbilityDefinition(abilityName);
        if (!def || def.type === 'passive' || !def.onActivate) return false;
        if (def.canActivate) return def.canActivate(combat, { owner: 'hero' });
        return true;
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

    const allActiveAbilities = [...combat.hero.activeAbilities.values()];
    const availableAbilities = allActiveAbilities
        .filter(a => canActivateAbility(a.name))
        .sort((a, b) => a.name.localeCompare(b.name));
    if (availableAbilities.length === 0) return null;

    return (
        <div className="ability-selector-container">
            <div className="ability-list-horizontal">
                {availableAbilities.map((ability, index: number) => (
                    <CombatAbilityItem
                        key={index}
                        ability={ability}
                        onClick={() => setSelectedAbility(ability)}
                    />
                ))}
                {combat.hero?.original.backpack.map((item, index: number) => (
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
                            <div className="ability-icon-huge">{getAbilityIcon(selectedAbility.def)}</div>
                            <span className="ability-modal-title">
                                <h3>{selectedAbility.name}</h3>
                                <span>{selectedAbility.uses ? `(x${selectedAbility.uses})` : ''}</span>
                            </span>
                            <button className="close-btn ability-modal-close" onClick={() => setSelectedAbility(null)}>&times;</button>
                        </div>

                        <div className="ability-modal-body">
                            <p className="ability-modal-description">{selectedAbility.def.description}</p>
                            {selectedAbility.sources && (
                                <p className="text-dim text-sm" style={{ marginTop: '8px' }}>
                                    Source(s): {selectedAbility.sources.map(s => s.name).join(', ')}
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
