import React, { ReactNode } from 'react';
import { CombatState } from '../../types/combatState';
import CombatAbilitySelector from './CombatAbilitySelector';

interface CombatPhaseLayoutProps {
    title: string;
    description?: ReactNode;
    children?: ReactNode;
    combat: CombatState;
    onActivateAbility?: (abilityName: string) => void;
    onUseBackpackItem?: (itemIndex: number) => void;
    actions: ReactNode;
}

const CombatPhaseLayout: React.FC<CombatPhaseLayoutProps> = ({
    title,
    description = undefined,
    children,
    combat,
    onActivateAbility,
    onUseBackpackItem,
    actions
}) => {
    return (
        <div className="phase-container">
            <div className="phase-header">
                <h2 >{title}</h2>
                {description && <div className="phase-description">{description}</div>}
            </div>

            <div className="phase-main-content">
                {children}
            </div>

            {onActivateAbility && onUseBackpackItem && (
                <CombatAbilitySelector
                    combat={combat}
                    onActivateAbility={onActivateAbility}
                    onUseBackbackItem={onUseBackpackItem}
                />
            )}

            <div className="phase-actions">
                {actions}
            </div>
        </div>
    );
};

export default CombatPhaseLayout;
