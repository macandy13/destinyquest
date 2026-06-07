import React, { useState } from 'react';
import { Stats } from '../../types/stats';
import { Enemy } from '../../types/character';
import { BookRef } from '../../types/bookRef';
import { ENEMIES } from '../../data/enemies';
import { getStatIcon } from '../../types/stats';
import NumberControl from '../Shared/NumberControl';
import DqCard from '../Shared/DqCard';
import './EnemySelector.css';

// Special Abilities Registry
import {
    ABILITY_REGISTRY,
    getAbilityDefinition,
    toCanonicalName
} from '../../mechanics/abilityRegistry';
import '../../mechanics/allAbilities';

// Helper to get ability display name
const getAbilityDisplayName = (abName: string): string => {
    const def = getAbilityDefinition(abName);
    return def ? def.name : abName;
};

// Helper to get ability description
const getAbilityDescriptionText = (abName: string): string => {
    const def = getAbilityDefinition(abName);
    return def ? def.description : '';
};

interface EnemySelectorProps {
    onSelect: (enemy: Enemy) => void;
    filterFn?: (bookRef: BookRef) => boolean;
}

const EnemySelector: React.FC<EnemySelectorProps> = ({
    onSelect,
    filterFn
}) => {
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

    const [offensiveMode, setOffensiveMode] = useState<'brawn' | 'magic'>('brawn');
    const [abilitySearch, setAbilitySearch] = useState('');
    const [showAbilityDropdown, setShowAbilityDropdown] = useState(false);

    const bookFiltered = filterFn
        ? ENEMIES.filter(e => filterFn(e.bookRef))
        : ENEMIES;

    const filteredEnemies = bookFiltered.filter(
        enemy => {
            const term = searchTerm.toLowerCase();
            return (
                enemy.name
                    .toLowerCase()
                    .includes(term) ||
                (enemy.bookRef.section &&
                    enemy.bookRef.section
                        .toString()
                        .includes(term))
            );
        }
    );

    const handleCustomChange = (
        field: keyof Enemy | keyof Stats,
        value: string | number
    ) => {
        if (field === 'name') {
            setCustomEnemy(prev => ({ ...prev, name: String(value) }));
        } else if (
            field === 'bookRef' ||
            field === 'abilities' ||
            field === 'preventHealing' ||
            field === 'stats'
        ) {
            // Ignore or handle specific root fields if needed
        } else {
            // Assume stat
            setCustomEnemy(prev => ({
                ...prev,
                stats: {
                    ...prev.stats,
                    [field]: value,
                    maxHealth: field === 'health'
                        ? Number(value)
                        : prev.stats.maxHealth
                }
            }));
        }
    };

    const handleOffensiveModeChange = (mode: 'brawn' | 'magic') => {
        setOffensiveMode(mode);
    };

    const handleOffensiveValueChange = (v: number) => {
        setCustomEnemy(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                brawn: offensiveMode === 'brawn' ? v : prev.stats.brawn,
                magic: offensiveMode === 'magic' ? v : prev.stats.magic,
            }
        }));
    };

    const handleAddAbility = (name: string) => {
        setCustomEnemy(prev => ({
            ...prev,
            abilities: [...(prev.abilities || []), name]
        }));
        setAbilitySearch('');
        setShowAbilityDropdown(false);
    };

    const handleRemoveAbility = (name: string) => {
        setCustomEnemy(prev => ({
            ...prev,
            abilities: (prev.abilities || []).filter(a => a !== name)
        }));
    };

    const confirmCustomEnemy = () => {
        onSelect({
            ...customEnemy,
            stats: {
                ...customEnemy.stats,
                brawn: offensiveMode === 'brawn' ? customEnemy.stats.brawn : 0,
                magic: offensiveMode === 'magic' ? customEnemy.stats.magic : 0,
                maxHealth: customEnemy.stats.health
            }
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

    // Filter available abilities for searchable list
    const availableSpecialAbilities = Object.values(ABILITY_REGISTRY)
        .filter(ab => {
            const canonicalAdded = (customEnemy.abilities || [])
                .map(toCanonicalName);
            if (canonicalAdded.includes(toCanonicalName(ab.name))) {
                return false;
            }
            return ab.name.toLowerCase()
                .includes(abilitySearch.toLowerCase());
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <DqCard title="Select Opponent" className="enemy-selector-card">
            <div className='selector-header'>
                <div className="enemy-tabs">
                    <button
                        className={`tab-btn ${
                            mode === 'list' ? 'active' : ''
                        }`}
                        onClick={() => setMode('list')}
                    >
                        Bestiary
                    </button>
                    <button
                        className={`tab-btn ${
                            mode === 'custom' ? 'active' : ''
                        }`}
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
                    </div>
                )}
            </div>

            {mode === 'list' && (
                <div className="items-list">
                    {filteredEnemies.length === 0 ? (
                        <div className="text-dim empty-list-message">
                            No enemies found.
                        </div>
                    ) : (
                        filteredEnemies.map((enemy, idx) => (
                            <div
                                key={idx}
                                className="item-card enemy-card"
                                onClick={() => onSelect(enemy)}
                            >
                                <div className="item-card-header">
                                    <div className="item-name">
                                        {enemy.name}
                                    </div>
                                    <div className="item-source">
                                        <div
                                            className="text-dim"
                                            style={{ fontSize: '0.8rem' }}
                                        >
                                            Act {enemy.bookRef.act}
                                        </div>
                                        {enemy.bookRef.section && (
                                            <div
                                                className="text-dim"
                                                style={{ fontSize: '0.8rem' }}
                                            >
                                                📖 {enemy.bookRef.section}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="item-stats">
                                    {`${getStatIcon('speed')} ${
                                        enemy.stats.speed
                                    } `}
                                    {`${getStatIcon('brawn')} ${
                                        enemy.stats.brawn
                                    } `}
                                    {`${getStatIcon('magic')} ${
                                        enemy.stats.magic
                                    } `}
                                    {`${getStatIcon('armour')} ${
                                        enemy.stats.armour
                                    } `}
                                    {`${getStatIcon('health')} ${
                                        enemy.stats.health
                                    }`}
                                </div>

                                {enemy.abilities &&
                                    enemy.abilities.length > 0 && (
                                        <div className="item-abilities-tag">
                                            {enemy.abilities
                                                .map((a: string) => `★ ${a}`)
                                                .join(', ')}
                                        </div>
                                    )}
                            </div>
                        ))
                    )}
                </div>
            )}

            {mode === 'custom' && (
                <div className="custom-enemy-form">
                    <div className="stats-grid">
                        <div className="stat-row">
                            <span className="stat-label">Name</span>
                            <input
                                type="text"
                                className="enemy-name-input"
                                value={customEnemy.name}
                                onChange={e =>
                                    handleCustomChange('name', e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-row">
                            <span className="stat-label">
                                {getStatIcon('speed')} Speed
                            </span>
                            <NumberControl
                                value={customEnemy.stats.speed}
                                onChange={v => handleCustomChange('speed', v)}
                                min={0}
                            />
                        </div>

                        <div className="stat-row">
                            <span
                                className="stat-label clickable-toggle"
                                onClick={() =>
                                    handleOffensiveModeChange(
                                        offensiveMode === 'brawn'
                                            ? 'magic'
                                            : 'brawn'
                                    )
                                }
                                title="Click to toggle offensive stat mode"
                            >
                                {offensiveMode === 'brawn' ? '💪 Brawn' : '✨ Magic'}
                            </span>
                            <NumberControl
                                value={
                                    offensiveMode === 'brawn'
                                        ? customEnemy.stats.brawn
                                        : customEnemy.stats.magic
                                }
                                onChange={handleOffensiveValueChange}
                                min={0}
                            />
                        </div>

                        <div className="stat-row">
                            <span className="stat-label">
                                {getStatIcon('armour')} Armour
                            </span>
                            <NumberControl
                                value={customEnemy.stats.armour}
                                onChange={v => handleCustomChange('armour', v)}
                                min={0}
                            />
                        </div>
                        <div className="stat-row">
                            <span className="stat-label">
                                {getStatIcon('health')} Health
                            </span>
                            <NumberControl
                                value={customEnemy.stats.health}
                                onChange={v => handleCustomChange('health', v)}
                                min={1}
                            />
                        </div>
                    </div>

                    {/* Special Abilities Multi-Select */}
                    <div className="abilities-section">
                        <span className="stat-label">Special Abilities</span>
                        <div className="ability-selector-wrapper">
                            <input
                                type="text"
                                className="dq-input ability-search-input"
                                placeholder="Search & add special ability..."
                                value={abilitySearch}
                                onChange={e => {
                                    setAbilitySearch(e.target.value);
                                    setShowAbilityDropdown(true);
                                }}
                                onFocus={() => setShowAbilityDropdown(true)}
                                onBlur={() => {
                                    // Delay to allow clicking dropdown items
                                    setTimeout(() => {
                                        setShowAbilityDropdown(false);
                                    }, 200);
                                }}
                            />
                            {showAbilityDropdown && abilitySearch && (
                                <div className="ability-dropdown">
                                    {availableSpecialAbilities.length === 0 ? (
                                        <div className="dropdown-item empty">
                                            No abilities found
                                        </div>
                                    ) : (
                                        availableSpecialAbilities.map(ab => (
                                            <div
                                                key={ab.name}
                                                className="dropdown-item"
                                                onClick={() =>
                                                    handleAddAbility(ab.name)
                                                }
                                            >
                                                <div className="dropdown-item-name">
                                                    {ab.name}
                                                </div>
                                                <div className="dropdown-item-desc">
                                                    {ab.description}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {customEnemy.abilities &&
                            customEnemy.abilities.length > 0 && (
                                <div className="selected-abilities-list">
                                    {customEnemy.abilities.map(abName => {
                                        const displayName = getAbilityDisplayName(
                                            abName
                                        );
                                        const description = getAbilityDescriptionText(
                                            abName
                                        );
                                        return (
                                            <div
                                                key={abName}
                                                className="selected-ability-row"
                                            >
                                                <div className="ability-info">
                                                    <span className="ability-title">
                                                        ★ {displayName}
                                                    </span>
                                                    {description && (
                                                        <span className="ability-desc">
                                                            {description}
                                                        </span>
                                                    )}
                                                </div>
                                                <button
                                                    type="button"
                                                    className="remove-ability-btn"
                                                    onClick={() =>
                                                        handleRemoveAbility(
                                                            abName
                                                        )
                                                    }
                                                    title="Remove ability"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={confirmCustomEnemy}
                    >
                        Start Fight
                    </button>
                    <button
                        className="btn btn-secondary dummy-btn"
                        onClick={selectTrainingDummy}
                    >
                        Fight Dummy
                    </button>
                </div>
            )}
        </DqCard>
    );
};

export default EnemySelector;
