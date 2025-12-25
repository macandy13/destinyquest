import React from 'react';
import { CombatState } from '../../types/combat';
import { getAbilityDefinition } from '../../mechanics/abilityDefinitions';
import CombatAbilityItem from './CombatAbilityItem';
import './CombatAbilitySelector.css';

interface CombatAbilitySelectorProps {
    combat: CombatState;
    onActivate: (abilityName: string) => void;
}

const CombatAbilitySelector: React.FC<CombatAbilitySelectorProps> = ({ combat, onActivate }) => {
    const canActivateAbility = (abilityName: string, used?: boolean) => {
        const def = getAbilityDefinition(abilityName);
        if (!def || def.type === 'passive' || !def.onActivate || used) return false;
        if (def.canActivate) return def.canActivate(combat);
        return true;
    };

    const availableAbilities = combat.activeAbilities.filter(a => canActivateAbility(a.name, a.used));

    if (availableAbilities.length === 0) return null;

    return (
        <div className="ability-selector-container">
            <h4 className="ability-selector-title">Abilities</h4>
            <div className="ability-list">
                {availableAbilities.map((ability, index) => (
                    <CombatAbilityItem
                        key={index}
                        ability={ability}
                        onActivate={onActivate}
                    />
                ))}
            </div>
        </div>
    );
};

export default CombatAbilitySelector;
