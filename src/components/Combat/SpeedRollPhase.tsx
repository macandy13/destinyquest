import React from 'react';
import { CombatState, InteractionRequest, InteractionResponse, getActiveEnemy } from '../../types/combatState';
import { sumDice } from '../../types/dice';
import { calculateEffectiveStats } from '../../mechanics/CombatEngine';
import CombatDice from './CombatDice';
import CombatPhaseLayout from './CombatPhaseLayout';
import { PrimaryButton } from '../Shared/Button';
import { getStatIcon } from '../../types/stats';
import './SpeedRollPhase.css';

interface SpeedRollPhaseProps {
    combat: CombatState;
    commitSpeedAndRollDamageDice: () => void;
    confirmBonusDamage: () => void;
    currentInteraction?: InteractionRequest;
    resolveInteraction: (data: InteractionResponse) => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const SpeedRollPhase: React.FC<SpeedRollPhaseProps> = ({
    combat,
    commitSpeedAndRollDamageDice,
    confirmBonusDamage,
    currentInteraction,
    resolveInteraction,
    activateAbility,
    useBackpackItem
}) => {
    const getInstruction = () => {
        if (currentInteraction?.type === 'dice') {
            return "Select a die to interact with.";
        }
        switch (combat.winner) {
            case 'hero': return "Hero wins speed! Proceed to damage?";
            case 'enemy': return "Enemy wins speed! Brace for impact.";
            case null: return "Draw! Skip damage phase.";
            default: return "";
        }
    };

    const [selectedDice, setSelectedDice] = React.useState<number[]>([]);

    const effectiveStats = calculateEffectiveStats(combat);
    const heroSpeed = effectiveStats.hero.speed;
    const heroSpeedRoll = sumDice(combat.heroSpeedRolls || []);
    const heroSpeedTotal = heroSpeed + heroSpeedRoll;
    const heroSpeedDiff = heroSpeed - combat.hero.stats.speed;

    const enemySpeed = effectiveStats.enemy.speed;
    const enemySpeedRoll = sumDice(combat.enemySpeedRolls || []);
    const enemySpeedTotal = enemySpeed + enemySpeedRoll;
    const enemySpeedDiff = enemySpeed - getActiveEnemy(combat).stats.speed;

    const isInteracting = currentInteraction?.type === 'dice';
    const canInteractHero = isInteracting && (currentInteraction?.target === 'hero' || !currentInteraction?.target);
    const canInteractEnemy = isInteracting && (currentInteraction?.target === 'enemy');

    // Helper to handle die click for interaction
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
        resolveInteraction({
            request: currentInteraction!,
            selectedIndexes: selectedDice
        });
        setSelectedDice([]);
    };

    return (
        <CombatPhaseLayout
            title="Speed Roll"
            description={getInstruction()}
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                isInteracting ? (
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
                    combat.winner ?
                        <PrimaryButton className="btn-phase-action" onClick={commitSpeedAndRollDamageDice}>
                            Roll Damage Dice
                        </PrimaryButton> :
                        <PrimaryButton className="btn-phase-action" onClick={confirmBonusDamage}>
                            Apply Passive Abilities
                        </PrimaryButton>
                )
            }
        >
            <div className="speed-rolls-container">
                <div className="speed-dice-container">
                    <CombatDice
                        label="Hero Speed"
                        values={combat.heroSpeedRolls}
                        onDieClick={canInteractHero ? onDieClick : undefined}
                        mode={canInteractHero ? 'select-die' : (isInteracting ? 'disabled' : 'normal')}
                        selectedIndices={selectedDice}
                    />
                    {combat.heroSpeedRolls && (
                        <div className="dice-breakdown-table">
                            <div>{sumDice(combat.heroSpeedRolls)} {getStatIcon('die')}</div>
                            <div>+ {combat.hero.stats.speed} {getStatIcon('speed')}</div>
                            {!!heroSpeedDiff && <div>+ {heroSpeedDiff > 0 ? `+${heroSpeedDiff}` : heroSpeedDiff}</div>}
                            <div className="dice-result-total">= {heroSpeedTotal}</div>
                        </div>
                    )}
                </div>
                <div className="speed-dice-container">
                    <CombatDice
                        label="Enemy Speed"
                        values={combat.enemySpeedRolls}
                        onDieClick={canInteractEnemy ? onDieClick : undefined}
                        mode={canInteractEnemy ? 'select-die' : (isInteracting ? 'disabled' : 'normal')}
                    />
                    {combat.enemySpeedRolls && (
                        <div className="dice-breakdown-table">
                            <div>{sumDice(combat.enemySpeedRolls)} {getStatIcon('die')}</div>
                            <div>+ {getActiveEnemy(combat).stats.speed} {getStatIcon('speed')}</div>
                            {!!enemySpeedDiff && <div>+ {enemySpeedDiff > 0 ? `+${enemySpeedDiff}` : enemySpeedDiff}</div>}
                            <div className="dice-result-total">= {enemySpeedTotal}</div>
                        </div>
                    )}
                </div>
            </div>
        </CombatPhaseLayout>
    );
}

export default SpeedRollPhase;
