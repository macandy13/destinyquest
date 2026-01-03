import { CharacterType } from "./Character";

export type CombatLogType = 'info' | 'warning' | 'damage-hero' | 'damage-enemy' | 'win' | 'loss';

export interface CombatLog {
    round: number;
    message: string;
    type: CombatLogType;
}

export function getDamageType(target: CharacterType): CombatLogType {
    switch (target) {
        case 'hero': return 'damage-hero';
        case 'enemy': return 'damage-enemy';
        default: return 'info';
    }
}