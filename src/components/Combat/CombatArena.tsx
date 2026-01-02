import React from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import CombatDice from './CombatDice';
import CombatLog from './CombatLog';
import CombatantCard from './CombatantCard';
import CombatAbilitySelector from './CombatAbilitySelector';
import CombatModifiers from './CombatModifiers';
import EnemySelector from './EnemySelector';
import CombatResultDialog from './CombatResultDialog';
import { calculateEffectiveStats } from '../../utils/stats';
import { BackpackItem } from '../../types/hero';
import './CombatArena.css';

interface CombatArenaProps {
    hero: Hero;
    onCombatFinish: (results: { health: number, backpack: (BackpackItem | null)[] }) => void;
}

const CombatArena: React.FC<CombatArenaProps> = ({ hero, onCombatFinish }) => {
    const {
        combat,
        startCombat,
        activateAbility,
        useBackpackItem,
        rollSpeedDice,
        commitSpeedAndRollDamageDice,
        confirmDamage,
        handleReroll,
        endRoundWithoutDamage,
        nextRound,
        endCombat,
    } = useCombat(hero);

    const state = combat.displayed;
    if (state.phase === 'combat-start' && !state.enemy) {
        return (
            <EnemySelector onSelect={startCombat} />
        );
    }

    if (!state.enemy) return null;

    const getPhaseInstruction = () => {
        switch (state.phase) {
            case 'combat-start': return "Enemy Found! Prepare to fight!";
            case 'speed-roll':
                if (state.heroSpeedRolls) return state.winner === 'hero' ? "Hero wins speed! Proceed to damage?" : (state.winner === 'enemy' ? "Enemy wins speed! Brace for impact." : "Draw! No damage.");
                return "Rolling Speed...";
            case 'damage-roll':
                if (state.damageRolls) return "Confirm Damage?";
                return state.winner === 'hero' ? "Roll Damage (1d6)" : "Enemy Attacking...";

            case 'round-end': return "Round Complete.";
            case 'combat-end': return "Combat Finished";
            default: return "";
        }
    };

    // Derived states
    // speed-rolls are shown if we have rolls (phase might be speed-roll or damage-roll or round-end if we want to keep them visible)
    // Actually, usually we keep speed dice visible until round ends for context.
    const showSpeedDice = !!state.heroSpeedRolls && state.phase !== 'combat-start';

    // Damage section shown only in damage-roll phase or if we have damage rolls in round-end
    const showDamageSection = state.phase === 'damage-roll' || (state.phase === 'round-end' && state.damageRolls);

    // Should we show proceed button for Damage?
    // Only if damage rolls exist and we are in damage-roll phase
    const showDamageConfirm = state.phase === 'damage-roll' && !!state.damageRolls;

    return (
        <div className="combat-arena">
            <div className="arena-header">
                <div className="text-dim round-indicator">Round {state.round}</div>

                <div className="combatants">
                    {/* Hero Card */}
                    <CombatantCard
                        name={hero.name}
                        currentHealth={state.hero?.stats.health ?? 0}
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
                        name={state.enemy.name}
                        currentHealth={state.enemy.stats.health}
                        maxHealth={state.enemy.stats.maxHealth}
                        speed={state.enemy.stats.speed}
                        brawn={state.enemy.stats.brawn}
                        magic={state.enemy.stats.magic}
                        armour={state.enemy.stats.armour}
                        isEnemy={true}
                    />
                </div>

                <CombatModifiers modifications={state.modifications.map(m => ({ ...m, duration: m.duration ?? 0 }))} />
            </div>

            <div className="arena-center">
                {showSpeedDice &&
                    <div className={`speed-rolls-container speed-rolls ${state.phase !== 'speed-roll' ? 'rolls-mini' : ''}`}>
                        <div className="hero-dice">
                            <CombatDice
                                label="Hero Speed"
                                values={state.heroSpeedRolls} // Persist if exists
                                onDieClick={state.rerollState?.target === 'hero-speed' ? (i) => handleReroll(i) : undefined}
                                mode={state.rerollState?.target === 'hero-speed' ? 'select-die' : (state.rerollState ? 'disabled' : 'normal')}
                                baseValue={hero.stats.speed}
                                modifierValue={
                                    calculateEffectiveStats(
                                        hero.stats,
                                        state.modifications.filter(m => m.modification.target === 'hero').map(m => m.modification)
                                    ).speed - hero.stats.speed
                                }
                            />
                        </div>

                        <div className="enemy-dice">
                            <CombatDice
                                label="Enemy Speed"
                                values={state.enemySpeedRolls}
                                baseValue={state.enemy.stats.speed}
                                mode={state.rerollState ? 'disabled' : 'normal'}
                            />
                        </div>
                    </div>}

                {showDamageSection && (
                    <div className={`damage-roll-container damage-section ${state.phase !== 'damage-roll' ? 'rolls-mini' : ''}`}>
                        <div className="damage-title">
                            {state.phase === 'damage-roll'
                                ? (state.winner === 'hero' ? '💥 ROLL FOR DAMAGE!' : '🛡️ BRACE FOR IMPACT!')
                                : (state.winner === 'hero' ? '💥 HERO HIT:' : '🛡️ ENEMY HIT:')
                            }
                        </div>

                        {state.winner === 'hero' && (
                            <div className="damage-dice-container">
                                <CombatDice
                                    label="Damage"
                                    values={state.damageRolls} // Show result if exists
                                    onDieClick={state.rerollState?.target === 'damage' ? (i) => handleReroll(i) : undefined}
                                    mode={state.rerollState?.target === 'damage' ? 'select-die' : (state.rerollState ? 'disabled' : 'normal')}
                                    baseValue={Math.max(hero.stats.brawn, hero.stats.magic)}
                                    modifierValue={
                                        calculateEffectiveStats(
                                            hero.stats,
                                            state.modifications.filter(m => m.modification.target === 'hero').map(m => m.modification)
                                        ).damageModifier ?? 0
                                    }
                                />
                            </div>
                        )}

                        {state.winner === 'enemy' && (
                            <div className="enemy-damage-container">
                                <CombatDice
                                    label="Enemy Damage"
                                    values={state.damageRolls}
                                    baseValue={Math.max(state.enemy.stats.brawn, state.enemy.stats.magic)}
                                    mode={state.rerollState ? 'disabled' : 'normal'}
                                />
                            </div>
                        )}
                    </div>
                )}

                {state.phase === 'round-end' && (
                    <div className="round-end-container damage-section">
                        <div className="round-end-content">
                            <div className="round-end-text">
                                {state.additionalEnemyDamage && (
                                    state.additionalEnemyDamage.map(d =>
                                        <div className="additional-damage">
                                            Bonus: +{d.amount} {d.source}
                                        </div>)
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="phase-control">
                    <div className="phase-instruction">
                        {getPhaseInstruction()}
                    </div>

                    {(state.phase === 'combat-start'
                        || (state.phase === 'speed-roll' && !state.heroSpeedRolls)) && (
                            <button className="btn btn-primary" onClick={rollSpeedDice}>
                                Roll Speed Dice
                            </button>
                        )}

                    {/* Speed or Damage Result Confirmation / Proceed Button */}
                    {state.phase === 'speed-roll' && state.heroSpeedRolls && (
                        state.winner ?
                            <button className="btn btn-primary" onClick={commitSpeedAndRollDamageDice}>
                                Confirm Winner & Roll Damage Dice
                            </button> :
                            <button className="btn btn-primary" onClick={endRoundWithoutDamage}>
                                Confirm Draw
                            </button>
                    )}

                    {state.phase === 'damage-roll' && showDamageConfirm && (
                        <button className="btn btn-primary" onClick={confirmDamage}>
                            Confirm Damage
                        </button>
                    )}

                    {(state.phase === 'round-end') && (
                        <button className="btn btn-primary" onClick={nextRound}>
                            End Round
                        </button>
                    )}

                    {(state.phase === 'combat-end') && (
                        <button className="btn btn-primary" onClick={endCombat}>
                            End Combat
                        </button>
                    )}

                    <CombatAbilitySelector
                        combat={state}
                        onActivateAbility={activateAbility}
                        onUseBackbackItem={useBackpackItem}
                    />
                </div>
            </div>

            <CombatLog logs={state.logs} />

            {combat.finished && (
                <CombatResultDialog
                    result={state.hero?.stats.health! <= 0 ? 'defeat' : 'victory'}
                    onAccept={() => {
                        if (!state.hero) return;

                        let newHealth = 0;
                        if (state.hero.stats.health <= 0) {
                            newHealth = 0; // Defeat
                        } else if (state.enemy?.original?.preventHealing) {
                            newHealth = state.hero.stats.health; // Prevent Healing
                        } else {
                            newHealth = hero.stats.maxHealth; // Full Restore
                        }

                        onCombatFinish({
                            health: newHealth,
                            backpack: state.hero.original.backpack
                        });
                    }}
                    onRetry={() => {
                        startCombat(state.enemy!.original);
                    }}
                />
            )}
        </div>
    );
};

export default CombatArena;
