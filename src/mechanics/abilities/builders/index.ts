/**
 * Ability builder API.
 *
 * Import from here instead of individual builder files:
 *
 *   import {
 *     defineAbility, onRoundEnd, always, dealDamage
 *   } from '../builders';
 */

export { type Effect, type TargetType, resolveEffectTarget,
    dealDamage, heal, modifyStat, cancelDamage,
} from './effects';

export {
    type Condition, type ConditionResult, type DamageContext,
    type Trigger,
    always, fromSource, roll,
    onCombatStart, onRoundStart, onRoundEnd,
    onRoundEndAfterFirstHit, onDamageTaken,
} from './triggers';

export { defineAbility, type AbilityConfig } from './defineAbility';

export {
    defineRollBranches,
    type RollBranch,
    type RollBranchesConfig,
} from './defineRollBranches';

export { createNoopAbility, defineNoopAbility } from './noop';
