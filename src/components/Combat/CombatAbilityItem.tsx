import React from 'react';
import { ActiveAbility } from '../../types/combat';
import './CombatAbilityItem.css';

interface CombatAbilityItemProps {
    ability: ActiveAbility;
    onActivate: (abilityName: string) => void;
}

const CombatAbilityItem: React.FC<CombatAbilityItemProps> = ({ ability, onActivate }) => {
    return (
        <div className="ability-card">
            <div className="ability-header">
                <span className="ability-name">{ability.name}</span>
                <span className="ability-source">({ability.source})</span>
            </div>
            <button
                className="ability-use-btn"
                onClick={() => onActivate(ability.name)}
            >
                Use
            </button>
        </div>
    );
};

export default CombatAbilityItem;
