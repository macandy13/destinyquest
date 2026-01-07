import React from 'react';
import { CombatState } from '../../types/combatState';
import { calculateEffectiveStats } from '../../types/effect';
import CombatDice from './CombatDice';
import CombatPhaseLayout from './CombatPhaseLayout';
import { PrimaryButton } from '../Shared/Button';

interface SpeedRollPhaseProps {
    combat: CombatState;
    commitSpeedAndRollDamageDice: () => void;
    confirmBonusDamage: () => void;
    resolveInteraction: (data: any) => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const SpeedRollPhase: React.FC<SpeedRollPhaseProps> = ({
    combat,
    commitSpeedAndRollDamageDice,
    confirmBonusDamage,
    resolveInteraction,
    activateAbility,
    useBackpackItem
}) => {
    const getInstruction = () => {
        if (combat.pendingInteraction?.requests.some(r => r.type === 'dice')) {
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

    const isInteracting = combat.pendingInteraction?.requests.some(r => r.type === 'dice');
    const interactionRequest = combat.pendingInteraction?.requests.find(r => r.type === 'dice');
    const canInteractHero = isInteracting && (interactionRequest?.target === 'hero' || !interactionRequest?.target);
    const canInteractEnemy = isInteracting && (interactionRequest?.target === 'enemy');

    // Helper to handle die click for interaction
    const onDieClick = (index: number) => {
        const count = interactionRequest?.count ?? 1;
        if (count > 1) {
            // Toggle selection
            if (selectedDice.includes(index)) {
                setSelectedDice(selectedDice.filter(i => i !== index));
            } else if (selectedDice.length < count) {
                setSelectedDice([...selectedDice, index]);
            }
        } else {
            // Immediate resolve for single die
            resolveInteraction([{
                request: interactionRequest,
                selectedIndex: index
            }]);
        }
    };

    const confirmDiceSelection = () => {
        if (!interactionRequest) return;
        // Map each selected index to a response
        // Note: The structure of InteractionResponse implies a 1-to-1 mapping via array in CombatEngine?
        // Actually, resolveInteraction takes 'data'. CombatEngine implementation of resolveInteraction
        // takes 'response: InteractionResponse[]'.
        // So we send an array of responses.
        const responses = selectedDice.map(idx => ({
            request: interactionRequest,
            selectedIndex: idx
        }));
        resolveInteraction(responses);
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
                    (interactionRequest?.count ?? 1) > 1 && (
                        <PrimaryButton
                            className="btn-phase-action"
                            onClick={confirmDiceSelection}
                            disabled={selectedDice.length !== (interactionRequest?.count ?? 1)}
                        >
                            Confirm Selection ({selectedDice.length}/{interactionRequest?.count})
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
            <div className="speed-rolls-container speed-rolls">
                <div className="hero-dice">
                    <CombatDice
                        label="Hero Speed"
                        values={combat.heroSpeedRolls}
                        onDieClick={canInteractHero ? onDieClick : undefined}
                        mode={canInteractHero ? 'select-die' : (isInteracting ? 'disabled' : 'normal')}
                        selectedIndices={selectedDice}
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
                        onDieClick={canInteractEnemy ? onDieClick : undefined}
                        mode={canInteractEnemy ? 'select-die' : (isInteracting ? 'disabled' : 'normal')}
                    />
                </div>
            </div>
        </CombatPhaseLayout>
    );
}

export default SpeedRollPhase;
