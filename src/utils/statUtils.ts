import { CombatLog, CombatLogType } from "../types/combat";
import { CharacterType } from "../types/stats";

export function getStatIcon(stat: string): string {
    switch (stat.toLowerCase()) {
        case 'speed': return '⚡';
        case 'brawn': return '💪';
        case 'magic': return '✨';
        case 'armour': return '🛡️';
        case 'health': return '❤️';
        case 'money': return '💰';
        default: return '';
    }
}

export function addLogs(logs: CombatLog[], ...logsToAdd: CombatLog[]): CombatLog[] {
    logsToAdd.forEach(log => console.log(`${log.round}: ${log.message}`));
    return [...logs, ...logsToAdd];
}

export function getDamageType(target: CharacterType): CombatLogType {
    switch (target) {
        case 'hero': return 'damage-hero';
        case 'enemy': return 'damage-enemy';
        default: return 'info';
    }
}