import React from 'react';
import { CombatModifier } from '../../types/combat';
import './CombatModifiers.css';

interface CombatModifiersProps {
    modifiers: CombatModifier[];
}

const CombatModifiers: React.FC<CombatModifiersProps> = ({ modifiers }) => {
    if (modifiers.length === 0) return null;

    return (
        <div className="combat-modifiers">
            <h4 className="modifiers-title">Active Effects</h4>
            <div className="modifiers-list">
                {modifiers.map((mod, i) => (
                    <div key={i} className="modifier-item">
                        {mod.name}: +{mod.value} {mod.type.split('-')[0]} ({mod.duration} rounds left)
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CombatModifiers;
