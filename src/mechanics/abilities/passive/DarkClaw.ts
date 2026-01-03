import { registerAbility } from '../../abilityRegistry';
import { hasDouble } from '../../../utils/dice';
import { dealDamage, DiceRoll } from '../../../types/combat';
import { CharacterType, getOpponent } from '../../../types/stats';

function inflictDarkClawDamage(state: any, source: CharacterType, rolls: DiceRoll[]) {
    if (!hasDouble(rolls)) {
        return {};
    }

    const target = getOpponent(source);
    return dealDamage(state, 'Dark Claw', target, 4);
}

registerAbility({
    name: 'Dark Claw',
    type: 'passive',
    description: 'For every double rolled, automatically inflict 4 damage (ignoring armour).',
    onSpeedRoll: (state, source, rolls) => {
        return inflictDarkClawDamage(state, source, rolls);
    },
    onDamageRoll: (state, source, rolls) => {
        return inflictDarkClawDamage(state, source, rolls);
    }
});
