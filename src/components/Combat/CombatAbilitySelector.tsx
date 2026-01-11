import React, { useState } from 'react';
import { ActiveAbility, CombatState } from '../../types/combatState';
import { getAbilityDefinition, getAbilityIcon } from '../../mechanics/abilityRegistry';
import CombatAbilityItem from './CombatAbilityItem';
import CombatBackpackItem from './CombatBackpackItem';
import './CombatAbilitySelector.css';
import CombatOverlay from './CombatOverlay';
import { PrimaryButton } from '../Shared/Button';

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

        // Check per-round limits
        if (['speed', 'combat'].includes(def.type)) {
            const used = combat.usedAbilities || [];
            if (used.some(a => a.type === def.type)) return false;
        }

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
                <CombatOverlay
                    title={selectedAbility.name + (selectedAbility.uses ? ` (x${selectedAbility.uses})` : '')}
                    icon={getAbilityIcon(selectedAbility.def)}
                    onClose={() => setSelectedAbility(null)}>
                    <CombatOverlay.Content>
                        <p className="ability-modal-description">{selectedAbility.def.description}</p>
                        {selectedAbility.sources && (
                            <p className="text-dim text-sm" style={{ marginTop: '8px' }}>
                                Source(s): {selectedAbility.sources.map(s => s.name).join(', ')}
                            </p>
                        )}
                    </CombatOverlay.Content>
                    <CombatOverlay.Actions>
                        <PrimaryButton onClick={handleConfirm}>Use Ability</PrimaryButton>
                    </CombatOverlay.Actions>
                </CombatOverlay>
            )}
        </div>
    );
};

export default CombatAbilitySelector;

