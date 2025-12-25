import React, { ReactNode } from 'react';
import './MobileLayout.css';

interface MobileLayoutProps {
    children: ReactNode;
    className?: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, className = '' }) => {
    return (
        <div className={`mobile-layout ${className}`}>
            <div className="mobile-layout-content">
                {children}
            </div>
        </div>
    );
};

export default MobileLayout;
