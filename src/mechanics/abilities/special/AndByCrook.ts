import { registerAbility } from '../../abilityRegistry';
import { appendEffect, hasEffect, removeEffect, getCombatant } from '../../../types/combatState';

registerAbility({
    name: 'And by crook',
    type: 'special',
    description: 'Once Luke\'s health falls below 20, he only rolls 1 die for speed but 2 for damage.',
    reviewed: false,
    icon: '🎲',
    onRoundStart: (state, { owner }) => {
        const combatant = getCombatant(state, owner);
        if (!combatant) return state;

        const health = combatant.stats.health;
        const effectSource = 'And by crook';
        const hasBuff = hasEffect(state, owner, effectSource);

        if (health < 20) {
            if (!hasBuff) {
                const baseSpeedDice = combatant.stats.speedDice ?? 2;
                const baseDamageDice = combatant.stats.damageDice ?? 1;

                const speedMod = 1 - baseSpeedDice;
                const damageMod = 2 - baseDamageDice;

                return appendEffect(state, owner, {
                    stats: {
                        speedDice: speedMod,
                        damageDice: damageMod
                    },
                    source: effectSource,
                    target: owner,
                    description: 'Enraged: 1 Speed Die, 2 Damage Dice',
                });
            }
        } else if (hasBuff) {
            return removeEffect(state, owner, effectSource);
        }

        return state;
    }
});
