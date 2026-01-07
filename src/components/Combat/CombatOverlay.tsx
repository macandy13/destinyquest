import React, { ReactNode } from 'react';
import './CombatOverlay.css';

interface CombatOverlayProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode;
    onClose?: () => void;
}

const CombatOverlayRoot: React.FC<CombatOverlayProps> = ({ title, icon, children, onClose }) => {
    return (
        <div className="ability-modal-overlay" onClick={onClose}>
            <div className="ability-modal-content" onClick={e => e.stopPropagation()}>
                {onClose && (
                    <button className="ability-modal-close close-btn" onClick={onClose}>
                        ✕
                    </button>
                )}
                <div className="ability-modal-header">
                    {icon && <div className="ability-icon-huge">{icon}</div>}
                    <div className="ability-modal-title">
                        <h3>{title}</h3>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
};

const Content: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`ability-modal-body ${className || ''}`}>
        {children}
    </div>
);

const Actions: React.FC<{ children: ReactNode }> = ({ children }) => (
    <div className="ability-modal-actions">
        {children}
    </div>
);

const CombatOverlay = Object.assign(CombatOverlayRoot, {
    Content,
    Actions
});

export default CombatOverlay;
