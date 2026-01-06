import React from 'react';
import { CombatState } from '../../types/combatState';
import { calculateEffectiveStats } from '../../types/effect';
import CombatDice from './CombatDice';
import CombatPhaseLayout from './CombatPhaseLayout';

interface DamageRollPhaseProps {
    combat: CombatState;
    confirmDamageRoll: () => void;
    handleReroll: (dieIndex: number) => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const DamageRollPhase: React.FC<DamageRollPhaseProps> = ({
    combat,
    confirmDamageRoll,
    handleReroll,
    activateAbility,
    useBackpackItem
}) => {
    return (
        <CombatPhaseLayout
            title="Damage Roll"
            description={combat.winner === 'hero' ? 'Roll for Damage!' : 'Brace for Impact!'}
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                <button className="btn btn-primary btn-phase-action" onClick={confirmDamageRoll}>
                    Apply Damage
                </button>
            }
        >
            <div className="damage-dice-container">
                {combat.winner === 'hero' && (
                    <CombatDice
                        label="Damage"
                        values={combat.damage?.damageRolls} // Show result if exists
                        onDieClick={combat.rerollState?.target === 'damage' ? (i) => handleReroll(i) : undefined}
                        mode={combat.rerollState?.target === 'damage' ? 'select-die' : (combat.rerollState ? 'disabled' : 'normal')}
                        baseValue={Math.max(combat.hero.stats.brawn, combat.hero.stats.magic)}
                        modifierValue={
                            calculateEffectiveStats(
                                combat.hero.stats,
                                combat.hero.activeEffects
                            ).damageModifier ?? 0
                        }
                    />
                )}

                {combat.winner === 'enemy' && (
                    <CombatDice
                        label="Enemy Damage"
                        values={combat.damage?.damageRolls}
                        baseValue={Math.max(combat.enemy.stats.brawn, combat.enemy.stats.magic)}
                        mode={combat.rerollState ? 'disabled' : 'normal'}
                    />
                )}
            </div>
        </CombatPhaseLayout>
    );
};

export default DamageRollPhase;
