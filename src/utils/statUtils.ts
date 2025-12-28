import { CombatLog } from "../types/combat";

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

export function addLog(logs: CombatLog[], log: CombatLog): CombatLog[] {
    console.log(`${log.round}: ${log.message}`);
    return [...logs, log];
}