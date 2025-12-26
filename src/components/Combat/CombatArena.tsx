import React from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import CombatDice from './CombatDice';
import CombatLog from './CombatLog';
import CombatantCard from './CombatantCard';
import CombatAbilitySelector from './CombatAbilitySelector';
import CombatModifiers from './CombatModifiers';
import EnemySelector from './EnemySelector';
import './CombatArena.css';

interface CombatArenaProps {
    hero: Hero;
}

const CombatArena: React.FC<CombatArenaProps> = ({ hero }) => {
    const {
        combat,
        startCombat,
        nextRound,
        activateAbility,
        commitDamageResult,
        handleReroll,
        executeSpeedRoll,
        commitSpeedResult,
    } = useCombat(hero);

    if (combat.phase === 'combat-start' && !combat.enemy) {
        return (
            <EnemySelector onSelect={startCombat} />
        );
    }

    if (!combat.enemy) return null;

    const getPhaseInstruction = () => {
        switch (combat.phase) {
            case 'combat-start': return "Enemy Found! Prepare to fight!";
            case 'speed-roll':
                if (combat.heroSpeedRolls) return combat.winner === 'hero' ? "Hero wins speed! Proceed to damage?" : (combat.winner === 'enemy' ? "Enemy wins speed! Brace for impact." : "Draw! No damage.");
                return "Rolling Speed...";
            case 'damage-roll':
                if (combat.damageRolls) return "Confirm Damage?";
                return combat.winner === 'hero' ? "Roll Damage (1d6)" : "Enemy Attacking...";

            case 'round-end': return "Round Complete.";
            case 'combat-end': return "Combat Finished";
            default: return "";
        }
    };

    // Derived states
    // speed-rolls are shown if we have rolls (phase might be speed-roll or damage-roll or round-end if we want to keep them visible)
    // Actually, usually we keep speed dice visible until round ends for context.
    const showSpeedDice = !!combat.heroSpeedRolls && combat.phase !== 'combat-start';

    // Damage section shown only in damage-roll phase or if we have damage rolls in round-end
    const showDamageSection = combat.phase === 'damage-roll' || (combat.phase === 'round-end' && combat.damageRolls);

    // Should we show proceed button for Damage?
    // Only if damage rolls exist and we are in damage-roll phase
    const showDamageConfirm = combat.phase === 'damage-roll' && !!combat.damageRolls;

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
                    />

                    {/* VS Separator */}
                    <div className="vs-separator">VS</div>

                    {/* Enemy Card */}
                    <CombatantCard
                        name={combat.enemy.name}
                        currentHealth={combat.enemy.health}
                        maxHealth={combat.enemy.maxHealth}
                        speed={combat.enemy.speed}
                        brawn={combat.enemy.brawn}
                        magic={combat.enemy.magic}
                        armour={combat.enemy.armour}
                        isEnemy={true}
                    />
                </div>

                <CombatModifiers modifiers={combat.modifiers} />
            </div>

            <div className="arena-center">
                {/* SPEED PHASE: Dual Dice Display */}
                {/* Only show if we have rolls and not in start phase */}
                <div className={`speed-rolls-container speed-rolls ${combat.phase !== 'speed-roll' ? 'speed-rolls-mini' : ''}`}
                    style={{
                        display: showSpeedDice ? 'flex' : 'none'
                    }}>
                    <div className="hero-dice">
                        <CombatDice
                            label="Hero Speed"
                            values={combat.heroSpeedRolls} // Persist if exists
                            onDieClick={combat.rerollState?.target === 'hero-speed' ? (i) => handleReroll(i) : undefined}
                            mode={combat.rerollState?.target === 'hero-speed' ? 'select-die' : (combat.rerollState ? 'disabled' : 'normal')}
                            baseValue={hero.stats.speed}
                            modifierValue={combat.modifiers.filter(m => m.type === 'speed-bonus').reduce((sum, m) => sum + m.value, 0)}
                        />
                    </div>

                    <div className="enemy-dice">
                        <CombatDice
                            label="Enemy Speed"
                            values={combat.enemySpeedRolls}
                            baseValue={combat.enemy.speed}
                            mode={combat.rerollState ? 'disabled' : 'normal'}
                        />
                    </div>
                </div>

                {/* DAMAGE PHASE: Single Die Display */}
                {showDamageSection && (
                    <div className="damage-roll-container damage-section">
                        <div className="damage-title">
                            {combat.phase === 'damage-roll'
                                ? (combat.winner === 'hero' ? '💥 ROLL FOR DAMAGE!' : '🛡️ BRACE FOR IMPACT!')
                                : (combat.winner === 'hero' ? '💥 HERO HIT:' : '🛡️ ENEMY HIT:')
                            }
                        </div>

                        {combat.winner === 'hero' && (
                            <div className="damage-dice-container">
                                <CombatDice
                                    label="Damage"
                                    values={combat.damageRolls} // Show result if exists
                                    onDieClick={combat.rerollState?.target === 'damage' ? (i) => handleReroll(i) : undefined}
                                    mode={combat.rerollState?.target === 'damage' ? 'select-die' : (combat.rerollState ? 'disabled' : 'normal')}
                                    baseValue={Math.max(hero.stats.brawn, hero.stats.magic)}
                                    modifierValue={combat.modifiers.filter(m => m.type === 'damage-bonus').reduce((sum, m) => sum + m.value, 0)}
                                />
                            </div>
                        )}

                        {combat.winner === 'enemy' && (
                            <div className="enemy-damage-container">
                                <CombatDice
                                    label="Enemy Damage"
                                    values={combat.damageRolls}
                                    baseValue={Math.max(combat.enemy.brawn, combat.enemy.magic)}
                                    mode={combat.rerollState ? 'disabled' : 'normal'}
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* Phase Instruction */}
                <div className="phase-instruction">
                    {getPhaseInstruction()}
                </div>

                {/* Speed or Damage Result Confirmation / Proceed Button */}
                {combat.phase === 'speed-roll' && combat.heroSpeedRolls && (
                    <div className="speed-confirm-container">
                        {
                            combat.winner ?
                                <button className="btn btn-primary" onClick={commitSpeedResult}>
                                    Procced to Damage Roll
                                </button> :
                                <button className="btn btn-primary" onClick={nextRound}>
                                    End Round (Draw)
                                </button>
                        }
                    </div>
                )}
                {combat.phase === 'damage-roll' && showDamageConfirm && (
                    <div className="damage-confirm-container">
                        <button className="btn btn-primary" onClick={commitDamageResult}>
                            Confirm Damage & End Round
                        </button>
                    </div>
                )}
                {(combat.phase === 'round-end' || combat.phase === 'combat-start') && (
                    <button className="btn btn-primary" onClick={combat.phase === 'combat-start' ? executeSpeedRoll : nextRound}>
                        {combat.phase === 'combat-start' ? 'Fight!' : 'Next Round'}
                    </button>
                )}

                <CombatAbilitySelector
                    combat={combat}
                    onActivate={activateAbility}
                />
            </div>

            <CombatLog logs={combat.logs} />
        </div>
    );
};

export default CombatArena;
