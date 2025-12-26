import React from 'react';
import { HeroStats as HeroStatsType, Hero } from '../../types/hero';
import NumberControl from '../Shared/NumberControl';
import './HeroStats.css';
import { getStatIcon } from '../../utils/statUtils';

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

    return (
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

            {/* Attributes - Read Only */}
            {STAT_CONFIG.map(({ key, label }) => (
                <div key={key} className="stat-row">
                    <span className="stat-label">
                        <span className="stat-icon">{getStatIcon(key)}</span> {label}
                    </span>
                    <div className="stat-controls">
                        <span className="stat-value">{stats[key]}</span>
                    </div>
                </div>
            ))}

            {/* Active Abilities Section */}
            {activeAbilities.length > 0 && (
                <div className="abilities-section">
                    <div className="abilities-header">Active Abilities</div>
                    <div className="abilities-list">
                        {activeAbilities.map(([ability, count]) => (
                            <span key={ability} className="ability-badge">★ {ability} {count > 1 ? `(x${count})` : ''}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroStats;
