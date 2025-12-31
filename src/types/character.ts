import { Stats } from './stats';

export interface Character {
    type: 'hero' | 'enemy';
    name: string;
    stats: Stats;
}
