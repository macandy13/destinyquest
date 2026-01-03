import { BookRef } from './BookRef';
import { Stats } from './Stats';

export type CharacterType = 'hero' | 'enemy';

export function getOpponent(target: CharacterType): CharacterType {
    return target === 'hero' ? 'enemy' : 'hero';
}

export interface Character {
    type: CharacterType;
    name: string;
    stats: Stats;
}


export interface Enemy extends Character {
    name: string;
    abilities: string[];
    preventHealing?: boolean;
    bookRef: BookRef;
}