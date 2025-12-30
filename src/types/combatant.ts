import { Stats, Target } from './stats';
import { Character } from './character';

export interface Combatant<T extends Character = Character> {
    type: Target;
    id: string; // Unique identifier in combat (e.g. 'hero', 'enemy-1')
    name: string;
    stats: Stats;
    // We retain a reference to the original character object for accessing static data/metadata
    original: T;
}
