import { AbilityDefinition, AbilityType } from '../abilityRegistry';
import { CombatState } from '../../types/combat';
import { Modification } from '../../types/character';
import { addLogs } from '../../utils/statUtils';
import { rollDice, sumDice } from '../../utils/dice';
import { Stats, StatsModification, CharacterType, getOpponent } from '../../types/stats';

export interface StatModifierAbilityConfig {
    name: string;
    icon?: string;
    description: string;
    type: AbilityType;
    stats: Partial<Stats>,
    target: CharacterType,
    duration?: number,
    canActivate?: (state: CombatState, owner: CharacterType) => boolean;
}

export function createStatModification(
    state: CombatState,
    config: {
        name: string,
        description: string,
        stats: Partial<Stats>,
        target: CharacterType,
        duration?: number
    }): Partial<CombatState> {
    return {
        modifications: [{
            duration: config.duration,
            modification: {
                id: `${config.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${state.round}`,
                stats: config.stats,
                target: config.target,
                source: config.name,
            } as StatsModification,
        } as Modification],
        logs: [{
            round: state.round ?? 0,
            message: `Used ability: ${config.name} (${config.description})`,
            type: 'info'
        }]
    };
}

export function createStatModifierAbility(config: StatModifierAbilityConfig): AbilityDefinition {
    return {
        name: config.name,
        type: config.type,
        description: config.description,
        icon: config.icon,
        canActivate: config.canActivate,
        onActivate: (state: CombatState, owner: CharacterType) => {
            if (config.canActivate && !config.canActivate(state, owner)) {
                return {};
            }
            return createStatModification(state, config);
        }
    };
}

export interface DamageBlockerAbilityConfig {
    name: string;
    icon?: string;
    description: string;
    type: AbilityType;
    blockMessage?: string; // Message to log, e.g. "Opponent's attack blocked!"
    counterDamageDice?: number; // Number of dice to roll for counter damage (deflect/brutality)
    canActivate?: (state: CombatState, owner: CharacterType) => boolean;
}

export function createDamageBlockerAbility(config: DamageBlockerAbilityConfig): AbilityDefinition {
    const checker = config.canActivate || isEnemyDamageRollPhase;
    return {
        name: config.name,
        type: config.type,
        description: config.description,
        icon: config.icon,
        canActivate: checker,
        onActivate: (state: CombatState, owner: CharacterType) => {
            if (!checker(state, owner)) return null;

            let logMessage = `Used ability: ${config.name}.`;
            if (config.blockMessage) {
                logMessage += ` ${config.blockMessage}`;
            } else if (!config.counterDamageDice) {
                logMessage += " Opponent's attack blocked!";
            }

            const updates: Partial<CombatState> = {
                phase: 'round-end',
                damageRolls: [{ value: 0, isRerolled: false }],
            };

            let logs = state.logs;

            if (config.counterDamageDice) {
                const dmgRolls = rollDice(config.counterDamageDice);
                const dmg = sumDice(dmgRolls);
                const rolls = dmgRolls.map(r => r.value);

                updates.damageDealt = [...state.damageDealt, { target: 'enemy', amount: dmg, source: config.name }];

                // Override log message for counter damage abilities to match existing behavior
                // "Brutality! Blocked attack and inflicted X damage (Y+Z)."
                logMessage = `${config.name}! Blocked attack and inflicted ${dmg} damage (${rolls.join('+')}).`;
                logs = addLogs(logs, {
                    round: state.round,
                    message: logMessage,
                    type: 'damage-hero'
                });
            } else {
                logs = addLogs(logs, { round: state.round, message: logMessage, type: 'info' });
            }

            updates.logs = logs;
            return updates;
        }
    };
}

export function isHeroDamageRollPhase(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'hero';
};

export function isEnemyDamageRollPhase(state: CombatState): boolean {
    return state.phase === 'damage-roll' && state.winner === 'enemy';
};

export function isOpponentDamageRollPhase(state: CombatState, owner: CharacterType): boolean {
    return state.phase === 'damage-roll' && state.winner === getOpponent(owner);
};