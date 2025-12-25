import React from 'react';
import { HeroStats as HeroStatsType, Hero } from '../../types/hero';
import './HeroStats.css';

interface HeroStatsProps {
    hero: Hero;
    onHealthChange: (value: number) => void;
}

const STAT_CONFIG: Array<{ key: keyof HeroStatsType; label: string; icon: string }> = [
    { key: 'speed', label: 'Speed', icon: '⚡' },
    { key: 'brawn', label: 'Brawn', icon: '💪' },
    { key: 'magic', label: 'Magic', icon: '✨' },
    { key: 'armour', label: 'Armour', icon: '🛡️' },
];

const HeroStats: React.FC<HeroStatsProps> = ({ hero, onHealthChange }) => {
    const { stats } = hero;

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
                    <span className="stat-icon">❤️</span> Health
                </span>
                <div className="stat-controls">
                    <button
                        className="stat-btn"
                        onClick={() => onHealthChange(stats.health - 1)}
                    >-</button>
                    <span className="stat-value">{stats.health}</span>
                    <span className="text-dim stat-max">/ {stats.maxHealth}</span>
                    <button
                        className="stat-btn"
                        onClick={() => onHealthChange(stats.health + 1)}
                    >+</button>
                </div>
            </div>

            {/* Attributes - Read Only */}
            {STAT_CONFIG.map(({ key, label, icon }) => (
                <div key={key} className="stat-row">
                    <span className="stat-label">
                        <span className="stat-icon">{icon}</span> {label}
                    </span>
                    <div className="stat-controls" style={{ justifyContent: 'center', width: '100%' }}>
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
