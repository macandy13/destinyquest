import React, { useState } from 'react';
import { Enemy } from '../../types/combat';
import { ENEMIES } from '../../data/enemies';
import { getStatIcon } from '../../utils/statUtils';
import NumberControl from '../Shared/NumberControl';
import './EnemySelector.css';

interface EnemySelectorProps {
    onSelect: (enemy: Enemy) => void;
}

const EnemySelector: React.FC<EnemySelectorProps> = ({ onSelect }) => {
    const [mode, setMode] = useState<'list' | 'custom'>('list');
    const [searchTerm, setSearchTerm] = useState('');

    // Custom Enemy State
    const [customEnemy, setCustomEnemy] = useState<Enemy>({
        name: 'Custom Enemy',
        speed: 2,
        brawn: 2,
        magic: 2,
        armour: 0,
        health: 20,
        maxHealth: 20,
        abilities: []
    });

    const filteredEnemies = ENEMIES.filter(enemy => {
        const term = searchTerm.toLowerCase();
        return (
            enemy.name.toLowerCase().includes(term) ||
            (enemy.entry && enemy.entry.toLowerCase().includes(term))
        );
    });

    const handleCustomChange = (field: keyof Enemy, value: any) => {
        setCustomEnemy(prev => ({
            ...prev,
            [field]: value,
            maxHealth: field === 'health' ? Number(value) : prev.maxHealth // Sync maxHealth if health changes manually? Or just let user set both if needed, but for simplicity let's assume setting health sets max.
        }));
    };

    const confirmCustomEnemy = () => {
        onSelect({
            ...customEnemy,
            maxHealth: customEnemy.health // Ensure max health is consistent
        });
    };

    const selectTrainingDummy = () => {
        onSelect({
            name: 'Training Dummy',
            speed: 2,
            brawn: 2,
            magic: 0,
            armour: 0,
            health: 20,
            maxHealth: 20,
            abilities: []
        });
    };

    return (
        <div className="dq-card enemy-selector-card">
            <div className='selector-header'>
                <div className="header-row-top">
                    <h2 className="selector-title">Select Opponent</h2>
                </div>

                <div className="enemy-tabs">
                    <button
                        className={`tab-btn ${mode === 'list' ? 'active' : ''}`}
                        onClick={() => setMode('list')}
                    >
                        Bestiary
                    </button>
                    <button
                        className={`tab-btn ${mode === 'custom' ? 'active' : ''}`}
                        onClick={() => setMode('custom')}
                    >
                        Custom
                    </button>
                </div>

                {mode === 'list' && (
                    <div className="header-row-search">
                        <input
                            type="text"
                            className="dq-input"
                            placeholder="Search enemy..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            autoFocus
                        />
                        {searchTerm && (
                            <button
                                className="action-btn-secondary"
                                onClick={() => setSearchTerm('')}
                                title="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>)}
            </div>

            {
                mode === 'list' && (
                    <div className="items-list">
                        {filteredEnemies.length === 0 ? (
                            <div className="text-dim" style={{ textAlign: 'center', padding: '20px' }}>
                                No enemies found.
                            </div>
                        ) : (
                            filteredEnemies.map((enemy, idx) => (
                                <div key={idx} className="item-card enemy-card" onClick={() => onSelect(enemy)}>
                                    <div className="item-card-header">
                                        <div className="item-name">{enemy.name}</div>
                                        <div className="item-source">
                                            <div className="text-dim" style={{ fontSize: '0.8rem' }}>Act {enemy.act}</div>
                                            {enemy.entry && <div className="text-dim" style={{ fontSize: '0.8rem' }}>📖 {enemy.entry}</div>}
                                        </div>
                                    </div>

                                    <div className="item-stats">
                                        {`${getStatIcon('speed')} ${enemy.speed} `}
                                        {`${getStatIcon('brawn')} ${enemy.brawn} `}
                                        {`${getStatIcon('magic')} ${enemy.magic} `}
                                        {`${getStatIcon('armour')} ${enemy.armour} `}
                                        {`${getStatIcon('health')} ${enemy.health}`}
                                    </div>

                                    {enemy.abilities && enemy.abilities.length > 0 && (
                                        <div className="item-abilities-tag">
                                            {enemy.abilities.map(a => `★ ${a}`).join(', ')}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )
            }

            {
                mode === 'custom' && (
                    <div className="custom-enemy-form">
                        <div className="stats-grid">
                            <div className="stat-row">
                                <span className="stat-label">Name</span>
                                <input
                                    type="text"
                                    className="dq-input"
                                    value={customEnemy.name}
                                    onChange={e => handleCustomChange('name', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('speed')} Speed</span>
                                <NumberControl
                                    value={customEnemy.speed}
                                    onChange={v => handleCustomChange('speed', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('brawn')} Brawn</span>
                                <NumberControl
                                    value={customEnemy.brawn}
                                    onChange={v => handleCustomChange('brawn', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('magic')} Magic</span>
                                <NumberControl
                                    value={customEnemy.magic}
                                    onChange={v => handleCustomChange('magic', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('armour')} Armour</span>
                                <NumberControl
                                    value={customEnemy.armour}
                                    onChange={v => handleCustomChange('armour', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('health')} Health</span>
                                <NumberControl
                                    value={customEnemy.health}
                                    onChange={v => handleCustomChange('health', v)}
                                    min={1} // Health starts at 1
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={confirmCustomEnemy}>Start Fight</button>
                        <button className="btn btn-secondary" onClick={selectTrainingDummy} style={{ marginTop: '10px' }}>Fight Dummy</button>
                    </div>
                )
            }
        </div>
    );
};

export default EnemySelector;
