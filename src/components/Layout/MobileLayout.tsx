import React, { ReactNode } from 'react';

interface MobileLayoutProps {
    children: ReactNode;
    className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className = '' }) => {
    return (
        <div className={`mobile-layout ${className}`} style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            maxWidth: '480px', // Restrict width on desktop for mobile simulation
            margin: '0 auto',
            backgroundColor: 'var(--dq-dark-grey)',
            borderLeft: '1px solid var(--dq-grey)',
            borderRight: '1px solid var(--dq-grey)',
            position: 'relative'
        }}>
            <div style={{ flex: 1, paddingBottom: '80px' /* Space for bottom nav */ }}>
                {children}
            </div>
        </div>
    );
};

export default MobileLayout;
