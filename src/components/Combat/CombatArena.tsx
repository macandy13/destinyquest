import React from 'react';
import { useCombat } from '../../hooks/useCombat';
import { Hero } from '../../types/hero';
import { Enemy } from '../../types/character';
import CombatDice from './CombatDice';
import CombatLog from './CombatLog';
import CombatantCard from './CombatantCard';
import CombatAbilitySelector from './CombatAbilitySelector';
import CombatModifiers from './CombatModifiers';
import CombatResultDialog from './CombatResultDialog';
import { calculateEffectiveStats } from '../../types/effect';
import { BackpackItem } from '../../types/hero';
import './CombatArena.css';

interface CombatArenaProps {
    hero: Hero;
    enemy: Enemy;
    onCombatFinish: (results: { health: number, backpack: (BackpackItem | null)[] }) => void;
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
        handleReroll,
        nextRound,
        endCombat,
        restartCombat
    } = useCombat(hero, enemy);

    const getPhaseInstruction = () => {
        switch (combat.phase) {
            case 'combat-start': return "Prepare to fight!";
            case 'speed-roll':
                switch (combat.winner) {
                    case 'hero': return "Hero wins speed! Proceed to damage?";
                    case 'enemy': return "Enemy wins speed! Brace for impact.";
                    case null: return "Draw! No damage.";
                }
                break;
            case 'damage-roll':
                return "Confirm Damage?";
            case 'round-end': return "Round Complete.";
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

                <CombatModifiers
                    modifications={
                        [
                            ...combat.hero.activeEffects,
                            ...combat.enemy.activeEffects]
                    } />
            </div>

            <div className="arena-center">
                {combat.phase === 'speed-roll' &&
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
                                        combat.hero.activeEffects
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

                {combat.phase === 'damage-roll' && (
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
                                    values={combat.damage?.damageRolls} // Show result if exists
                                    onDieClick={combat.rerollState?.target === 'damage' ? (i) => handleReroll(i) : undefined}
                                    mode={combat.rerollState?.target === 'damage' ? 'select-die' : (combat.rerollState ? 'disabled' : 'normal')}
                                    baseValue={Math.max(hero.stats.brawn, hero.stats.magic)}
                                    modifierValue={
                                        calculateEffectiveStats(
                                            hero.stats,
                                            combat.hero.activeEffects
                                        ).damageModifier ?? 0
                                    }
                                />
                            </div>
                        )}

                        {combat.winner === 'enemy' && (
                            <div className="enemy-damage-container">
                                <CombatDice
                                    label="Enemy Damage"
                                    values={combat.damage?.damageRolls}
                                    baseValue={Math.max(combat.enemy.stats.brawn, combat.enemy.stats.magic)}
                                    mode={combat.rerollState ? 'disabled' : 'normal'}
                                />
                            </div>
                        )}
                    </div>
                )}

                {combat.phase === 'passive-damage' && (
                    <div className="round-end-container damage-section">
                        <div className="round-end-content">
                            <div className="round-end-text">
                                {combat.bonusDamage && (
                                    combat.bonusDamage.map(d =>
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

                    {(combat.phase === 'combat-start' || combat.phase === 'round-start') && (
                        <button className="btn btn-primary" onClick={rollSpeedDice}>
                            Roll Speed Dice
                        </button>
                    )}

                    {/* Speed or Damage Result Confirmation / Proceed Button */}
                    {combat.phase === 'speed-roll' && (
                        combat.winner ?
                            <button className="btn btn-primary" onClick={commitSpeedAndRollDamageDice}>
                                Roll Damage Dice
                            </button> :
                            <button className="btn btn-primary" onClick={confirmBonusDamage}>
                                Apply Passive Abilities
                            </button>
                    )}

                    {combat.phase === 'damage-roll' && (
                        <button className="btn btn-primary" onClick={confirmDamageRoll}>
                            Apply Damage
                        </button>
                    )}

                    {(combat.phase === 'apply-damage') && (
                        <button className="btn btn-primary" onClick={confirmBonusDamage}>
                            Apply Passive Abilities
                        </button>
                    )}
                    {(['passive-damage', 'end-round'].includes(combat.phase) && (
                        <button className="btn btn-primary" onClick={nextRound}>
                            Next Round
                        </button>
                    ))}

                    {(combat.phase === 'combat-end') && (
                        <button className="btn btn-primary" onClick={endCombat}>
                            End Combat
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
                        restartCombat();
                    }}
                />
            )}
        </div>
    );
};

export default CombatArena;
