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
        generateSpeedRolls,
        commitSpeedResult,
        handleReroll,
        commitDamageResult,
        nextRound,
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
                        currentHealth={combat.enemy.stats.health}
                        maxHealth={combat.enemy.stats.maxHealth}
                        speed={combat.enemy.stats.speed}
                        brawn={combat.enemy.stats.brawn}
                        magic={combat.enemy.stats.magic}
                        armour={combat.enemy.stats.armour}
                        isEnemy={true}
                    />
                </div>

                <CombatModifiers modifications={combat.modifications} />
            </div>

            <div className="arena-center">
                {showSpeedDice &&
                    <div className={`speed-rolls-container speed-rolls ${combat.phase !== 'speed-roll' ? 'rolls-mini' : ''}`}>
                        <div className="hero-dice">
                            <CombatDice
                                label="Hero Speed"
                                values={combat.heroSpeedRolls} // Persist if exists
                                onDieClick={combat.rerollState?.target === 'hero-speed' ? (i) => handleReroll(i) : undefined}
                                mode={combat.rerollState?.target === 'hero-speed' ? 'select-die' : (combat.rerollState ? 'disabled' : 'normal')}
                                baseValue={hero.stats.speed}
                                modifierValue={
                                    calculateEffectiveStats(
                                        hero.stats,
                                        combat.modifications.filter(m => m.modification.target === 'hero').map(m => m.modification)
                                    ).speed - hero.stats.speed
                                }
                            />
                        </div>

                        <div className="enemy-dice">
                            <CombatDice
                                label="Enemy Speed"
                                values={combat.enemySpeedRolls}
                                baseValue={combat.enemy.stats.speed}
                                mode={combat.rerollState ? 'disabled' : 'normal'}
                            />
                        </div>
                    </div>}

                {showDamageSection && (
                    <div className={`damage-roll-container damage-section ${combat.phase !== 'damage-roll' ? 'rolls-mini' : ''}`}>
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
                                    modifierValue={
                                        calculateEffectiveStats(
                                            hero.stats,
                                            combat.modifications.filter(m => m.modification.target === 'hero').map(m => m.modification)
                                        ).damageModifier ?? 0
                                    }
                                />
                            </div>
                        )}

                        {combat.winner === 'enemy' && (
                            <div className="enemy-damage-container">
                                <CombatDice
                                    label="Enemy Damage"
                                    values={combat.damageRolls}
                                    baseValue={Math.max(combat.enemy.stats.brawn, combat.enemy.stats.magic)}
                                    mode={combat.rerollState ? 'disabled' : 'normal'}
                                />
                            </div>
                        )}
                    </div>
                )}

                {combat.phase === 'round-end' && (
                    <div className="round-end-container damage-section">
                        <div className="round-end-content">
                            <div className="round-end-text">
                                {combat.additionalEnemyDamage && (
                                    combat.additionalEnemyDamage.map(d =>
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

                    {(combat.phase === 'combat-start') && (
                        <button className="btn btn-primary" onClick={generateSpeedRolls}>
                            Fight!
                        </button>
                    )}

                    {/* Speed or Damage Result Confirmation / Proceed Button */}
                    {combat.phase === 'speed-roll' && combat.heroSpeedRolls && (
                        combat.winner ?
                            <button className="btn btn-primary" onClick={commitSpeedResult}>
                                Procced to Damage Roll
                            </button> :
                            <button className="btn btn-primary" onClick={nextRound}>
                                End Round (Draw)
                            </button>
                    )}

                    {combat.phase === 'damage-roll' && showDamageConfirm && (
                        <button className="btn btn-primary" onClick={commitDamageResult}>
                            Confirm Damage & End Round
                        </button>
                    )}

                    {(combat.phase === 'round-end') && (
                        <button className="btn btn-primary" onClick={nextRound}>
                            Next Round
                        </button>
                    )}

                    <CombatAbilitySelector
                        combat={combat}
                        onActivateAbility={activateAbility}
                        onUseBackbackItem={useBackpackItem}
                    />
                </div>
            </div>

            <CombatLog logs={combat.logs} />

            {combat.phase === 'combat-end' && (
                <CombatResultDialog
                    result={combat.hero?.stats.health! <= 0 ? 'defeat' : 'victory'}
                    onAccept={() => {
                        if (!combat.hero) return;

                        let newHealth = 0;
                        if (combat.hero.stats.health <= 0) {
                            newHealth = 0; // Defeat
                        } else if (combat.enemy?.original?.preventHealing) {
                            newHealth = combat.hero.stats.health; // Prevent Healing
                        } else {
                            newHealth = hero.stats.maxHealth; // Full Restore
                        }

                        onCombatFinish({
                            health: newHealth,
                            backpack: combat.hero.original.backpack
                        });
                    }}
                    onRetry={() => {
                        // Restart combat with the same enemy, but fresh hero state (from props)
                        if (combat.enemy) {
                            startCombat(combat.enemy.original);
                        }
                    }}
                />
            )}
        </div>
    );
};

export default CombatArena;
