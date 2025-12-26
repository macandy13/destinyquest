import React from 'react';
import { StatsModification } from '../../types/stats';
import './CombatModifiers.css';

// Helper to format modification text
const formatMod = (mod: StatsModification) => {
    const parts = [];
    if (mod.stats.speed) parts.push(`Speed ${mod.stats.speed > 0 ? '+' : ''}${mod.stats.speed}`);
    if (mod.stats.damageModifier) parts.push(`Dmg ${mod.stats.damageModifier > 0 ? '+' : ''}${mod.stats.damageModifier}`);
    if (mod.stats.armour) parts.push(`Armour ${mod.stats.armour > 0 ? '+' : ''}${mod.stats.armour}`);
    // Add others as needed
    return parts.join(', ');
}

interface CombatModifiersProps {
    modifications: { modification: StatsModification, duration: number, id: string }[];
}

const CombatModifiers: React.FC<CombatModifiersProps> = ({ modifications }) => {
    if (!modifications || modifications.length === 0) return null;

    return (
        <div className="combat-modifiers">
            <h4 className="modifiers-title">Active Effects</h4>
            <div className="modifiers-list">
                {modifications.map((item, i) => (
                    <div key={item.id || i} className="modifier-item">
                        {item.modification.source}: {formatMod(item.modification)} ({item.duration} rounds left)
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CombatModifiers;
