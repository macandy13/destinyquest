import React from 'react';
import { CombatState } from '../../types/combatState';
import { calculateEffectiveStats } from '../../types/effect';
import CombatDice from './CombatDice';
import CombatPhaseLayout from './CombatPhaseLayout';

interface DamageRollPhaseProps {
    combat: CombatState;
    confirmDamageRoll: () => void;
    resolveInteraction: (data: any) => void;
    activateAbility: (abilityName: string) => void;
    useBackpackItem: (itemIndex: number) => void;
}

const DamageRollPhase: React.FC<DamageRollPhaseProps> = ({
    combat,
    confirmDamageRoll,
    resolveInteraction,
    activateAbility,
    useBackpackItem
}) => {
    const [selectedDice, setSelectedDice] = React.useState<number[]>([]);

    const isInteracting = combat.pendingInteraction?.requests.some(r => r.type === 'dice');
    const interactionRequest = combat.pendingInteraction?.requests.find(r => r.type === 'dice');

    // In Damage phase, the winner rolls damage. 
    // Interaction might target 'hero' (if hero won) or 'enemy' (if enemy won).
    // Or abilities might let you affect opponent damage?
    // We check target. default is 'hero' usually implies the Roller? 
    // Actually, target 'hero' means Hero's dice. Target 'enemy' means Enemy's dice.

    // Hero rolls damage
    const canInteractHero = isInteracting && combat.winner === 'hero' && (interactionRequest?.target === 'hero' || !interactionRequest?.target);

    // Enemy rolls damage
    const canInteractEnemy = isInteracting && combat.winner === 'enemy' && (interactionRequest?.target === 'enemy');

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
        const responses = selectedDice.map(idx => ({
            request: interactionRequest,
            selectedIndex: idx
        }));
        resolveInteraction(responses);
        setSelectedDice([]);
    };

    return (
        <CombatPhaseLayout
            title="Damage Roll"
            description={isInteracting ? "Select a die to interact with." : (combat.winner === 'hero' ? 'Roll for Damage!' : 'Brace for Impact!')}
            combat={combat}
            onActivateAbility={activateAbility}
            onUseBackpackItem={useBackpackItem}
            actions={
                isInteracting ? (
                    (interactionRequest?.count ?? 1) > 1 && (
                        <button
                            className="btn btn-primary btn-phase-action"
                            onClick={confirmDiceSelection}
                            disabled={selectedDice.length !== (interactionRequest?.count ?? 1)}
                        >
                            Confirm Selection ({selectedDice.length}/{interactionRequest?.count})
                        </button>
                    )
                ) : (
                    <button className="btn btn-primary btn-phase-action" onClick={confirmDamageRoll}>
                        Apply Damage
                    </button>
                )
            }
        >
            <div className="damage-dice-container">
                {combat.winner === 'hero' && (
                    <CombatDice
                        label="Damage"
                        values={combat.damage?.damageRolls} // Show result if exists
                        onDieClick={canInteractHero ? onDieClick : undefined}
                        mode={canInteractHero ? 'select-die' : (isInteracting ? 'disabled' : 'normal')}
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
                        mode={canInteractEnemy ? 'select-die' : (isInteracting ? 'disabled' : 'normal')}
                        selectedIndices={selectedDice}
                    />
                )}
            </div>
        </CombatPhaseLayout>
    );
};

export default DamageRollPhase;
