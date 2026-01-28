import { AbilityDefinition, getAbilityDefinition, toCanonicalName } from '../mechanics/abilityRegistry';
import { AbilityDescription, AbilityType } from './abilityDescription';
import { Character, Enemy, CharacterType, getOpponent } from './character';
import { CombatLog, getDamageType } from './combatLog';
import { DiceRoll, formatDice, sumDice } from './dice';
import { Effect, applyStatsModification, formatEffect } from './effect';
import { Hero, BackpackItem, EquipmentItem, EquipmentSlot } from './hero';
import { Stats } from './stats';

export type CombatPhase = 'combat-start' | 'round-start' | 'speed-roll' | 'damage-roll' | 'apply-damage' | 'passive-damage' | 'round-end' | 'combat-end';

export const AttackSource = 'Attack';

// Target for enemy-specific operations
export type EnemyTarget = number | 'main';

// Selector for any combatant (replaces CharacterType in targeting contexts)
export interface CombatantSelector {
    type: CharacterType;
    enemyIndex?: number;  // Only used when type === 'enemy', defaults to 0
}

export interface ActiveAbility {
    name: string;
    owner: CharacterType;
    def: AbilityDescription;
    uses?: number,
    // TODO: Needed?
    sources?: EquipmentItem[];
}

export interface Combatant<T extends Character = Character> {
    type: CharacterType;
    id: string; // Unique identifier in combat (e.g. 'hero', 'enemy-1')
    name: string;
    stats: Stats;
    // We retain a reference to the original character object for accessing static data/metadata
    original: T;
    // Maps from ability name to active (non-used) abilities in a combat.
    activeAbilities: Map<string, ActiveAbility>;
    /* Active effects, both buffs and debuffs */
    activeEffects: Effect[];
}

export interface DamageDescriptor {
    source: string;
    target: CharacterType;
    amount: number;
}

export interface AttackDamageDescriptor {
    damageRolls: DiceRoll[];
    modifiers: DamageDescriptor[];
}

export type InteractionType = 'dice' | 'choices';

export interface InteractionRequest {
    type: InteractionType;
    target?: CharacterType;
    mode: 'select';
    count: number;
    choices?: string[];
}

export interface InteractionResponse {
    request: InteractionRequest;
    selectedIndexes: number[];
}

export interface PendingInteraction {
    ability: ActiveAbility;
    requests: InteractionRequest[];
    callback: (state: CombatState, response: InteractionResponse[]) => CombatState;
}

export interface CombatState {
    enemies: Combatant<Enemy>[];
    activeEnemyIndex: number;  // Currently displayed enemy in UI
    hero: Combatant<Hero>;

    round: number;
    phase: CombatPhase;
    logs: CombatLog[];

    // Available items in the backpack (hero.original.backpack will not be modified).
    backpack: BackpackItem[];

    /* 
     * Speed rolls of the hero and the enemy.
     * Always set beginning with the speed-roll phase.
     */
    heroSpeedRolls?: DiceRoll[];
    enemySpeedRolls?: DiceRoll[];

    /* 
     * Winner of the current speed round. 
     * Will be determined beginning with the speed-roll phase. 
     */
    winner?: CharacterType | null;

    /* 
     * Damage rolls of the winner of the round.
     * Will be set beginning with the damage-roll phase.
     */
    damage?: AttackDamageDescriptor;

    /* Damage dealt during the current round */
    damageDealt: DamageDescriptor[];

    /* Pending interaction request from an ability */
    pendingInteraction?: PendingInteraction;

    /* Abilities used in the current round */
    usedAbilities?: { name: string; type: AbilityType }[];

    /* Items used in the current round */
    itemsUsedThisRound?: number;
}

const activeAbilities = new Set<string>();

export function forEachActiveAbility(
    state: CombatState,
    callback: (ability: ActiveAbility, def: AbilityDefinition) => void
) {
    const allAbilities = [
        ...state.hero.activeAbilities.values(),
        ...state.enemies.flatMap(e => [...e.activeAbilities.values()])
    ];
    allAbilities.forEach(ability => {
        const def = getAbilityDefinition(ability.name);
        // Avoid recursion during ability processing.
        if (!def || activeAbilities.has(ability.name)) return;
        activeAbilities.add(ability.name);
        callback(ability, def);
        activeAbilities.delete(ability.name);
    });
}

export function runOnDamageDealtHooks(state: CombatState, victim: CharacterType, source: string, amount: number): CombatState {
    forEachActiveAbility(state, (ability, def) => {
        if (def.onDamageDealt) {
            state = def.onDamageDealt(state, { ability, owner: ability.owner, target: victim }, source, amount);
        }
    });
    return state;
}

function setStats(state: CombatState, target: CharacterType, stats: Partial<Stats>): CombatState {
    const char = getCombatant(state, target);
    const newChar = {
        ...char,
        stats: {
            ...char.stats,
            ...stats
        }
    };
    return updateCombatant(state, target, newChar);
}

function runOnDamageRollHooks(state: CombatState): CombatState {
    const looser = getOpponent(state.winner!);
    forEachActiveAbility(state, (ability, def) => {
        if (def.onDamageRoll && state.damage?.damageRolls) {
            state = def.onDamageRoll(state, { ability, owner: ability.owner, target: looser });
        }
    });
    return state;
}

function runOnDamageCalculateHooks(state: CombatState,): CombatState {
    const victim = getOpponent(state.winner!);
    forEachActiveAbility(state, (ability, def) => {
        if (def.onDamageCalculate && state.damage?.damageRolls) {
            const mod = def.onDamageCalculate(state, { ability, owner: ability.owner, target: victim });
            if (mod) {
                const newModifiers = [...state.damage!.modifiers, {
                    amount: mod,
                    source: def.name,
                    target: victim
                }];
                state = {
                    ...state,
                    damage: {
                        ...state.damage!,
                        modifiers: newModifiers
                    }
                };
                state = addLogs(state, {
                    message: `Added damage modifier ${mod} from ${def.name}`,
                });
            }
        }
    });
    return state;
}

export function setDamageRoll(state: CombatState, damageRolls?: DiceRoll[]): CombatState {
    state = {
        ...state,
        phase: 'damage-roll',
        damage: {
            damageRolls: damageRolls ?? state.damage!.damageRolls!,
            modifiers: [],
        }
    };
    state = addLogs(state, {
        message: `Damage roll: ${formatDice(state.damage!.damageRolls!)}=${sumDice(state.damage!.damageRolls!)}`,
    });
    state = runOnDamageRollHooks(state);
    state = runOnDamageCalculateHooks(state);
    return state;
}

export function modifyDamageRolls(state: CombatState, damageRolls: DiceRoll[], source: string): CombatState {
    const originalRolls = state.damage!.damageRolls;
    state = {
        ...state,
        damage: {
            ...state.damage!,
            damageRolls,
            modifiers: [],
        }
    };
    state = addLogs(state, {
        message: `Damage roll modified by (${source}). Changed from ${formatDice(originalRolls!)} to ${formatDice(damageRolls)}`,
    });
    state = runOnDamageRollHooks(state);
    state = runOnDamageCalculateHooks(state);
    return state;
}

export function dealDamage(state: CombatState, source: string, target: CharacterType, amount: number, message?: string): CombatState {
    const targetChar = getCombatant(state, target);
    if (!targetChar) return state;
    if (targetChar.stats.health <= 0) return state;
    const actualDamage = Math.min(amount, targetChar.stats.health);
    state = setStats(state, target, {
        health: targetChar.stats.health - actualDamage,
    });
    // Record damage dealt
    state = {
        ...state,
        damageDealt: [
            ...state.damageDealt,
            { target, source, amount: actualDamage }
        ]
    };
    state = addLogs(state, {
        message: message ?? `${source} dealt ${actualDamage} damage to ${targetChar.name}`,
        type: getDamageType(target)
    });
    state = runOnDamageDealtHooks(state, target, source, actualDamage);
    return state;
}

export function healDamage(state: CombatState, source: string, target: CharacterType, amount: number, message?: string): CombatState {
    const targetChar = getCombatant(state, target);
    if (!targetChar) return state;
    if (targetChar.stats.health === targetChar.stats.maxHealth) return state;
    const actualHealed = Math.min(amount, targetChar.stats.maxHealth - targetChar.stats.health);
    state = setStats(state, target, {
        health: targetChar.stats.health + actualHealed,
    });
    state = addLogs(state, {
        message: message ?? `${source} healed ${actualHealed} health to ${targetChar.name}`,
        type: getDamageType(target)
    });
    return state;
}

export function requireAbilityDefinition(name: string): AbilityDefinition {
    const def = getAbilityDefinition(name);
    if (!def) throw new Error(`Ability ${name} not found`);
    return def;
}

export function addAbility(combatant: any, def: AbilityDefinition, item?: EquipmentItem): ActiveAbility {
    let activeAbility: ActiveAbility;
    const canonical = toCanonicalName(def.name);
    if (combatant.activeAbilities.has(canonical)) {
        activeAbility = combatant.activeAbilities.get(canonical)!;
    } else {
        activeAbility = {
            name: def.name,
            owner: combatant.type,
            def,
        };
        combatant.activeAbilities.set(canonical, activeAbility);
    }
    switch (def.type) {
        case 'speed':
        case 'combat':
        case 'modifier':
        case 'special':
            activeAbility.uses = (activeAbility.uses ?? 0) + (def.uses ?? 1);
            break;
        default:
            break;
    }
    if (item) activeAbility!.sources = [...(activeAbility!.sources ?? []), item];
    return activeAbility;
};

// Helper to get active abilities map for a combatant (returns a copy if we need to mutate)
function cloneActiveAbilities(activeAbilities: Map<string, ActiveAbility>): Map<string, ActiveAbility> {
    return new Map(activeAbilities);
}

// Helper to update a combatant's active abilities in the state
function updateCombatantActiveAbilities(state: CombatState, target: CharacterType, newAbilities: Map<string, ActiveAbility>): CombatState {
    const char = getCombatant(state, target);
    const newChar = { ...char, activeAbilities: newAbilities };
    return updateCombatant(state, target, newChar);
}

export function useAbility(state: CombatState, target: CharacterType, name: string) {
    const char = getCombatant(state, target);
    const canonicalName = toCanonicalName(name);
    const originalAbility = char.activeAbilities.get(canonicalName);

    if (!originalAbility) return state;

    const newActiveAbilities = cloneActiveAbilities(char.activeAbilities);
    const newAbility = { ...originalAbility };
    newAbility.uses!--;
    if (newAbility.uses === 0) {
        newActiveAbilities.delete(canonicalName);
    } else {
        newActiveAbilities.set(canonicalName, newAbility);
    }

    return updateCombatantActiveAbilities(state, target, newActiveAbilities);
}

export function hasAbility(state: CombatState, target: CharacterType, name: string) {
    const activeAbilities = getCombatant(state, target).activeAbilities;
    const canonicalName = toCanonicalName(name);
    for (const key of activeAbilities.keys()) {
        if (key === canonicalName) return true;
    }
    return false;
}

export function hasEffect(state: CombatState, target: CharacterType, source: string) {
    return getCombatant(state, target).activeEffects.some(e => e.source === source);
}

export function getEffect(state: CombatState, target: CharacterType, source: string) {
    return getCombatant(state, target).activeEffects.find(e => e.source === source);
}

export function appendEffect(state: CombatState, target: CharacterType, effect: Effect) {
    const char = getCombatant(state, target);
    const newChar = {
        ...char,
        activeEffects: [
            ...char.activeEffects,
            effect,
        ]
    };
    state = updateCombatant(state, target, newChar);
    state = addLogs(state, {
        message: `${effect.source} applied effect ${formatEffect(effect)} to ${char.name}`,
    });
    return state;
}

export function applyEffect(state: CombatState, effect: Effect): CombatState {
    const target = effect.target;
    if (effect.duration === undefined || effect.duration > 0) {
        // Indefinite or limited effects are tracked by the effect system
        state = appendEffect(state, target, effect);
    } else if (effect.duration === 0) {
        // One-time effects are applied immediately. Mostly used for health restoration.
        const char = getCombatant(state, target);
        const newChar = {
            ...char,
            stats: applyStatsModification(char.stats, effect.stats)
        };
        state = updateCombatant(state, target, newChar);
        state = addLogs(state, {
            message: `${effect.source} applied effect ${formatEffect(effect)} to ${newChar.name}`,
        });
    }
    return state;
}

export function removeEffect(state: CombatState, target: CharacterType, source: string) {
    const char = getCombatant(state, target);
    const newChar = {
        ...char,
        activeEffects: char.activeEffects.filter(e => e.source !== source),
    };
    state = updateCombatant(state, target, newChar);
    state = addLogs(state, {
        message: `${source} removed from ${newChar.name}`,
    });
    return state;
}

export function hasEquipment(hero: Combatant<Hero>, equipmentName: RegExp, locations?: EquipmentSlot[]): boolean {
    const candidateLocations = locations ?? Object.keys(hero.original.equipment) as EquipmentSlot[];
    return candidateLocations.some(slot => hero.original.equipment[slot]?.name?.match(equipmentName));
}


export function skipDamagePhase(state: CombatState, message: string): CombatState {
    return {
        ...state,
        phase: 'passive-damage',
        damage: {
            damageRolls: [],
            modifiers: []
        },
        logs: addLogs(state.logs, { message, type: 'info' })
    };
}

export function addLogs(state: CombatState, ...logs: Partial<CombatLog>[]): CombatState;
export function addLogs(currentLogs: CombatLog[], ...logs: Partial<CombatLog>[]): CombatLog[];
export function addLogs(arg: CombatState | CombatLog[], ...logs: Partial<CombatLog>[]): CombatState | CombatLog[] {
    const fullLogs = logs
        .filter(l => l.message)
        .map(log => {
            const round = !Array.isArray(arg) ? arg.round : log.round!;
            const message = log.message!;
            const type = log.type ?? 'info';
            const fullLog = {
                ...log,
                round,
                message,
                type
            };
            console.log(`${fullLog.round}: ${fullLog.message}`);
            return fullLog;
        });
    if (Array.isArray(arg)) {
        return [...arg, ...fullLogs];
    }
    return { ...arg, logs: [...arg.logs, ...fullLogs] };
}

// Helper to get the main enemy (first in array, always the "main" target)
export function getActiveEnemy(state: CombatState): Combatant<Enemy> {
    return state.enemies[0];
}

// Helper to get enemy by target (index or 'main')
export function getEnemy(
    state: CombatState,
    target: EnemyTarget = 'main'
): Combatant<Enemy> {
    const index = target === 'main' ? 0 : target;
    return state.enemies[index];
}

// Get all alive enemies
export function getAliveEnemies(state: CombatState): Combatant<Enemy>[] {
    return state.enemies.filter(e => e.stats.health > 0);
}

export function getCombatant(
    state: CombatState,
    selector: CombatantSelector | CharacterType
): Combatant {
    const type = typeof selector === 'string' ? selector : selector.type;
    if (type === 'hero') return state.hero;
    const index = typeof selector === 'object' ? selector.enemyIndex ?? 0 : 0;
    return state.enemies[index];
}

export function updateCombatant(
    state: CombatState,
    selector: CombatantSelector | CharacterType,
    combatant: Combatant
): CombatState {
    const type = typeof selector === 'string' ? selector : selector.type;
    if (type === 'hero') {
        return { ...state, hero: combatant as Combatant<Hero> };
    }
    const index = typeof selector === 'object' ? selector.enemyIndex ?? 0 : 0;
    const newEnemies = [...state.enemies];
    newEnemies[index] = combatant as Combatant<Enemy>;
    return { ...state, enemies: newEnemies };
}
