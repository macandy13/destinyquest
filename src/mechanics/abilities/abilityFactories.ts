import { AbilityContext, AbilityDefinition } from '../abilityRegistry';
import { addLogs, appendEffect, CombatState } from '../../types/CombatState';
import { rollDice, sumDice } from '../../types/Dice';
import { AbilityType } from '../../types/AbilityDescription';
import { CharacterType, getOpponent } from '../../types/Character';
import { Effect } from '../../types/Effect';
import { getStatIcon, Stats } from '../../types/Stats';

export type TargetType = 'hero' | 'enemy' | 'owner' | 'opponent' | 'winner' | 'loser';

function resolveTarget(target: TargetType, state: CombatState, context: AbilityContext): CharacterType {
    switch (target) {
        case 'hero':
            return 'hero';
        case 'enemy':
            return 'enemy';
        case 'owner':
            return context.owner;
        case 'opponent':
            return getOpponent(context.owner);
        case 'winner':
            return state.winner!;
        case 'loser':
            return getOpponent(state.winner!);
    }
}

export interface StatModifierAbilityConfig {
    name: string;
    icon?: string;
    description: string;
    type: AbilityType;
    effect?: Effect;
    // Backward compatibility for easier definition
    stats?: Partial<Stats>;
    duration?: number;
    target?: TargetType;
    canActivate?: (state: CombatState, context: AbilityContext) => boolean;
}

export function createStatModifierAbility(config: StatModifierAbilityConfig): AbilityDefinition {
    return {
        name: config.name,
        type: config.type,
        description: config.description,
        icon: config.icon,
        canActivate: config.canActivate,
        onActivate: (state: CombatState, context: AbilityContext): CombatState => {
            if (config.canActivate && !config.canActivate(state, context)) {
                return state;
            }

            const target = resolveTarget(config.target || context.owner, state, context);
            const effect: Effect = config.effect || {
                source: config.name,
                target: target,
                stats: config.stats || {},
                duration: config.duration,
            };

            return appendEffect(state, target, effect);
        }
    };
}

export function createSpeedDiceModifier(config: {
    name: string,
    description: string,
    target: TargetType,
    speedModifier: number,
    duration?: number,
    type?: AbilityType,
}): AbilityDefinition {
    return createStatModifierAbility({
        name: config.name,
        description: config.description,
        icon: getStatIcon('speed'),
        target: config.target,
        canActivate: canModifySpeed,
        stats: { speedDice: config.speedModifier },
        duration: config.duration,
        type: config.type ?? 'speed',
    });
}

export function createDamageDiceModifier(config: {
    name: string,
    description: string,
    target: TargetType,
    damageModifier: number,
    duration?: number,
    type?: AbilityType,
}): AbilityDefinition {
    return createStatModifierAbility({
        name: config.name,
        description: config.description,
        icon: getStatIcon('die'),
        target: config.target,
        canActivate: canModifyDamage,
        stats: { damageDice: config.damageModifier },
        duration: config.duration,
        type: config.type ?? 'combat',
    });
}


export interface DamageBlockerAbilityConfig {
    name: string;
    icon?: string;
    description: string;
    type: AbilityType;
    blockMessage?: string; // Message to log, e.g. "Opponent's attack blocked!"
    counterDamageDice?: number; // Number of dice to roll for counter damage (deflect/brutality)
    canActivate?: (state: CombatState, context: AbilityContext) => boolean;
}

export function createDamageBlockerAbility(config: DamageBlockerAbilityConfig): AbilityDefinition {
    const checker = config.canActivate || isEnemyDamageRollPhase;
    return {
        name: config.name,
        type: config.type,
        description: config.description,
        icon: config.icon,
        canActivate: checker,
        onActivate: (state: CombatState, context: AbilityContext): CombatState => {
            if (!checker(state, context)) return state;

            let logMessage = `Used ability: ${config.name}.`;
            if (config.blockMessage) {
                logMessage += ` ${config.blockMessage}`;
            } else if (!config.counterDamageDice) {
                logMessage += " Opponent's attack blocked!";
            }

            // Correctly structure damage rolls within the 'damage' object
            // and use bonusDamage instead of damageDealt
            const updates: Partial<CombatState> = {
                phase: 'round-end',
                damage: {
                    damageRolls: [{ value: 0, isRerolled: false }],
                    modifiers: []
                }
            };

            let logs = state.logs;

            if (config.counterDamageDice) {
                const dmgRolls = rollDice(config.counterDamageDice);
                const dmg = sumDice(dmgRolls);
                const rolls = dmgRolls.map(r => r.value);

                updates.bonusDamage = [...state.bonusDamage, { target: 'enemy', amount: dmg, source: config.name }];

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
            return {
                ...state,
                ...updates
            };
        }
    };
}

export function canModifySpeed(state: CombatState): boolean {
    return ['combat-start', 'round-start'].includes(state.phase);
}

export function canModifySpeedDice(state: CombatState): boolean {
    return ['combat-start', 'round-start', 'speed-roll'].includes(state.phase);
}

export function canModifyDamage(state: CombatState): boolean {
    return ['damage-roll'].includes(state.phase);
}

export function canModifyDamageDice(state: CombatState): boolean {
    return ['combat-start', 'round-start', 'damage-roll'].includes(state.phase);
}

export function canModifyRolledDice(state: CombatState): boolean {
    return ['speed-roll', 'damage-roll'].includes(state.phase);
}

export function isHeroDamageRollPhase(state: CombatState): boolean {
    return canModifyDamage(state) && state.winner === 'hero';
};

export function isEnemyDamageRollPhase(state: CombatState): boolean {
    return canModifyDamage(state) && state.winner === 'enemy';
};

export function isOwnerDamageRollPhase(state: CombatState, context: AbilityContext): boolean {
    return canModifyDamage(state) && state.winner === context.owner;
};

export function isOpponentDamageRollPhase(state: CombatState, context: AbilityContext): boolean {
    return canModifyDamage(state) && state.winner === getOpponent(context.owner);
};