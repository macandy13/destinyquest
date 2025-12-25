import React from 'react';
import './BottomNav.css';

interface BottomNavProps {
    activeTab: 'hero' | 'combat';
    onTabChange: (tab: 'hero' | 'combat') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav className="bottom-nav">
            <button
                onClick={() => onTabChange('hero')}
                className={`nav-button ${activeTab === 'hero' ? 'active' : ''}`}
            >
                <span className="nav-button-icon">⚔️</span>
                <span className="nav-button-label">Hero</span>
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
