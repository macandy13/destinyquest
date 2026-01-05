import React from 'react';
import { HeroStats as HeroStatsType, Hero } from '../../types/hero';
import NumberControl from '../Shared/NumberControl';
import './HeroStats.css';
import { getStatIcon } from '../../types/stats';
import { getAbilityDefinition, getAbilityIcon } from '../../mechanics/abilityRegistry';

import DqCard from '../Shared/DqCard';

interface HeroStatsProps {
    hero: Hero;
    onHealthChange: (value: number) => void;
    onMoneyChange: (value: number) => void;
}

const STAT_CONFIG: Array<{ key: keyof HeroStatsType; label: string }> = [
    { key: 'speed', label: 'Speed' },
    { key: 'brawn', label: 'Brawn' },
    { key: 'magic', label: 'Magic' },
    { key: 'armour', label: 'Armour' },
];

const HeroStats: React.FC<HeroStatsProps> = ({ hero, onHealthChange, onMoneyChange }) => {
    const { stats, money } = hero;

    // Collect unique abilities from all equipment
    const activeAbilities = React.useMemo(() => {
        const abilities = new Map<string, number>();
        Object.values(hero.equipment).forEach(item => {
            if (item && item.abilities) {
                item.abilities.forEach(a => abilities.set(a, (abilities.get(a) || 0) + 1));
            }
        });
        return Array.from(abilities).sort((a, b) => a[1] - b[1]);
    }, [hero.equipment]);

    const headerContent = (
        <div className="hero-details">
            <div className="hero-name">{hero.name}</div>
            <div className="text-dim hero-path">{hero.path || 'Novice'}</div>
        </div>
    );

    return (
        <DqCard title="Hero Sheet" headerContent={headerContent}>
            <div className="hero-stats-container">
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
                {activeAbilities.length > 0 && (
                    <div className="abilities-section">
                        <h4>Active Abilities</h4>
                        <div className="abilities-list">
                            {activeAbilities.map(([abilityName, count]) => {
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
        </DqCard>
    );
};

export default HeroStats;
