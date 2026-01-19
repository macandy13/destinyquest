import React from 'react';
import { CombatState } from '../../types/combatState';
import { BackpackItem } from '../../types/hero';
import CombatPhaseLayout from './CombatPhaseLayout';
import CombatStateEditor from './CombatStateEditor';
import { PrimaryButton, SecondaryButton } from '../Shared/Button';

interface CombatEndPhaseProps {
    combat: CombatState;
    onCombatFinish: (results: {
        health?: number,
        backpack: (BackpackItem | null)[]
    }) => void;
    restartCombat: () => void;
    onUpdateState: (state: CombatState) => void;
}

const CombatEndPhase: React.FC<CombatEndPhaseProps> = ({
    combat,
    onCombatFinish,
    restartCombat,
    onUpdateState
}) => {
    const [isEditing, setIsEditing] = React.useState(false);
    const isVictory = (combat.hero?.stats.health ?? 0) > 0;
    const enemyName = combat.enemy?.original?.name || 'Enemy';

    const healAndMoveOn = () => {
        onCombatFinish({
            health: combat.hero.original.stats.maxHealth,
            backpack: combat.backpack,
        });
    };

    const exitWithoutHealing = () => {
        onCombatFinish({
            backpack: combat.backpack
        });
    };

    return (
        <CombatPhaseLayout
            title={isVictory ? 'VICTORY!' : 'DEFEAT!'}
            description={
                isVictory
                    ? `You have triumphed over ${enemyName}!`
                    : `You have been defeated by ${enemyName}.`
            }
            combat={combat}
            actions={
                <>
                    <PrimaryButton onClick={healAndMoveOn}>
                        Restore Health & Move On
                    </PrimaryButton>
                    <SecondaryButton onClick={exitWithoutHealing}>
                        Exit without Healing
                    </SecondaryButton>
                    <SecondaryButton onClick={restartCombat}>
                        Retry
                    </SecondaryButton>
                    <SecondaryButton onClick={() => setIsEditing(true)}>
                        Fix State
                    </SecondaryButton>
                </>
            }
        >
            {isEditing && (
                <CombatStateEditor
                    combat={combat}
                    onApply={(state) => {
                        onUpdateState(state);
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            )}
        </CombatPhaseLayout>
    );
};

export default CombatEndPhase;
