import React from 'react';
import { CombatState } from '../../types/combatState';
import { BackpackItem } from '../../types/hero';
import CombatPhaseLayout from './CombatPhaseLayout';

interface CombatEndPhaseProps {
    combat: CombatState;
    onCombatFinish: (results: { health: number, backpack: (BackpackItem | null)[] }) => void;
    restartCombat: () => void;
}

const CombatEndPhase: React.FC<CombatEndPhaseProps> = ({
    combat,
    onCombatFinish,
    restartCombat
}) => {
    const isVictory = (combat.hero?.stats.health ?? 0) > 0;
    const enemyName = combat.enemy?.original?.name || 'Enemy';

    const handleAccept = () => {
        if (!combat.hero) return;

        let newHealth = 0;
        if (combat.hero.stats.health <= 0) {
            newHealth = 0; // Defeat
        } else if (combat.enemy?.original?.preventHealing) {
            newHealth = combat.hero.stats.health; // Prevent Healing
        } else {
            newHealth = combat.hero.original.stats.maxHealth; // Full Restore
        }

        onCombatFinish({
            health: newHealth,
            backpack: combat.hero.original.backpack
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
                    <button className="btn btn-secondary" onClick={restartCombat}>
                        Retry
                    </button>
                    <button className="btn btn-primary" onClick={handleAccept}>
                        Accept
                    </button>
                </>
            }
        />
    );
};

export default CombatEndPhase;
