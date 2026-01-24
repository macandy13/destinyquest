import React, { useState } from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import { Enemy } from '../../types/character';
import { BackpackItem } from '../../types/hero';
import CombatLog from './CombatLog';
import CombatantCard from './CombatantCard';
import EnemyCarousel from './EnemyCarousel';
import CombatStartPhase from './CombatStartPhase';
import RoundStartPhase from './RoundStartPhase';
import SpeedRollPhase from './SpeedRollPhase';
import DamageRollPhase from './DamageRollPhase';
import ApplyPassiveAbilitiesPhase from './ApplyPassiveAbilitiesPhase';
import RoundSummary from './RoundSummary';
import RoundEndPhase from './RoundEndPhase';
import CombatEndPhase from './CombatEndPhase';
import InteractionOverlay from './InteractionOverlay';
import './CombatArena.css';
import { InteractionResponse } from '../../types/combatState';
import heroBg from '../../assets/hero_background.png';
import monsterBg from '../../assets/monster_background.png';

interface CombatArenaProps {
    hero: Hero;
    enemy: Enemy;
    onCombatFinish: (results: { health?: number, backpack: (BackpackItem | null)[] }) => void;
}

interface InteractionTracker {
    currentIndex: number;
    length: number;
    collectedResponses: InteractionResponse[];
};

const CombatArena: React.FC<CombatArenaProps> = ({ hero, enemy, onCombatFinish }) => {
    const {
        combat,
        activateAbility,
        useBackpackItem,
        rollSpeedDice,
        commitSpeedAndRollDamageDice,
        confirmDamageRoll,
        confirmBonusDamage,
        resolveInteraction,
        nextRound,
        restartCombat,
        updateCombatState,
        setActiveEnemy,
        undo,
        canUndo
    } = useCombat(hero, enemy);

    const [interactionData, setInteractionData] = useState<InteractionTracker | null>(null);
    React.useEffect(() => {
        if (combat.pendingInteraction) {
            setInteractionData({
                currentIndex: 0,
                length: combat.pendingInteraction.requests.length,
                collectedResponses: []
            });
        } else {
            setInteractionData(null);
        }
    }, [combat.pendingInteraction]);

    const currentInteraction = () => combat.pendingInteraction?.requests[interactionData?.currentIndex ?? 0];

    const resolveSingleInteraction = (response: InteractionResponse) => {
        if (!interactionData) return;
        const newData = {
            ...interactionData,
            currentIndex: interactionData.currentIndex + 1,
            collectedResponses: [...interactionData.collectedResponses, response],
        };
        if (newData.currentIndex < newData.length) {
            setInteractionData(newData);
            return;
        }
        resolveInteraction(newData.collectedResponses);
        setInteractionData(null);
    };

    return (
        <div className="combat-arena">
            <div className="combat-background">
                <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
                <div className="monster-bg" style={{ backgroundImage: `url(${monsterBg})` }} />
            </div>
            <div className="arena-header">
                <div className="combatants">
                    {/* Hero Card */}
                    <CombatantCard
                        name={hero.name}
                        currentHealth={combat.hero?.stats.health ?? 0}
                        maxHealth={hero.stats.maxHealth}
                        speed={hero.stats.speed}
                        brawn={hero.stats.brawn}
                        magic={hero.stats.magic}
                        armour={hero.stats.armour}
                        activeEffects={combat.hero.activeEffects}
                    />

                    {/* VS Separator */}
                    <div className="vs-separator">
                        <div className="vs-text">VS</div>
                        <button
                            className="undo-button"
                            onClick={undo}
                            disabled={!canUndo}
                            title="Undo last action"
                            aria-label="Undo"
                        >
                            ↺
                        </button>
                    </div>

                    {/* Enemy Carousel */}
                    <EnemyCarousel
                        enemies={combat.enemies}
                        activeIndex={combat.activeEnemyIndex}
                        onSelect={setActiveEnemy}
                    />
                </div>
            </div>

            <div className="arena-center">
                {/* Interaction Overlay for choices */}
                {currentInteraction()?.type === 'choices' && (
                    <InteractionOverlay
                        ability={combat.pendingInteraction!.ability}
                        interaction={currentInteraction()!}
                        onResolve={(data) => resolveSingleInteraction(data)}
                    />
                )}

                {combat.phase === 'combat-start' && (
                    <CombatStartPhase
                        combat={combat}
                        rollSpeedDice={rollSpeedDice}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'round-start' && (
                    <RoundStartPhase
                        combat={combat}
                        rollSpeedDice={rollSpeedDice}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'speed-roll' && (
                    <SpeedRollPhase
                        combat={combat}
                        commitSpeedAndRollDamageDice={commitSpeedAndRollDamageDice}
                        confirmBonusDamage={confirmBonusDamage}
                        currentInteraction={currentInteraction()?.type === 'dice' ? currentInteraction() : undefined}
                        resolveInteraction={resolveSingleInteraction}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'damage-roll' && (
                    <DamageRollPhase
                        combat={combat}
                        confirmDamageRoll={confirmDamageRoll}
                        currentInteraction={currentInteraction()?.type === 'dice' ? currentInteraction() : undefined}
                        resolveInteraction={resolveSingleInteraction}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'apply-damage' && (
                    <ApplyPassiveAbilitiesPhase
                        combat={combat}
                        confirmBonusDamage={confirmBonusDamage}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'passive-damage' && (
                    <RoundSummary
                        combat={combat}
                        nextRound={nextRound}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                        onUpdateState={updateCombatState}
                    />
                )}
                {combat.phase === 'round-end' && (
                    <RoundEndPhase
                        combat={combat}
                        nextRound={nextRound}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'combat-end' && (
                    <CombatEndPhase
                        combat={combat}
                        onCombatFinish={onCombatFinish}
                        restartCombat={restartCombat}
                        onUpdateState={updateCombatState}
                    />
                )}
            </div>

            <CombatLog logs={combat.logs} />
        </div>
    );
};

export default CombatArena;
