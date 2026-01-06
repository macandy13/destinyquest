import React from 'react';
import { CombatState } from '../../types/combatState';
import { BackpackItem } from '../../types/hero';
import CombatPhaseLayout from './CombatPhaseLayout';

interface CombatEndPhaseProps {
    combat: CombatState;
    onCombatFinish: (results: { health?: number, backpack: (BackpackItem | null)[] }) => void;
    restartCombat: () => void;
}

const CombatEndPhase: React.FC<CombatEndPhaseProps> = ({
    combat,
    onCombatFinish,
    restartCombat
}) => {
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
                    <button className="btn btn-primary" onClick={healAndMoveOn}>
                        Restore Health & Move On
                    </button>
                    <button className="btn btn-secondary" onClick={exitWithoutHealing}>
                        Exit without Healing
                    </button>
                    <button className="btn btn-secondary" onClick={restartCombat}>
                        Retry
                    </button>
                </>
            }
        />
    );
};

export default CombatEndPhase;
