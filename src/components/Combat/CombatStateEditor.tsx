import React, { useState } from 'react';
import { CombatState } from '../../types/combatState';
import './CombatStateEditor.css';

interface CombatStateEditorProps {
    combat: CombatState;
    onApply: (state: CombatState) => void;
    onCancel: () => void;
}

const CombatStateEditor: React.FC<CombatStateEditorProps> = ({ combat, onApply, onCancel }) => {
    const [state, setState] = useState(combat);

    return (
        <div className="combat-state-editor-overlay">
            <div className="combat-state-editor-modal">
                <h3>Fix Combat State</h3>
                <div className="editor-fields">
                    <div className="field-group">
                        <label>Hero Health</label>
                        <input
                            type="number"
                            value={state.hero.stats.health}
                            onChange={(e) => setState({ ...state, hero: { ...state.hero, stats: { ...state.hero.stats, health: Number(e.target.value) } } })}
                        />
                    </div>
                    <div className="field-group">
                        <label>Enemy Health</label>
                        <input
                            type="number"
                            value={state.enemy.stats.health}
                            onChange={(e) => setState({ ...state, enemy: { ...state.enemy, stats: { ...state.enemy.stats, health: Number(e.target.value) } } })}
                        />
                    </div>
                </div>
                <div className="editor-actions">
                    <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="btn btn-primary" onClick={() => onApply(state)}>Apply Changes</button>
                </div>
            </div>
        </div>
    );
};

export default CombatStateEditor;
