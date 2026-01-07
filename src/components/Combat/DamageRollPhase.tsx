import React from 'react';
import { CombatState, InteractionRequest, InteractionResponse } from '../../types/combatState';
import { calculateEffectiveStats } from '../../types/effect';
import CombatDice from './CombatDice';
import CombatPhaseLayout from './CombatPhaseLayout';
import { PrimaryButton } from '../Shared/Button';

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

    // In Damage phase, the winner rolls damage. 
    // Interaction might target 'hero' (if hero won) or 'enemy' (if enemy won).
    // Or abilities might let you affect opponent damage?
    // We check target. default is 'hero' usually implies the Roller? 
    // Actually, target 'hero' means Hero's dice. Target 'enemy' means Enemy's dice.

    // Hero rolls damage
    const canInteractHero = currentInteraction?.target === 'hero' && combat.winner === 'hero';

    // Enemy rolls damage
    const canInteractEnemy = currentInteraction?.target === 'enemy' && combat.winner === 'enemy';

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
            description={currentInteraction ? "Select a die to interact with." : (combat.winner === 'hero' ? 'Roll for Damage!' : 'Brace for Impact!')}
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
            <div className="damage-dice-container">
                {combat.winner === 'hero' && (
                    <CombatDice
                        label="Damage"
                        values={combat.damage?.damageRolls}
                        onDieClick={canInteractHero ? onDieClick : undefined}
                        mode={canInteractHero ? 'select-die' : (currentInteraction ? 'disabled' : 'normal')}
                        selectedIndices={selectedDice}
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
                        onDieClick={canInteractEnemy ? onDieClick : undefined}
                        mode={canInteractEnemy ? 'select-die' : (currentInteraction ? 'disabled' : 'normal')}
                        selectedIndices={selectedDice}
                    />
                )}
            </div>
        </CombatPhaseLayout>
    );
};

export default DamageRollPhase;
