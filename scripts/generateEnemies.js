import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function parseLine(line) {
    const parts = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            parts.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    parts.push(current);
    return parts;
}

function parseCSV(content) {
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    // Act,Enemy Name,Entry,S,B,M,A,H,Special Abilities / Logic Hooks
    // Map headers to simpler keys if needed, but we can just rely on index or standard mapping

    return lines.map(line => {
        if (line.startsWith('#')) {
            return;
        }
        const parts = parseLine(line);
        if (parts.length < 10) {
            console.error('Too few columns, skipping line:', line);
            return;
        }

        // CSV columns: Act,Enemy Name,Entry,S,B,M,A,H,Abilities
        const book = parts[0];
        const act = parseInt(parts[1]);
        const name = parts[2];
        const entry = parts[3];

        const parseStat = (val) => val === '-' ? 0 : parseInt(val);
        const speed = parseStat(parts[4]);
        const brawn = parseStat(parts[5]);
        const magic = parseStat(parts[6]);
        const armour = parseStat(parts[7]);
        const health = parseStat(parts[8]);
        const abilities = parts[9].trim().split(';').map(s => s.trim());
        const spawns = parts[10]?.trim().split(';').map(s => s.trim());
        const notes = parts[11]?.trim();

        // TODO: Handle minions.
        return {
            type: 'enemy',
            name,
            stats: {
                speed,
                brawn,
                magic,
                armour,
                health,
                maxHealth: health
            },
            abilities: abilities?.length === 1 && abilities[0] === '' ? [] : abilities,
            spawns: spawns?.length === 1 && spawns[0] === '' ? undefined : spawns,
            bookRef: {
                book: book,
                act: act,
                section: parseInt(entry, 10)
            },
            notes: notes || undefined,
        };

    }).filter(e => e !== undefined);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputFile = path.join(__dirname, '../src/data/enemies.csv');
const content = fs.readFileSync(inputFile, 'utf-8');
const enemies = parseCSV(content);

console.log(`import { Enemy } from '../types/character';

export const ENEMIES: Enemy[] = ${JSON.stringify(enemies, null, 2)};
`);
