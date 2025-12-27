import React, { ReactNode } from 'react';
import './DqCard.css';

interface DqCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    children: ReactNode;
    className?: string;
    headerContent?: ReactNode;
    onClose?: () => void;
}

const DqCard: React.FC<DqCardProps> = ({ title, children, className = '', headerContent, onClose, ...props }) => {
    return (
        <div className={`dq-card ${className}`} {...props}>
            {(title || headerContent || onClose) && (
                <div className="hero-header">
                    {title && <h3 className="dq-card-title">{title}</h3>}
                    {headerContent}
                    {onClose && (
                        <button className="close-btn" onClick={onClose} aria-label="Close">
                            &times;
                        </button>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default DqCard;
