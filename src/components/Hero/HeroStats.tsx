import React from 'react';
import { HeroStats as HeroStatsType } from '../../types/hero';
import './HeroStats.css';

interface HeroStatsProps {
    stats: HeroStatsType;
    onUpdate: (stat: keyof HeroStatsType, value: number) => void;
}

const STAT_CONFIG: Array<{ key: keyof HeroStatsType; label: string; icon: string }> = [
    { key: 'speed', label: 'Speed', icon: '⚡' },
    { key: 'brawn', label: 'Brawn', icon: '💪' },
    { key: 'magic', label: 'Magic', icon: '✨' },
    { key: 'armour', label: 'Armour', icon: '🛡️' },
];

const HeroStats: React.FC<HeroStatsProps> = ({ stats, onUpdate }) => {
    return (
        <div className="hero-stats-container">
            {/* Health is special */}
            <div className="stat-row health">
                <span className="stat-label">
                    <span className="stat-icon">❤️</span> Health
                </span>
                <div className="stat-controls">
                    <button
                        className="stat-btn"
                        onClick={() => onUpdate('health', stats.health - 1)}
                    >-</button>
                    <span className="stat-value">{stats.health}</span>
                    <span className="text-dim stat-max">/ {stats.maxHealth}</span>
                    <button
                        className="stat-btn"
                        onClick={() => onUpdate('health', stats.health + 1)}
                    >+</button>
                </div>
            </div>

            {STAT_CONFIG.map(({ key, label, icon }) => (
                <div key={key} className="stat-row">
                    <span className="stat-label">
                        <span className="stat-icon">{icon}</span> {label}
                    </span>
                    <div className="stat-controls">
                        <button
                            className="stat-btn"
                            onClick={() => onUpdate(key, stats[key] - 1)}
                        >-</button>
                        <span className="stat-value">{stats[key]}</span>
                        <button
                            className="stat-btn"
                            onClick={() => onUpdate(key, stats[key] + 1)}
                        >+</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HeroStats;
