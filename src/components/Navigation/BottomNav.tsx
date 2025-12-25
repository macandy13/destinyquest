import React from 'react';

interface BottomNavProps {
    activeTab: 'hero' | 'combat';
    onTabChange: (tab: 'hero' | 'combat') => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)', // Center relative to viewport
            width: '100%',
            maxWidth: '480px', // Match layout
            backgroundColor: 'var(--dq-black)',
            borderTop: '1px solid var(--dq-gold-dim)',
            display: 'flex',
            justifyContent: 'space-around',
            padding: 'var(--spacing-sm) 0',
            zIndex: 100
        }}>
            <button
                onClick={() => onTabChange('hero')}
                style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'hero' ? 'var(--dq-gold)' : 'var(--dq-light-grey)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                <span style={{ fontSize: '20px' }}>⚔️</span>
                <span style={{ fontSize: '12px', fontWeight: activeTab === 'hero' ? 'bold' : 'normal' }}>Hero</span>
            </button>

            <div style={{ width: '1px', backgroundColor: 'var(--dq-grey)' }}></div>

            <button
                onClick={() => onTabChange('combat')}
                style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === 'combat' ? 'var(--dq-gold)' : 'var(--dq-light-grey)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px'
                }}
            >
                <span style={{ fontSize: '20px' }}>💀</span>
                <span style={{ fontSize: '12px', fontWeight: activeTab === 'combat' ? 'bold' : 'normal' }}>Combat</span>
            </button>
        </nav>
    );
};

export default BottomNav;
