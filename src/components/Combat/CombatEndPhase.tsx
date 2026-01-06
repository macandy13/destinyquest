import React from 'react';
import { CombatState } from '../../types/combatState';
import { BackpackItem } from '../../types/hero';
import CombatResultDialog from './CombatResultDialog';
import CombatPhaseLayout from './CombatPhaseLayout';

interface CombatEndPhaseProps {
    combat: CombatState;
    endCombat: () => void;
    onCombatFinish: (results: { health: number, backpack: (BackpackItem | null)[] }) => void;
    restartCombat: () => void;
}

const CombatEndPhase: React.FC<CombatEndPhaseProps> = ({
    combat,
    endCombat,
    onCombatFinish,
    restartCombat
}) => {
    return (
        <CombatPhaseLayout
            title="Combat Finished"
            description={combat.hero?.stats.health! <= 0 ? 'Defeat!' : 'Victory!'}
            combat={combat}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={endCombat}>
                    End Combat
                </button>
            }
        >
            <CombatResultDialog
                result={combat.hero?.stats.health! <= 0 ? 'defeat' : 'victory'}
                onAccept={() => {
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
                }}
                onRetry={() => {
                    restartCombat();
                }}
            />
        </CombatPhaseLayout>
    );
};

export default CombatEndPhase;
