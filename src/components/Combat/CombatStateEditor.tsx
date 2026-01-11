import React, { useState } from 'react';
import { CombatState } from '../../types/combatState';
import './CombatStateEditor.css';

interface CombatStateEditorProps {
    combat: CombatState;
    onApply: (state: CombatState) => void;
    onCancel: () => void;
}

const CombatStateEditor: React.FC<CombatStateEditorProps> = ({ combat, onApply, onCancel }) => {
    const [heroHealth, setHeroHealth] = useState(combat.hero.stats.health);
    const [enemyHealth, setEnemyHealth] = useState(combat.enemy.stats.health);

    const handleApply = () => {
        // Construct the partial update
        // We need to fetch the current combatants to keep other stats intact
        // or rely on React helper logic. 
        const newHero = {
            ...combat.hero,
            stats: { ...combat.hero.stats, health: heroHealth }
        };
        const newEnemy = {
            ...combat.enemy,
            stats: { ...combat.enemy.stats, health: enemyHealth }
        };
        onApply(heroHealth, enemyHealth);
    };

    return (
        <div className="combat-state-editor-overlay">
            <div className="combat-state-editor-modal">
                <h3>Fix Combat State</h3>
                <div className="editor-fields">
                    <div className="field-group">
                        <label>Hero Health</label>
                        <input
                            type="number"
                            value={heroHealth}
                            onChange={(e) => setHeroHealth(Number(e.target.value))}
                        />
                    </div>
                    <div className="field-group">
                        <label>Enemy Health</label>
                        <input
                            type="number"
                            value={enemyHealth}
                            onChange={(e) => setEnemyHealth(Number(e.target.value))}
                        />
                    </div>
                </div>
                <div className="editor-actions">
                    <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleApply}>Apply Changes</button>
                </div>
            </div>
        </div>
    );
};

export default CombatStateEditor;
