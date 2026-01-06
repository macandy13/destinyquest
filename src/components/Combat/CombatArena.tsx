import React from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import { Enemy } from '../../types/character';
import { BackpackItem } from '../../types/hero';
import CombatLog from './CombatLog';
import CombatantCard from './CombatantCard';
import CombatStartPhase from './CombatStartPhase';
import RoundStartPhase from './RoundStartPhase';
import SpeedRollPhase from './SpeedRollPhase';
import DamageRollPhase from './DamageRollPhase';
import ApplyDamagePhase from './ApplyDamagePhase';
import PassiveDamagePhase from './PassiveDamagePhase';
import RoundEndPhase from './RoundEndPhase';
import CombatEndPhase from './CombatEndPhase';
import InteractionOverlay from './InteractionOverlay';
import './CombatArena.css';

interface CombatArenaProps {
    hero: Hero;
    enemy: Enemy;
    onCombatFinish: (results: { health?: number, backpack: (BackpackItem | null)[] }) => void;
}

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
        restartCombat
    } = useCombat(hero, enemy);

    return (
        <div className="combat-arena">
            <div className="arena-header">
                <div className="text-dim round-indicator">Round {combat.round}</div>

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
                    <div className="vs-separator">VS</div>

                    {/* Enemy Card */}
                    <CombatantCard
                        name={combat.enemy.name}
                        currentHealth={combat.enemy.stats.health}
                        maxHealth={combat.enemy.stats.maxHealth}
                        speed={combat.enemy.stats.speed}
                        brawn={combat.enemy.stats.brawn}
                        magic={combat.enemy.stats.magic}
                        armour={combat.enemy.stats.armour}
                        isEnemy={true}
                        activeEffects={combat.enemy.activeEffects}
                    />
                </div>
            </div>

            <div className="arena-center">
                {/* Interaction Overlay for choices */}
                {combat.pendingInteraction?.requests.some(r => r.type === 'choices') && (
                    <InteractionOverlay
                        combat={combat}
                        onResolve={(data) => resolveInteraction([{
                            request: combat.pendingInteraction!.requests.find(r => r.type === 'choices'),
                            ...data
                        }])}
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
                        resolveInteraction={resolveInteraction}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'damage-roll' && (
                    <DamageRollPhase
                        combat={combat}
                        confirmDamageRoll={confirmDamageRoll}
                        resolveInteraction={resolveInteraction}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'apply-damage' && (
                    <ApplyDamagePhase
                        combat={combat}
                        confirmBonusDamage={confirmBonusDamage}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
                    />
                )}
                {combat.phase === 'passive-damage' && (
                    <PassiveDamagePhase
                        combat={combat}
                        nextRound={nextRound}
                        activateAbility={activateAbility}
                        useBackpackItem={useBackpackItem}
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
                    />
                )}
            </div>

            <CombatLog logs={combat.logs} />
        </div>
    );
};

export default CombatArena;
