import { registerAbility } from '../../abilityRegistry';
import { addLogs } from '../../../utils/statUtils';
import { rollDice, sumDice } from '../../../utils/dice';

registerAbility({
    name: 'Shield Spin',
    type: 'passive',
    description: 'Opponents take 1 damage die (ignoring armour) for every [1] they roll for speed.',
    onSpeedRoll: (state, source, rolls) => {
        // "Opponents take 1 damage for every 1 they roll"
        // The engine calls this hook for the TARGET of the ability. 
        // So if Hero has Shield Spin (target=Enemy), this is called with source='enemy'.

        const ones = rolls.filter(r => r.value === 1).length;

        if (ones > 0) {
            // "take 1 damage die"
            const dmgResults = rollDice(ones);
            const totalDmg = sumDice(dmgResults);
            const rollVals = dmgResults.map(r => r.value);

            return {
                additionalEnemyDamage: source === 'enemy' ? [...state.additionalEnemyDamage ?? [], {
                    type: `damage-${source}`,
                    amount: totalDmg,
                    source: 'Shield Spin'
                }] : undefined,

                // Apply Direct Damage to the roller (source)
                [source]: {
                    ...state[source]!,
                    stats: {
                        ...state[source]!.stats,
                        health: Math.max(0, state[source]!.stats.health - totalDmg)
                    }
                },

                logs: addLogs(state.logs, {
                    round: state.round,
                    message: `Shield Spin: Opponent rolled ${ones}x[1]. Inflicted ${totalDmg} damage (${rollVals.join('+')}).`,
                    type: source === 'enemy' ? 'damage-enemy' : 'damage-hero'
                })
            };
        }

        return {};
    }
});
