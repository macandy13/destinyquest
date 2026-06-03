import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'src/data/backpack.csv');
const content = fs.readFileSync(inputFile, 'utf8');

const rawData = content.trim().split('\n');

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

const processedItems = rawData.slice(1).map((line, index) => {
    if (line.startsWith('#') || !line.trim()) return null;

    const parts = parseLine(line);
    if (parts.length < 6) return null;

    const book = parts[0].trim();
    const actRaw = parts[1].trim();
    const referenceNumber = parseInt(parts[2].trim()) || 0;
    const name = parts[3].trim();
    const effects = parts[4].trim().split(';').map(s => s.trim()).filter(s => s);
    const uses = parseInt(parts[5].trim()) || 0;
    const description = parts[6]?.trim();
    const notes = parts[7]?.trim();


    const actMatch = actRaw.match(/Act (\d+)/i) || actRaw.match(/(\d+)/);
    const act = actMatch ? parseInt(actMatch[1]) : 1;
    const location = parts[8] ? parts[8].trim() : undefined;

    // Parse Modifier for Stat and Value
    let stats = {};
    let duration = 0;
    let repeat;
    let targetItemTypes;
    let conditions;

    for (const effect of effects) {
        const statMatch = effect.match(/([+-]?\d+|max\s|no\s)\s*(\w+)/);
        const conditionsMatch = effect.match(/([+-])\s*(\w+)/);
        const itemMatch = effect.match(/([+-])\s*(\w+)/);
        if (statMatch) {
            let val;
            switch (statMatch[1]) {
                case 'max ':
                    val = -1;
                    break;
                case 'no ':
                    val = null;
                    break;
                default:
                    val = parseInt(statMatch[1], 10);
                    break;
            }
            const statName = statMatch[2].toLowerCase();

            if (['speed', 'brawn', 'magic', 'armour', 'health'].includes(statName)) {
                stats[statName] = val;
            } else if (statName === 'damage') {
                stats['damageModifier'] = val; // Map 'damage' to 'damageModifier' in Stats interface
            } else if (statName === 'damage dice') {
                stats['damageDice'] = val;
            }

            let effectLimits = effect.substring(statMatch[0].length).trim();
            const roundMatch = effectLimits.match(/\*\s*(\d+)\s*rd/i);
            if (effectLimits === '* every rd') {
                duration = undefined;
            }
            else if (roundMatch) {
                duration = parseInt(roundMatch[1], 10) || 0;
            }
            const itemMatch = effectLimits.match(/\/\s*item (\(.*\))?\s*rd/i);
            if (itemMatch) {
                targetItemTypes = itemMatch[1] ? itemMatch[1].split(',').map(s => s.trim()) : [];
            }
        } else if (conditionsMatch) {
            if (conditionsMatch[1] === '+') {
                conditions = { add: [conditionsMatch[2].trim().toLowerCase()] };
            } else if (conditionsMatch[1] === '-') {
                conditions = { remove: [conditionsMatch[2].trim().toLowerCase()] }; // This would be the effect to remove, but we currently only have an 'add' field in our Effect interface
            }
        }
        // TODO: Handle abilities.
    }
    const id = name.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '_');
    const item = {
        id,
        name,
        type: 'backpack',
        effect: {
            stats,
            conditions,
            source: name,
            target: 'hero',
            duration,
            repeat,
        },
        uses,
        targetItemTypes,
        description,
        notes,
        bookRef: {
            book: book,
            act: act,
            section: referenceNumber,
        },
        location,
    };
    return item;
}).filter(i => i);

console.log(`import { BackpackItem } from '../types/hero';

export const BACKPACK_ITEMS: BackpackItem[] = ${JSON.stringify(processedItems, null, 2)};
`);
