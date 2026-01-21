import { ENEMIES } from '../data/enemies';
import { Enemy } from '../types/character';

export function getEnemyDefinition(name: string): Enemy | undefined {
    return ENEMIES.find(e => e.name === name);
}

export function resolveSpawns(enemies: Enemy[]): Enemy[] {
    const result: Enemy[] = [];
    const queue = [...enemies];

    // Safety break to prevent infinite loops or excessive spawns
    let count = 0;
    const MAX_ENEMIES = 20;

    while (queue.length > 0 && count < MAX_ENEMIES) {
        const current = queue.shift()!;
        result.push(current);
        count++;

        if (current.spawns && current.spawns.length > 0) {
            for (const spawnName of current.spawns) {
                const spawnDef = getEnemyDefinition(spawnName);
                if (spawnDef) {
                    // Create a copy to ensure unique object references if spawned multiple times
                    // (though createEnemyCombatant handles runtime state, it's safer)
                    queue.push({ ...spawnDef });
                } else {
                    console.warn(`Spawn definition not found: ${spawnName}`);
                }
            }
        }
    }

    if (queue.length > 0) {
        console.warn(`Spawn limit reached (${MAX_ENEMIES}). Some enemies were not spawned.`);
    }

    return result;
}
