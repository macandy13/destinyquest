import React, { useState } from 'react';
import { CombatState, Combatant } from '../../types/combatState';
import { CharacterType } from '../../types/character';
import NumberControl from '../Shared/NumberControl';
import ActiveEffectIcon from './ActiveEffectIcon';
import DqCard from '../Shared/DqCard';
import { getStatIcon } from '../../types/stats';
import './CombatStateEditor.css';
import { PrimaryButton, SecondaryButton } from '../Shared/Button';

interface CombatStateEditorProps {
    combat: CombatState;
    onApply: (state: CombatState) => void;
    onCancel: () => void;
}

interface CombatantEditorProps {
    combatant: Combatant;
    type: CharacterType;
    onHealthChange: (health: number) => void;
    onRemoveEffect: (index: number) => void;
}

const CombatantEditor: React.FC<CombatantEditorProps> = ({
    combatant,
    onHealthChange,
    onRemoveEffect
}) => {
    return (
        <div className="combatant-editor-content">
            <div className="stat-row health">
                <span className="stat-label">
                    <span className="stat-icon">{getStatIcon('health')}</span>
                    Health
                </span>
                <div className="stat-controls">
                    <NumberControl
                        value={combatant.stats.health}
                        onChange={onHealthChange}
                        min={0}
                        max={combatant.stats.maxHealth}
                        label={`/ ${combatant.stats.maxHealth}`}
                    />
                </div>
            </div>

            <div className="editor-subsection">
                <h4>Active Effects</h4>
                {combatant.activeEffects.length === 0 ? (
                    <p className="empty-state">No active effects</p>
                ) : (
                    <div className="effect-grid">
                        {combatant.activeEffects.map((effect, idx) => (
                            <ActiveEffectIcon
                                key={idx}
                                effect={effect}
                                onRemove={() => onRemoveEffect(idx)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const CombatStateEditor: React.FC<CombatStateEditorProps> = ({
    combat,
    onApply,
    onCancel
}) => {
    const [state, setState] = useState(combat);
    const [activeTab, setActiveTab] = useState<CharacterType>('hero');

    const updateHeroHealth = (health: number) => {
        setState({
            ...state,
            hero: {
                ...state.hero,
                stats: { ...state.hero.stats, health }
            }
        });
    };

    const updateEnemyHealth = (health: number) => {
        setState({
            ...state,
            enemy: {
                ...state.enemy,
                stats: { ...state.enemy.stats, health }
            }
        });
    };

    const removeHeroEffect = (index: number) => {
        setState({
            ...state,
            hero: {
                ...state.hero,
                activeEffects: state.hero.activeEffects.filter(
                    (_, i) => i !== index
                )
            }
        });
    };

    const removeEnemyEffect = (index: number) => {
        setState({
            ...state,
            enemy: {
                ...state.enemy,
                activeEffects: state.enemy.activeEffects.filter(
                    (_, i) => i !== index
                )
            }
        });
    };

    return (
        <DqCard
            title="Combat State Editor"
            className="combat-state-editor-card"
            onClose={onCancel}
        >
            <div className="selector-header">
                <div className="editor-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'hero' ? 'active' : ''}`}
                        onClick={() => setActiveTab('hero')}
                    >
                        🦸 {state.hero.name}
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'enemy' ? 'active' : ''}`}
                        onClick={() => setActiveTab('enemy')}
                    >
                        👹 {state.enemy.name}
                    </button>
                </div>
            </div>

            <div className="editor-tab-content">
                {activeTab === 'hero' ? (
                    <CombatantEditor
                        combatant={state.hero}
                        type="hero"
                        onHealthChange={updateHeroHealth}
                        onRemoveEffect={removeHeroEffect}
                    />
                ) : (
                    <CombatantEditor
                        combatant={state.enemy}
                        type="enemy"
                        onHealthChange={updateEnemyHealth}
                        onRemoveEffect={removeEnemyEffect}
                    />
                )}
            </div>

            <div className="editor-actions">
                <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
                <PrimaryButton onClick={() => onApply(state)}>Apply Changes</PrimaryButton>
            </div>
        </DqCard>
    );
};

export default CombatStateEditor;
