import React from 'react';
import { HeroStats as HeroStatsType, Hero, HeroPath } from '../../types/hero';
import NumberControl from '../Shared/NumberControl';
import './HeroStats.css';
import { getStatIcon } from '../../types/stats';
import { getAbilityDefinition, getAbilityIcon } from '../../mechanics/abilityRegistry';
import { getCareersForPath } from '../../data/careers';

import DqCard from '../Shared/DqCard';
import Modal from '../Shared/Modal';

interface HeroStatsProps {
    hero: Hero;
    activeAbilities: string[];
    onHealthChange: (value: number) => void;
    onMoneyChange: (value: number) => void;
    onNameChange: (value: string) => void;
    onPathChange: (value: HeroPath, onItemsRemoved?: (items: string[]) => void) => void;
    onCareerChange: (value: string) => void;
}

const STAT_CONFIG: Array<{ key: keyof HeroStatsType; label: string }> = [
    { key: 'speed', label: 'Speed' },
    { key: 'brawn', label: 'Brawn' },
    { key: 'magic', label: 'Magic' },
    { key: 'armour', label: 'Armour' },
];

const HeroStats: React.FC<HeroStatsProps> = ({
    hero,
    activeAbilities,
    onHealthChange,
    onMoneyChange,
    onNameChange,
    onPathChange,
    onCareerChange
}) => {
    const { stats, money } = hero;
    const [warningMessage, setWarningMessage] = React.useState<string | null>(null);

    // Process abilities for display (count duplicates)
    const processedAbilities = React.useMemo(() => {
        const abilities = new Map<string, number>();
        activeAbilities.forEach(a => abilities.set(a, (abilities.get(a) || 0) + 1));
        return Array.from(abilities).sort((a, b) => a[0].localeCompare(b[0]));
    }, [activeAbilities]);

    const availableCareers = React.useMemo(() =>
        hero.path ? getCareersForPath(hero.path) : [], [hero.path]);

    const handlePathChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPath = e.target.value as HeroPath;
        onPathChange(newPath, (removedItems) => {
            setWarningMessage(`The following items were unequipped due to path requirements:\n\n${removedItems.join('\n')}`);
        });
    };

    return (
        <DqCard title="Hero Sheet" headerContent={null}>
            <div className="hero-stats-container">
                <div className="stat-row">
                    <span className="stat-label">Name</span>
                    <input
                        className="hero-input"
                        value={hero.name}
                        onChange={(e) => onNameChange(e.target.value)}
                        placeholder="Hero Name"
                    />
                </div>
                <div className="stat-row">
                    <span className="stat-label">Path</span>
                    <select
                        className="hero-input"
                        value={hero.path}
                        onChange={handlePathChange}
                    >
                        <option value="">No Path</option>
                        <option value="Warrior">Warrior (+15 HP)</option>
                        <option value="Mage">Mage (+10 HP)</option>
                        <option value="Rogue">Rogue (+5 HP)</option>
                    </select>
                </div>

                <div className="stat-row">
                    <span className="stat-label">Career</span>
                    <select
                        className="hero-input"
                        value={hero.career}
                        disabled={!hero.path}
                        onChange={(e) => onCareerChange(e.target.value)}
                    >
                        <option value="">Select Career...</option>
                        {availableCareers.map(c => (
                            <option key={c.name} value={c.name}>{c.name}</option>
                        ))}
                    </select>
                </div>

                {/* Health is special - Editable */}
                <div className="stat-row health">
                    <span className="stat-label">
                        <span className="stat-icon">{getStatIcon('health')}</span> Health
                    </span>
                    <div className="stat-controls">
                        <NumberControl
                            value={stats.health}
                            onChange={onHealthChange}
                            max={stats.maxHealth}
                            min={0}
                            label={`/ ${stats.maxHealth}`}
                        />
                    </div>
                </div>

                {/* Money - Editable */}
                <div className="stat-row money">
                    <span className="stat-label">
                        <span className="stat-icon">{getStatIcon('money')}</span> Money
                    </span>
                    <div className="stat-controls">
                        <NumberControl
                            value={money}
                            onChange={onMoneyChange}
                            min={0}
                        />
                    </div>
                </div>

                {/* Attributes - Grid Layout */}
                <div className="attributes-grid">
                    {STAT_CONFIG.map(({ key, label }) => (
                        <div key={key} className="attribute-square">
                            <span className="stat-icon">{getStatIcon(key)}</span>
                            <div className="attribute-row">
                                <span className="stat-label">{label}</span>
                                <span className="stat-value-large">{stats[key]}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Active Abilities Section */}
                {processedAbilities.length > 0 && (
                    <div className="abilities-section">
                        <h4>Active Abilities</h4>
                        <div className="abilities-list">
                            {processedAbilities.map(([abilityName, count]) => {
                                const def = getAbilityDefinition(abilityName);
                                const icon = getAbilityIcon(def);
                                return (
                                    <div key={abilityName} className="ability-row">
                                        <div className="ability-icon-wrapper">
                                            <span className="ability-icon">{icon}</span>
                                        </div>
                                        <div className="ability-details">
                                            <div className="ability-header-row">
                                                <span className="ability-name">{abilityName}</span>
                                                {count > 1 && <span className="ability-count">x{count}</span>}
                                            </div>
                                            {def?.description && (
                                                <div className="ability-description">{def.description}</div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            {warningMessage && (
                <Modal
                    title="Equipment Removed"
                    onClose={() => setWarningMessage(null)}
                    actions={
                        <button className="btn btn-primary" onClick={() => setWarningMessage(null)}>
                            OK
                        </button>
                    }
                >
                    <div style={{ whiteSpace: 'pre-line' }}>{warningMessage}</div>
                </Modal>
            )}
        </DqCard >
    );
};

export default HeroStats;
