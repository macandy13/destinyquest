import React from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import CombatDice from './CombatDice';
import CombatLog from './CombatLog';
import CombatantCard from './CombatantCard';
import CombatAbilitySelector from './CombatAbilitySelector';
import CombatModifiers from './CombatModifiers';
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
        // resolveSpeedRound, // Removed as we use auto-rolls now
        // resolveDamageAndArmour, // Replaced by execute/commit split
        executeDamageRoll,
        commitDamageResult,
        handleReroll,
        executeSpeedRoll,
        commitSpeedResult,
        // resolveSpeedRound // Kept if needed for manual calls or tests, but UI primarily uses execute/commit
    } = useCombat(hero);

    if (combat.phase === 'combat-start' && !combat.enemy) {
        return (
            <div className="dq-card combat">
                <h2 className="dq-card-title">Combat</h2>
                <p className="text-dim">Prepare for battle...</p>
                <button className="btn-primary" onClick={startCombat}>Find Enemy</button>
            </div>
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
                        isEnemy={true}
                    />
                </div>

                <CombatModifiers modifiers={combat.modifiers} />
            </div>

            <div className="arena-center">
                <CombatAbilitySelector
                    combat={combat}
                    onActivate={activateAbility}
                />

                {/* Phase Instruction */}
                <div style={{ margin: '10px 0', textAlign: 'center', color: 'var(--dq-gold)' }}>
                    {getPhaseInstruction()}
                </div>

                {/* SPEED PHASE: Dual Dice Display */}
                {/* Only show if we have rolls and not in start phase */}
                <div className={`speed-rolls ${combat.phase !== 'speed-roll' ? 'speed-rolls-mini' : ''}`}
                    style={{
                        display: showSpeedDice ? 'flex' : 'none',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start',
                        marginBottom: '20px',
                        transition: 'all 0.5s ease'
                    }}>
                    <div className="hero-dice">
                        <CombatDice
                            label="Your Speed"
                            count={2}
                            values={combat.heroSpeedRolls} // Persist if exists
                            onRoll={undefined} // Fully automated now, no manual roll
                            onDieClick={combat.pendingInteraction?.target === 'hero-speed' ? (i) => handleReroll(i) : undefined}
                            result={combat.heroSpeedRolls ? combat.heroSpeedRolls.reduce((a, b) => a + b, 0) + hero.stats.speed : undefined}
                        />
                        {/* Only show result modifier text if rolled */}
                        {combat.heroSpeedRolls && (
                            <div className="text-center text-dim" style={{ fontSize: '0.8rem' }}>
                                {combat.heroSpeedRolls.reduce((a, b) => a + b, 0)} + {hero.stats.speed} (Spd)
                            </div>
                        )}
                    </div>

                    <div className="enemy-dice">
                        <CombatDice
                            label="Enemy Speed"
                            count={2}
                            values={combat.enemySpeedRolls}
                            result={combat.enemySpeedRolls ? combat.enemySpeedRolls.reduce((a, b) => a + b, 0) + combat.enemy.speed : undefined}
                        />
                        {combat.enemySpeedRolls && (
                            <div className="text-center text-dim" style={{ fontSize: '0.8rem' }}>
                                {combat.enemySpeedRolls.reduce((a, b) => a + b, 0)} + {combat.enemy.speed} (Spd)
                            </div>
                        )}
                    </div>
                </div>

                {/* Result Confirmation / Proceed Button */}
                {combat.phase === 'speed-roll' && combat.heroSpeedRolls && (
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <button className="btn-primary" onClick={commitSpeedResult}>
                            {combat.winner ? 'Proceed' : 'End Round (Draw)'}
                        </button>
                    </div>
                )}

                {/* DAMAGE PHASE: Single Die Display */}
                {showDamageSection && (
                    <div className="damage-roll-container" style={{ borderTop: '1px solid #333', paddingTop: '20px', marginTop: '10px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '10px', color: 'var(--dq-gold)' }}>
                            {combat.phase === 'damage-roll'
                                ? (combat.winner === 'hero' ? '💥 ROLL FOR DAMAGE!' : '🛡️ BRACE FOR IMPACT!')
                                : (combat.winner === 'hero' ? '💥 HERO HIT:' : '🛡️ ENEMY HIT:')
                            }
                        </div>

                        {combat.winner === 'hero' && (
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <CombatDice
                                    label="Damage (1d6)"
                                    count={1}
                                    values={combat.damageRolls} // Show result if exists
                                    onRoll={undefined}
                                    onDieClick={combat.pendingInteraction?.target === 'damage' ? (i) => handleReroll(i) : undefined}
                                />
                            </div>
                        )}

                        {combat.winner === 'enemy' && (
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                {combat.phase === 'damage-roll' && !combat.damageRolls ? (
                                    <>
                                        <p className="text-dim">Enemy is attacking...</p>
                                        <button className="btn-primary" onClick={() => {
                                            const enemyDamageRoll = Math.floor(Math.random() * 6) + 1;
                                            executeDamageRoll([enemyDamageRoll]);
                                        }}>Resolve Enemy Attack</button>
                                    </>
                                ) : (
                                    // Show enemy result in round-end
                                    <CombatDice
                                        label="Enemy Damage"
                                        count={1}
                                        values={combat.damageRolls}
                                    />
                                )}
                            </div>
                        )}

                        {/* Confirm Damage Button */}
                        {showDamageConfirm && (
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <button className="btn-primary" onClick={commitDamageResult}>
                                    Confirm Damage & End Round
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {(combat.phase === 'round-end' || combat.phase === 'combat-start') && (
                    <button className="btn-primary btn-next-round" onClick={combat.phase === 'combat-start' ? executeSpeedRoll : nextRound}>
                        {combat.phase === 'combat-start' ? 'Fight!' : 'Next Round'}
                    </button>
                )}
            </div>

            <CombatLog logs={combat.logs} />
        </div>
    );
};

export default CombatArena;
