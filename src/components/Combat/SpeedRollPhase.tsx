import React from 'react';
import { CombatState } from '../../types/combatState';
import { calculateEffectiveStats } from '../../types/effect';
import CombatDice from './CombatDice';
import CombatPhaseLayout from './CombatPhaseLayout';

interface SpeedRollPhaseProps {
    combat: CombatState;
    commitSpeedAndRollDamageDice: () => void;
    confirmBonusDamage: () => void;
    handleReroll: (dieIndex: number) => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const SpeedRollPhase: React.FC<SpeedRollPhaseProps> = ({
    combat,
    commitSpeedAndRollDamageDice,
    confirmBonusDamage,
    handleReroll,
    activateAbility,
    useBackpackItem
}) => {
    const getInstruction = () => {
        switch (combat.winner) {
            case 'hero': return "Hero wins speed! Proceed to damage?";
            case 'enemy': return "Enemy wins speed! Brace for impact.";
            case null: return "Draw! Skip damage phase.";
            default: return "";
        }
    };

    return (
        <CombatPhaseLayout
            title="Speed Roll"
            description={getInstruction()}
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                combat.winner ?
                    <button className="btn btn-primary btn-phase-action" onClick={commitSpeedAndRollDamageDice}>
                        Roll Damage Dice
                    </button> :
                    <button className="btn btn-primary btn-phase-action" onClick={confirmBonusDamage}>
                        Apply Passive Abilities
                    </button>
            }
        >
            <div className="speed-rolls-container speed-rolls">
                <div className="hero-dice">
                    <CombatDice
                        label="Hero Speed"
                        values={combat.heroSpeedRolls}
                        onDieClick={combat.rerollState?.target === 'hero-speed' ? (i) => handleReroll(i) : undefined}
                        mode={combat.rerollState?.target === 'hero-speed' ? 'select-die' : (combat.rerollState ? 'disabled' : 'normal')}
                        baseValue={combat.hero.stats.speed}
                        modifierValue={
                            calculateEffectiveStats(
                                combat.hero.stats,
                                combat.hero.activeEffects
                            ).speed - combat.hero.stats.speed
                        }
                    />
                </div>
                <div className="enemy-dice">
                    <CombatDice
                        label="Enemy Speed"
                        values={combat.enemySpeedRolls}
                        baseValue={combat.enemy.stats.speed}
                        mode={combat.rerollState ? 'disabled' : 'normal'}
                    />
                </div>
            </div>
        </CombatPhaseLayout>
    );
}

export default SpeedRollPhase;
