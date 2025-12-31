import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'src/data/backpack.csv');
const content = fs.readFileSync(inputFile, 'utf8');

const rawData = content.trim().split('\n');

const processedItems = rawData.slice(1).map((line, index) => {
    if (line.startsWith('#') || !line.trim()) return null;

    const parts = line.split(',');
    if (parts.length < 6) return null;

    const name = parts[0].trim();
    const effect = parts[1].trim();
    const uses = parseInt(parts[2].trim()) || 0;
    const notes = parts[3].trim();
    const book = parts[4].trim();
    const actRaw = parts[5].trim();
    const referenceNumber = parseInt(parts[6].trim()) || 0;

    const actMatch = actRaw.match(/Act (\d+)/i) || actRaw.match(/(\d+)/);
    const act = actMatch ? parseInt(actMatch[1]) : 1;
    const location = parts[7] ? parts[7].trim() : undefined;

    let modifier = effect;
    let duration = 0;

    const roundMatch = effect.match(/(.+?)\s*\/\s*(\d+)\s*rd/i);
    if (roundMatch) {
        modifier = roundMatch[1].trim();
        duration = parseInt(roundMatch[2], 10);
    }

    // Parse Modifier for Stat and Value
    let stats = {};

    if (modifier) {
        const statMatch = modifier.match(/([+-]?\d+)\s*(\w+)/);
        if (statMatch) {
            const val = parseInt(statMatch[1], 10);
            const statName = statMatch[2].toLowerCase();

            if (['speed', 'brawn', 'magic', 'armour', 'health'].includes(statName)) {
                stats[statName] = val;
            } else if (statName === 'damage') {
                stats['damageModifier'] = val; // Map 'damage' to 'damageModifier' in Stats interface
            }
        }
    }

    const id = name.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '_');

    const item = {
        id: id,
        name: name,
        type: 'backpack',
        effect: effect,
        modifier: modifier,
        stats: Object.keys(stats).length > 0 ? stats : undefined,
        duration: duration,
        uses: uses,
        notes: notes,
            book: book,
            act: act,
            section: referenceNumber
        },
        location: location,
    };


    return item;
}).filter(i => i);

console.log(`import { BackpackItem } from '../types/hero';
import { BookRef } from '../types/book';

export const BACKPACK_ITEMS: BackpackItem[] = ${JSON.stringify(processedItems, null, 2)};
`);
