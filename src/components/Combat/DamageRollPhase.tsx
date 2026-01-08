import React from 'react';
import { CombatState, InteractionRequest, InteractionResponse } from '../../types/combatState';
import CombatDice from './CombatDice';
import CombatPhaseLayout from './CombatPhaseLayout';
import { PrimaryButton } from '../Shared/Button';
import { calculateDamageBreakdown } from '../../mechanics/CombatEngine';
import { getStatIcon } from '../../types/stats';
import './DamageRollPhase.css';

interface DamageRollPhaseProps {
    combat: CombatState;
    confirmDamageRoll: () => void;
    currentInteraction?: InteractionRequest | null;
    resolveInteraction: (data: InteractionResponse) => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const DamageRollPhase: React.FC<DamageRollPhaseProps> = ({
    combat,
    confirmDamageRoll,
    currentInteraction,
    resolveInteraction,
    activateAbility,
    useBackpackItem
}) => {
    const [selectedDice, setSelectedDice] = React.useState<number[]>([]);

    // Hero rolls damage
    const canInteractHero = currentInteraction?.target === 'hero' && combat.winner === 'hero';

    // Enemy rolls damage
    const canInteractEnemy = currentInteraction?.target === 'enemy' && combat.winner === 'enemy';

    const breakdown = React.useMemo(() => {
        return calculateDamageBreakdown(combat);
    }, [combat]);

    const onDieClick = (index: number) => {
        const count = currentInteraction?.count ?? 1;
        if (count > 1) {
            // Toggle selection
            if (selectedDice.includes(index)) {
                setSelectedDice(selectedDice.filter(i => i !== index));
            } else if (selectedDice.length < count) {
                setSelectedDice([...selectedDice, index]);
            }
        } else {
            // Immediate resolve for single die
            resolveInteraction({
                request: currentInteraction!,
                selectedIndexes: [index]
            });
        }
    };

    const confirmDiceSelection = () => {
        if (!currentInteraction) return;
        resolveInteraction({
            request: currentInteraction,
            selectedIndexes: selectedDice
        });
        setSelectedDice([]);
    };

    return (
        <CombatPhaseLayout
            title="Damage Roll"
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                currentInteraction ? (
                    (currentInteraction?.count ?? 1) > 1 && (
                        <PrimaryButton
                            className="btn-phase-action"
                            onClick={confirmDiceSelection}
                            disabled={selectedDice.length !== (currentInteraction?.count ?? 1)}
                        >
                            Confirm Selection ({selectedDice.length}/{currentInteraction?.count})
                        </PrimaryButton>
                    )
                ) : (
                    <PrimaryButton className="btn-phase-action" onClick={confirmDamageRoll}>
                        Apply Damage
                    </PrimaryButton>
                )
            }
        >
            <div className="damage-rolls-container">
                <div className="damage-dice-container">
                    {combat.winner === 'hero' && (
                        <CombatDice
                            label={combat.winner === 'hero' ? 'Hero' : 'Enemy'}
                            values={combat.damage?.damageRolls}
                            onDieClick={canInteractHero ? onDieClick : undefined}
                            mode={canInteractHero ? 'select-die' : (currentInteraction ? 'disabled' : 'normal')}
                            selectedIndices={selectedDice}
                        />
                    )}
                    {combat.winner === 'enemy' && (
                        <CombatDice
                            label="Enemy Damage"
                            values={combat.damage?.damageRolls}
                            onDieClick={canInteractEnemy ? onDieClick : undefined}
                            mode={canInteractEnemy ? 'select-die' : (currentInteraction ? 'disabled' : 'normal')}
                            selectedIndices={selectedDice}
                        />
                    )}

                    <div className="damage-breakdown-container">
                        {breakdown && (
                            <table className="dice-breakdown-table">
                                <thead>
                                    <tr>
                                        <th title="Roll">{getStatIcon('die')}</th>
                                        {!!breakdown.skill && <th title="Base Stat">{breakdown.skillName === 'brawn' ? getStatIcon('brawn') : getStatIcon('magic')}</th>}
                                        {!!breakdown.modifiersTotal && <th title="Modifiers">{getStatIcon('modifier')}</th>}
                                        {!!breakdown.armor && <th title="Armour">{getStatIcon('armour')}</th>}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{breakdown.diceTotal}</td>
                                        {!!breakdown.skill && <td>{breakdown.skill}</td>}
                                        {!!breakdown.modifiersTotal && <td>{breakdown.modifiersTotal > 0 ? `+${breakdown.modifiersTotal}` : breakdown.modifiersTotal}</td>}
                                        {!!breakdown.armor && <td>-{breakdown.armor}</td>}
                                        <td className="dice-result-total">= {breakdown.totalDamage}</td>
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                {breakdown && breakdown.modifiers.length > 0 && (
                    <div className="damage-modifier-breakdown">
                        <h6>Modifiers</h6>
                        <ul className="damage-modifiers-list">
                            {breakdown.modifiers.map((modifier, index) => (
                                <li key={index} className="damage-modifier-row">
                                    <span className="modifier-source">{modifier.source}</span>
                                    <span className="modifier-amount">
                                        {modifier.amount > 0 ? `+${modifier.amount}` : modifier.amount}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </CombatPhaseLayout>
    );
};

export default DamageRollPhase;
