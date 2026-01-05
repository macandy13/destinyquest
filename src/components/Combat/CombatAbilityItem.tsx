import React from 'react';
import { ActiveAbility } from '../../types/combatState';
import { getAbilityDefinition, getAbilityIcon } from '../../mechanics/abilityRegistry';
import './CombatAbilityItem.css';

interface CombatAbilityItemProps {
    ability: ActiveAbility;
    onClick: () => void;
}

const CombatAbilityItem: React.FC<CombatAbilityItemProps> = ({ ability, onClick }) => {
    const definition = getAbilityDefinition(ability.name);
    const icon = getAbilityIcon(definition);

    return (
        <button className="ability-item-compact" onClick={onClick}>
            <div className="ability-icon-large">{icon}</div>
            <div className="ability-name-compact">{ability.name}</div>
        </button>
    );
};

export default CombatAbilityItem;
