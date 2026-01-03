import { CombatLog, CombatLogType, CombatState } from "../types/combat";
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

export function addLogs(state: CombatState, ...logs: Partial<CombatLog>[]): CombatState;
export function addLogs(currentLogs: CombatLog[], ...logs: Partial<CombatLog>[]): CombatLog[];
export function addLogs(arg: CombatState | CombatLog[], ...logs: Partial<CombatLog>[]): CombatState | CombatLog[] {
    const fullLogs = logs
        .filter(l => l.message)
        .map(log => {
            const round = !Array.isArray(arg) ? arg.round : log.round!;
            const message = log.message!;
            const type = log.type ?? 'info';
            const fullLog = {
                ...log,
                round,
                message,
                type
            };
            console.log(`${fullLog.round}: ${fullLog.message}`);
            return fullLog;
        });
    if (Array.isArray(arg)) {
        return [...arg, ...fullLogs];
    }
    return { ...arg, logs: [...arg.logs, ...fullLogs] };
}

export function getDamageType(target: CharacterType): CombatLogType {
    switch (target) {
        case 'hero': return 'damage-hero';
        case 'enemy': return 'damage-enemy';
        default: return 'info';
    }
}