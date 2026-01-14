import { AbilityContext, AbilityDefinition } from '../abilityRegistry';
import { addLogs, appendEffect, CombatState, dealDamage, skipDamagePhase } from '../../types/combatState';
import { formatDice, rollDice, sumDice, DiceRoll } from '../../types/dice';
import { AbilityType } from '../../types/abilityDescription';
import { CharacterType, getOpponent } from '../../types/character';
import { Effect } from '../../types/effect';
import { getStatIcon, Stats } from '../../types/stats';

export type TargetType = 'hero' | 'enemy' | 'owner' | 'opponent' | 'winner' | 'loser';

export function resolveTarget(state: CombatState, context: AbilityContext, target: TargetType): CharacterType {
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

export function canModifyArmour(state: CombatState): boolean {
    return ['combat-start', 'round-start', 'apply-damage'].includes(state.phase);
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

export interface StatModifierAbilityConfig {
    name: string;
    description: string;
    type: AbilityType;
    icon?: string; // Add icon too if missing and used
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

            const target = resolveTarget(state, context, config.target || context.owner);
            const effect: Effect = config.effect || {
                source: config.name,
                target: target,
                stats: config.stats || {},
                duration: config.duration,
                icon: config.icon // Use the icon from config
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

export function modifySpeedRolls(
    state: CombatState,
    target: CharacterType,
    modifier: (rolls: DiceRoll[]) => DiceRoll[]
): CombatState {
    const propName = target === 'hero' ? 'heroSpeedRolls' : 'enemySpeedRolls';
    const oldRolls = state[propName];
    if (!oldRolls) return state;

    const newRolls = modifier([...oldRolls]);
    state = {
        ...state,
        [propName]: newRolls
    };
    state = addLogs(state, {
        message: `${target} speed dice modified: ${formatDice(oldRolls)} -> ${formatDice(newRolls)}`,
    });
    return state;
}

export interface ReactionAbilityConfig {
    name: string;
    description: string;
    type: AbilityType;
    icon?: string;
    damageDice?: number; // Number of dice to roll for counter damage. If 0/undefined, no damage dealing.
    canActivate?: (state: CombatState, context: AbilityContext) => boolean;
}

export function createReactionAbility(config: ReactionAbilityConfig): AbilityDefinition {
    const checker = config.canActivate || isOpponentDamageRollPhase;
    return {
        name: config.name,
        type: config.type ?? 'combat',
        description: config.description,
        icon: config.icon,
        canActivate: checker,
        onActivate: (state: CombatState, context: AbilityContext): CombatState => {
            if (!checker(state, context)) return state;

            const blockMsg = `Ability ${config.name} blocked damage`;
            state = skipDamagePhase(state, blockMsg);

            if (config.damageDice && config.damageDice > 0) {
                const dmgRolls = rollDice(config.damageDice);
                const dmg = sumDice(dmgRolls);
                state = dealDamage(
                    state,
                    config.name,
                    getOpponent(context.owner),
                    dmg,
                    `Counter damage from ${config.name}: ${formatDice(dmgRolls)}=${dmg}`
                );
            }
            return state;
        }
    };
}

export interface RetaliationAbilityConfig {
    name: string;
    description: string;
    type: AbilityType;
    icon?: string;
    damageDice?: number; // Number of dice to roll for counter damage. If 0/undefined, no damage dealing.
    damage?: number; // Fixed damage to deal.
    canActivate?: (state: CombatState, context: AbilityContext) => boolean;
}

export function createRetaliationAbility(config: RetaliationAbilityConfig): AbilityDefinition {
    return {
        name: config.name,
        type: config.type ?? 'combat',
        description: config.description,
        icon: config.icon,
        canActivate: config.canActivate,
        onDamageDealt: (state: CombatState, context: AbilityContext, _source: string, damage: number): CombatState => {
            if (context.owner !== context.target || damage <= 0) return state;

            const blockMsg = `Ability ${config.name} blocked damage`;
            state = skipDamagePhase(state, blockMsg);

            const damageSources = [];
            let totalDamage = 0;
            if (config.damage) {
                damageSources.push(`${config.damage}`);
                totalDamage += config.damage;
            }
            if (config.damageDice && config.damageDice > 0) {
                const dmgRolls = rollDice(config.damageDice);
                totalDamage += sumDice(dmgRolls);
            }
            if (totalDamage > 0) {
                state = dealDamage(
                    state,
                    config.name,
                    getOpponent(context.owner),
                    totalDamage,
                    `Counter damage from ${config.name}: ${damageSources.join('+')} = ${totalDamage}`
                );
            }
            return state;
        }
    };
}
