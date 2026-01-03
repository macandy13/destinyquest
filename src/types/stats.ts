export interface Stats {
    speed: number;
    brawn: number;
    magic: number;
    armour: number;
    health: number;
    maxHealth: number;
    speedDice?: number; // Default 2
    damageDice?: number; // Default 1
    damageModifier?: number; // Flat bonus to damage
}

export function getStatIcon(stat: string): string {
    switch (stat.toLowerCase()) {
        case 'speed': return '⚡';
        case 'die': return '🎲'; // TODO
        case 'brawn': return '💪';
        case 'magic': return '✨';
        case 'armour': return '🛡️';
        case 'health': return '❤️';
        case 'money': return '💰';
        default: return '';
    }
}
