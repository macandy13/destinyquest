import React, { useState } from 'react';
import { Stats } from '../../types/stats';
import { Enemy } from '../../types/character';
import { ENEMIES } from '../../data/enemies';
import { getStatIcon } from '../../types/stats';
import NumberControl from '../Shared/NumberControl';
import DqCard from '../Shared/DqCard';
import './EnemySelector.css';

interface EnemySelectorProps {
    onSelect: (enemy: Enemy) => void;
}

const EnemySelector: React.FC<EnemySelectorProps> = ({ onSelect }) => {
    const [mode, setMode] = useState<'list' | 'custom'>('list');
    const [searchTerm, setSearchTerm] = useState('');

    // Custom Enemy State
    const [customEnemy, setCustomEnemy] = useState<Enemy>({
        type: 'enemy',
        name: 'Custom Enemy',
        stats: {
            speed: 2,
            brawn: 2,
            magic: 2,
            armour: 0,
            health: 20,
            maxHealth: 20,
        },
        bookRef: {
            book: 'Core',
            act: 1
        },
        abilities: []
    });

    const filteredEnemies = ENEMIES.filter(enemy => {
        const term = searchTerm.toLowerCase();
        return (
            enemy.name.toLowerCase().includes(term) ||
            (enemy.bookRef.section && enemy.bookRef.section.toString().includes(term))
        );
    });

    const handleCustomChange = (field: keyof Enemy | keyof Stats, value: string | number) => {
        if (field === 'name') {
            setCustomEnemy(prev => ({ ...prev, name: String(value) }));
        } else if (field === 'bookRef' || field === 'abilities' || field === 'preventHealing' || field === 'stats') {
            // Ignore or handle specific root fields if needed, simplified for name
        } else {
            // Assume stat
            setCustomEnemy(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    [field]: value,
                    maxHealth: field === 'health' ? Number(value) : prev.stats.maxHealth
                }
            }));
        }
    };

    const confirmCustomEnemy = () => {
        onSelect({
            ...customEnemy,
            stats: { ...customEnemy.stats, maxHealth: customEnemy.stats.health }
        });
    };

    const selectTrainingDummy = () => {
        onSelect({
            type: 'enemy',
            name: 'Training Dummy',
            stats: {
                speed: 2,
                brawn: 2,
                magic: 0,
                armour: 0,
                health: 20,
                maxHealth: 20,
            },
            bookRef: {
                book: '',
                act: 0
            },
            abilities: []
        });
    };

    return (
        <DqCard title="Select Opponent" className="enemy-selector-card">
            <div className='selector-header'>
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
                                            <div className="text-dim" style={{ fontSize: '0.8rem' }}>Act {enemy.bookRef.act}</div>
                                            {enemy.bookRef.section && <div className="text-dim" style={{ fontSize: '0.8rem' }}>📖 {enemy.bookRef.section}</div>}
                                        </div>
                                    </div>

                                    <div className="item-stats">
                                        {`${getStatIcon('speed')} ${enemy.stats.speed} `}
                                        {`${getStatIcon('brawn')} ${enemy.stats.brawn} `}
                                        {`${getStatIcon('magic')} ${enemy.stats.magic} `}
                                        {`${getStatIcon('armour')} ${enemy.stats.armour} `}
                                        {`${getStatIcon('health')} ${enemy.stats.health}`}
                                    </div>

                                    {enemy.abilities && enemy.abilities.length > 0 && (
                                        <div className="item-abilities-tag">
                                            {enemy.abilities.map((a: string) => `★ ${a}`).join(', ')}
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
                                    value={customEnemy.stats.speed}
                                    onChange={v => handleCustomChange('speed', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('brawn')} Brawn</span>
                                <NumberControl
                                    value={customEnemy.stats.brawn}
                                    onChange={v => handleCustomChange('brawn', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('magic')} Magic</span>
                                <NumberControl
                                    value={customEnemy.stats.magic}
                                    onChange={v => handleCustomChange('magic', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('armour')} Armour</span>
                                <NumberControl
                                    value={customEnemy.stats.armour}
                                    onChange={v => handleCustomChange('armour', v)}
                                    min={0}
                                />
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">{getStatIcon('health')} Health</span>
                                <NumberControl
                                    value={customEnemy.stats.health}
                                    onChange={v => handleCustomChange('health', v)}
                                    min={1}
                                />
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={confirmCustomEnemy}>Start Fight</button>
                        <button className="btn btn-secondary" onClick={selectTrainingDummy} style={{ marginTop: '10px' }}>Fight Dummy</button>
                    </div>
                )
            }
        </DqCard>
    );
};

export default EnemySelector;
