import React, { ReactNode } from 'react';
import './Modal.css';

interface ModalProps {
    title: string;
    children: ReactNode;
    onClose?: () => void;
    actions?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, actions }) => {
    return (
        <div className="dq-modal-overlay" onClick={onClose}>
            <div className="dq-modal-content" onClick={e => e.stopPropagation()}>
                {onClose && (
                    <button className="dq-modal-close" onClick={onClose}>
                        ✕
                    </button>
                )}
                <div className="dq-modal-header">
                    <div className="dq-modal-title">
                        {title}
                    </div>
                </div>
                <div className="dq-modal-body">
                    {children}
                </div>
                {actions && (
                    <div className="dq-modal-actions">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
