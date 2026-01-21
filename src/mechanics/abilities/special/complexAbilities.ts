import { registerAbility } from '../../abilityRegistry';
import {
    addLogs,
    appendEffect,
    AttackSource,
    dealDamage,
    getCombatant,
    getEffect,
    hasEffect,
    healDamage,
    removeEffect,
    skipDamagePhase,
    updateCombatant
} from '../../../types/combatState';
import { getOpponent } from '../../../types/character';
import { formatDice, rollDie } from '../../../types/dice';

// Snap out of it!
// Roll a die at round start. If 6, apply Hopeless state (TODO: define what this means)
registerAbility({
    name: 'Snap out of it!',
    type: 'special',
    description:
        'At the start of each round, roll a die. If you roll a 6, you ' +
        'gain the Hopeless state and cannot use combat abilities.',
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        const target = getOpponent(owner);
        const roll = rollDie().value;
        let logMsg = `Snap out of it!: Rolled ${roll}`;
        if (roll === 6) {
            logMsg += ' - Hopeless state applied!';
            state = appendEffect(state, target, {
                stats: {},
                source: 'Snap out of it!',
                target,
                duration: undefined,
                icon: '😱',
                description: 'Hopeless: Cannot use combat abilities'
            });
        } else {
            logMsg += ' - no effect';
        }
        return addLogs(state, { message: logMsg });
    }
});

// Soft spot
// When winning, roll damage. If 1-2, can't deal damage this round.
registerAbility({
    name: 'Soft spot',
    type: 'special',
    description:
        'When you win a round, roll a die before damage. If you roll a ' +
        '1 or 2, you cannot deal damage this round.',
    reviewed: false,
    onDamageRoll: (state, { owner }) => {
        // Only affects the winner
        if (state.winner !== getOpponent(owner)) return state;

        const roll = rollDie().value;
        let logMsg = `Soft spot: Hero rolled ${roll}`;

        if (roll <= 2) {
            logMsg += ' - damage blocked!';
            return skipDamagePhase(state, logMsg);
        }
        return addLogs(state, { message: logMsg + ' - damage proceeds' });
    }
});

// Watch your step
// If you roll a 1 on speed roll, you lose the round (reroll allowed)
registerAbility({
    name: 'Watch your step',
    type: 'special',
    description:
        'If you roll a 1 during speed rolls, you lose the combat round. ' +
        'Dice can be rerolled.',
    reviewed: false,
    onSpeedRoll: (state, { owner }) => {
        if (owner !== 'enemy') return state;

        const heroRolls = state.heroSpeedRolls;
        if (!heroRolls) return state;

        const hasOne = heroRolls.some(r => r.value === 1);
        if (hasOne) {
            state = addLogs(state, {
                message: 'Watch your step: Hero rolled a 1! Loses this round.'
            });
            // TODO: Just setting the winner won't work, we likely need an effect
            // that will change the winner before the damage phase.
            return { ...state, winner: 'enemy' };
        }
        return state;
    }
});

// Whirlwind
// On damage roll, if you roll 6, roll extra die. Repeats.
registerAbility({
    name: 'Whirlwind',
    type: 'special',
    description:
        'When rolling for damage, each 6 rolled adds an extra damage die. ' +
        'This can repeat.',
    icon: '🌪️',
    reviewed: false,
    onDamageRoll: (state, { owner }) => {
        if (state.winner !== owner || !state.damage) return state;

        let extraDice = 0;
        let rolls = [...state.damage.damageRolls];
        let idx = 0;

        while (idx < rolls.length) {
            if (rolls[idx].value === 6) {
                const newRoll = rollDie();
                rolls.push(newRoll);
                extraDice++;
            }
            idx++;
        }

        if (extraDice > 0) {
            state = addLogs(state, {
                message: `Whirlwind: Added ${extraDice} extra damage dice, damage dice: ${formatDice(rolls)}`
            });
            state = {
                ...state,
                damage: {
                    ...state.damage,
                    damageRolls: rolls,
                    modifiers: state.damage!.modifiers ?? []
                }
            };
        }
        return state;
    }
});

// Warts and all
// Roll a die at round start. If 1, become toad (1 speed die only)
registerAbility({
    name: 'Warts and all',
    type: 'special',
    description:
        'At the start of each round, roll a die. If you roll a 1, you are ' +
        'transformed into a toad and roll only 1 speed die.',
    icon: '🐸',
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        const target = getOpponent(owner);
        const roll = rollDie().value;
        let logMsg = `Warts and all: Rolled ${roll}`;

        if (roll === 1) {
            logMsg += ' - transformed into a toad!';
            // Set speedDice to -1 (reducing from base 2 to 1)
            state = appendEffect(state, target, {
                stats: { speedDice: -1 },
                source: 'Warts and all',
                target,
                duration: 1,
                description: 'Toad: Only 1 speed die'
            });
        } else {
            logMsg += ' - no effect';
        }
        return addLogs(state, { message: logMsg });
    }
});

// Punishing blows
// Each time damage is dealt, reduce hero's armour by 1
registerAbility({
    name: 'Punishing blows',
    type: 'special',
    description:
        'Each time the enemy deals damage, your armour is permanently ' +
        'reduced by 1 for this combat.',
    icon: '🔨',
    reviewed: false,
    onDamageDealt: (state, { owner, target }, _source, damageDealt) => {
        if (damageDealt <= 0) return state;
        if (target !== getOpponent(owner)) return state;

        const existingEffect = getEffect(state, target, 'Punishing blows');
        if (existingEffect) {
            state = removeEffect(state, target, 'Punishing blows');
        }

        const currentReduction = existingEffect?.stats.armour ?? 0;
        state = appendEffect(state, target, {
            stats: { armour: currentReduction - 1 },
            source: 'Punishing blows',
            target,
            duration: undefined,
            description: `Armour reduced by ${Math.abs(currentReduction - 1)}`
        });

        return addLogs(state, {
            message: `Punishing blows: Hero's armour reduced by 1!`
        });
    }
});

// Split personality
// Per 10 health lost, gain +1 speed and brawn
registerAbility({
    name: 'Split personality',
    type: 'special',
    description:
        'For every 10 health lost, the enemy gains +1 to speed and brawn.',
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        const combatant = getCombatant(state, owner);
        const healthLost = combatant.stats.maxHealth - combatant.stats.health;
        const stacks = Math.floor(healthLost / 10);
        if (stacks <= 0) return state;

        if (hasEffect(state, owner, 'Split personality')) {
            state = removeEffect(state, owner, 'Split personality');
        }
        state = appendEffect(state, owner, {
            stats: { speed: stacks, brawn: stacks },
            source: 'Split personality',
            target: owner,
            duration: undefined,
            description: `+${stacks} speed/brawn from rage`
        });

        return state;
    }
});

// Strangle vines
// At round start, deal round# * 2 damage
registerAbility({
    name: 'Strangle vines',
    type: 'special',
    description:
        'At the start of each round, you take damage equal to the round ' +
        'number multiplied by 2.',
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        const target = getOpponent(owner);
        const damage = state.round * 2;
        return dealDamage(
            state,
            'Strangle vines',
            target,
            damage,
            `Strangle vines: Round ${state.round} = ${damage} damage`
        );
    }
});

// Wailing Bride
// Each round, reduce hero speed/brawn/magic by 1
registerAbility({
    name: 'Wailing Bride',
    type: 'special',
    description:
        'At the start of each round, your speed, brawn, and magic are ' +
        'reduced by 1.',
    reviewed: false,
    onRoundStart: (state, { owner }) => {
        const target = getOpponent(owner);
        state = appendEffect(state, target, {
            stats: {
                speed: -state.round,
                brawn: -state.round,
                magic: -state.round
            },
            source: 'Wailing Bride',
            target,
            duration: 1,
            description: `Stats reduced by ${Math.abs(state.round)}`
        });

        return state;
    }
});

// Many heads
// At round 4, Hydra restores all health
registerAbility({
    name: 'Many heads',
    type: 'special',
    description:
        'If combat reaches round 4, the Hydra regenerates all its health.',
    reviewed: false,
    uses: 1,
    onRoundStart: (state, { owner }) => {
        if (state.round !== 4) return state;

        const combatant = getCombatant(state, owner);
        const healAmount = combatant.stats.maxHealth - combatant.stats.health;
        if (healAmount > 0) {
            state = healDamage(state, 'Many heads', owner, healAmount);
        }
        return state;
    }
});

// Mighty roar
// After 2 consecutive wins where damage was dealt, gain +4 speed/brawn
registerAbility({
    name: 'Mighty roar',
    type: 'special',
    description:
        'After winning 2 consecutive rounds with damage dealt, gain +4 to ' +
        'speed and brawn for the rest of combat.',
    reviewed: false,
    onDamageDealt: (state, { owner, target }, source, damageDealt) => {
        if (damageDealt <= 0) return state;
        if (target !== getOpponent(owner)) return state;
        if (source !== AttackSource || state.winner !== 'enemy') return state;
        if (hasEffect(state, owner, 'Mighty roar')) return state;

        // Intermediate effect for a single won round. Will be checked in the
        // next round if 2 rounds were won in a row, otherwise it expires.
        const effectName = 'Mighty roar (building)';
        if (!hasEffect(state, owner, effectName)) {
            state = appendEffect(state, owner, {
                stats: {},
                source: effectName,
                target: owner,
                duration: 2, // duration for this and next round
                description: 'Tracking consecutive wins',
                visible: false,
            });
            return state;
        }
        state = removeEffect(state, owner, effectName);

        return appendEffect(state, owner, {
            stats: { speed: 4, brawn: 4 },
            source: 'Mighty roar',
            target: owner,
            duration: undefined,
            description: '+4 speed/brawn'
        });
    }
});

// Wind-dancer
// Disable potions/abilities during combat
registerAbility({
    name: 'Wind-dancer',
    type: 'special',
    description:
        'During this combat, you cannot use potions or special abilities.',
    icon: '💨',
    reviewed: false,
    onCombatStart: (state) => {
        state.hero.activeAbilities = new Map();
        state.backpack = [];
        return addLogs(state, {
            message: 'Wind-dancer: Hero cannot use potions or abilities!'
        });
    }
});

// Wail of the Banshee
// If hero health >= 100 at combat start, lose immediately
registerAbility({
    name: 'Wail of the Banshee',
    type: 'special',
    description:
        'If the Banshee\'s health is 100 or more at the start of combat, you ' +
        'automatically lose.',
    icon: '💀',
    reviewed: false,
    onCombatStart: (state, { owner }) => {
        const banshee = getCombatant(state, owner);

        if (banshee.stats.health < 100) return state;
        state = addLogs(state, {
            message: 'Wail of the Banshee: Health >= 100! Instant loss!'
        });
        return {
            ...state,
            hero: {
                ...state.hero,
                stats: { ...state.hero.stats, health: 0 }
            },
            phase: 'combat-end'
        };
    }
});

// Endless Swarm
// Sentries cannot be defeated (minimum 1 health)
registerAbility({
    name: 'Endless Swarm',
    type: 'special',
    description:
        'The Sentries cannot be defeated. Their health cannot drop below 1.',
    reviewed: false,
    onDamageDealt: (state, { owner, target }, _source, _damageDealt) => {
        if (target !== owner) return state;

        const combatant = getCombatant(state, owner);
        if (combatant.stats.health <= 0) {
            state = updateCombatant(state, owner, {
                ...combatant,
                stats: { ...combatant.stats, health: 1 }
            });
            state = addLogs(state, {
                message: 'Endless Swarm: Cannot be defeated! Health restored to 1.'
            });
        }
        return state;
    }
});
