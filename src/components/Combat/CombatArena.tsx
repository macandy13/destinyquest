import React, { useState } from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import CombatDice from './CombatDice';
import './CombatArena.css';

interface CombatArenaProps {
    hero: Hero;
}

const CombatArena: React.FC<CombatArenaProps> = ({ hero }) => {
    const { combat, startCombat, nextRound, activateAbility, resolveSpeedRound, resolveDamageAndArmour } = useCombat(hero);
    const [, setDiceTotal] = useState<number | undefined>(undefined);

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

    // Auto-advance checking for combat-start might be needed, or we show a "Fight!" screen.
    // For now, let's treat 'combat-start' similar to 'speed-roll' but maybe with a "FIGHT" overlay or button.
    // To keep it simple and working: if phase is 'combat-start', show a "Start Round 1" button.

    const handleRoll = (total: number, rolls: number[]) => {
        setDiceTotal(total);
        // Phase logic
        if (combat.phase === 'speed-roll') {
            const enemyRoll1 = Math.floor(Math.random() * 6) + 1;
            const enemyRoll2 = Math.floor(Math.random() * 6) + 1;
            resolveSpeedRound({ heroRolls: rolls, enemyRolls: [enemyRoll1, enemyRoll2] });
        } else if (combat.phase === 'damage-roll') {
            resolveDamageAndArmour({ damageRoll: rolls[0], rolls: rolls });
        }
    };

    const enemyHealthPct = (combat.enemy.health / combat.enemy.maxHealth) * 100;
    const heroHealthPct = (combat.heroHealth / hero.stats.maxHealth) * 100;

    const getPhaseInstruction = () => {
        switch (combat.phase) {
            case 'combat-start': return "Enemy Found! Prepare to fight!";
            case 'speed-roll': return "Roll Speed (2d6) to execute turn";
            case 'damage-roll': return combat.winner === 'hero' ? "You won! Roll Damage (1d6)" : "Enemy won! Their Damage Roll...";
            case 'round-end': return "Round Complete. Proceed?";
            case 'combat-end': return "Combat Finished";
            default: return "";
        }
    };

    return (
        <div className="combat-arena">
            <div className="arena-header">
                <div className="text-dim round-indicator">Round {combat.round}</div>

                <div className="combatants">
                    {/* Hero Card */}
                    <div className="combatant-card">
                        <div className="combatant-name">{hero.name}</div>
                        <div className="health-bar-container">
                            <div className="health-bar" style={{ width: `${heroHealthPct}%` }}></div>
                        </div>
                        <div className="combatant-stats">
                            <div>{combat.heroHealth} / {hero.stats.maxHealth} HP</div>
                            <div>⚡ {hero.stats.speed} 💪 {hero.stats.brawn}</div>
                        </div>
                    </div>

                    {/* VS Separator */}
                    <div className="vs-separator">VS</div>

                    {/* Enemy Card */}
                    <div className="combatant-card enemy">
                        <div className="combatant-name">{combat.enemy.name}</div>
                        <div className="health-bar-container">
                            <div className="health-bar" style={{ width: `${enemyHealthPct}%` }}></div>
                        </div>
                        <div className="combatant-stats">
                            <div>{combat.enemy.health} / {combat.enemy.maxHealth} HP</div>
                            <div>⚡ {combat.enemy.speed} 💪 {combat.enemy.brawn}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="arena-center">
                {/* Active Abilities */}
                {combat.activeAbilities.length > 0 && (
                    <div className="mb-4" style={{ marginBottom: '1rem' }}>
                        <h4 className="text-sm uppercase tracking-wide text-dim mb-2" style={{ fontSize: '0.75rem', color: 'var(--dq-dim)', marginBottom: '0.5rem' }}>Abilities</h4>
                        <div className="flex flex-wrap gap-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
                            {combat.activeAbilities.map((ability, index) => (
                                <div key={index} className={`p-2 border rounded text-sm ${ability.used ? 'opacity-50' : ''}`} style={{ padding: '0.5rem', border: '1px solid var(--dq-border)', borderRadius: '4px', background: 'var(--dq-bg-card)', opacity: ability.used ? 0.5 : 1 }}>
                                    <div className="flex justify-between items-center gap-2" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="font-bold text-accent" style={{ color: 'var(--dq-gold)', fontWeight: 'bold' }}>{ability.name}</span>
                                        <span className="text-xs text-dim" style={{ fontSize: '0.7rem', color: 'var(--dq-dim)' }}>({ability.source})</span>
                                    </div>
                                    {!ability.used && (
                                        <button
                                            className="mt-1 text-xs px-2 py-1 rounded w-full"
                                            style={{ marginTop: '0.25rem', width: '100%', fontSize: '0.75rem', background: '#334155', color: 'white', border: 'none', cursor: 'pointer' }}
                                            onClick={() => activateAbility(ability.name)}
                                        >
                                            Use
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Modifiers Display */}
                {combat.modifiers.length > 0 && (
                    <div className="mb-4" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <h4 className="text-sm uppercase tracking-wide text-dim mb-2" style={{ fontSize: '0.75rem', color: 'var(--dq-dim)', marginBottom: '0.5rem' }}>Active Effects</h4>
                        <div className="space-y-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                            {combat.modifiers.map((mod, i) => (
                                <div key={i} className="text-xs text-info bg-slate-900/50 p-1 rounded" style={{ fontSize: '0.75rem', color: '#60a5fa', background: 'rgba(15, 23, 42, 0.5)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                    {mod.name}: +{mod.value} {mod.type.split('-')[0]} ({mod.duration} rounds left)
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Phase Instruction */}
                <div style={{ margin: '10px 0', textAlign: 'center', color: 'var(--dq-gold)' }}>
                    {getPhaseInstruction()}
                </div>

                {/* SPEED PHASE: Dual Dice Display */}
                {/* Class speed-rolls-mini shrinks dice when not in speed-roll phase */}
                <div className={`speed-rolls ${combat.phase !== 'speed-roll' ? 'speed-rolls-mini' : ''}`} style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', marginBottom: '20px', transition: 'all 0.5s ease' }}>
                    <div className="hero-dice">
                        <CombatDice
                            label="Your Speed"
                            count={2}
                            values={combat.heroSpeedRolls} // Persist if exists
                            onRoll={combat.phase === 'speed-roll' ? handleRoll : undefined} // Only interactive in speed phase and if not already rolled (implied by lack of values check but onRoll handles it)
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

                {/* DAMAGE PHASE: Single Die Display */}
                {(combat.phase === 'damage-roll' || (combat.phase === 'round-end' && combat.damageRolls)) && (
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
                                    onRoll={combat.phase === 'damage-roll' ? (total, rolls) => handleRoll(total, rolls) : undefined}
                                />
                            </div>
                        )}

                        {combat.winner === 'enemy' && (
                            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                {combat.phase === 'damage-roll' ? (
                                    <>
                                        <p className="text-dim">Enemy is attacking...</p>
                                        <button className="btn-primary" onClick={() => {
                                            const dmg = Math.floor(Math.random() * 6) + 1;
                                            handleRoll(dmg, [dmg]);
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
                    </div>
                )}

                {(combat.phase === 'round-end' || combat.phase === 'combat-start') && (
                    <button className="btn-primary btn-next-round" onClick={nextRound}>{combat.phase === 'combat-start' ? 'Fight!' : 'Next Round'}</button>
                )}
            </div>

            <div className="combat-log">
                {[...combat.logs].reverse().map((log, i) => (
                    <div key={i} className={`log-entry ${log.type}`}>
                        [{log.round}] {log.message}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CombatArena;
