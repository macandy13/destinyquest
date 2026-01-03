import { Stats, StatsModification } from './stats';

export interface Character {
    type: 'hero' | 'enemy';
    name: string;
    stats: Stats;
}

export interface Modification {
    id: string;
    modification: StatsModification;
    duration?: number; // undefined means infinite
}