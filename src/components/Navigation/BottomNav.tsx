import React from 'react';
import './BottomNav.css';

interface BottomNavProps {
    activeTab: 'stats' | 'equipment' | 'combat';
    onTabChange: (tab: 'stats' | 'equipment' | 'combat') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="bottom-nav">
            <button
                onClick={() => onTabChange('stats')}
                className={`nav-button ${activeTab === 'stats' ? 'active' : ''}`}
            >
                <span className="nav-button-icon">📊</span>
                <span className="nav-button-label">Stats</span>
            </button>

            <div className="nav-divider"></div>

            <button
                onClick={() => onTabChange('equipment')}
                className={`nav-button ${activeTab === 'equipment' ? 'active' : ''}`}
            >
                <span className="nav-button-icon">⚔️</span>
                <span className="nav-button-label">Equip</span>
            </button>

            <div className="nav-divider"></div>

            <button
                onClick={() => onTabChange('combat')}
                className={`nav-button ${activeTab === 'combat' ? 'active' : ''}`}
            >
                <span className="nav-button-icon">💀</span>
                <span className="nav-button-label">Combat</span>
            </button>
        </nav>
    );
};

export default BottomNav;

