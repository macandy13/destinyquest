import React, { ReactNode } from 'react';
import './DqCard.css';

interface DqCardProps {
    title?: string;
    children: ReactNode;
    className?: string;
    headerContent?: ReactNode;
}

const DqCard: React.FC<DqCardProps> = ({ title, children, className = '', headerContent }) => {
    return (
        <div className={`dq-card ${className}`}>
            {(title || headerContent) && (
                <div className="hero-header">
                    {title && <h2 className="dq-card-title">{title}</h2>}
                    {headerContent}
                </div>
            )}
            {children}
        </div>
    );
};

export default DqCard;
