import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'src/data/backpack.csv');
const content = fs.readFileSync(inputFile, 'utf8');

const rawData = content.trim().split('\n');

const processedItems = rawData.slice(1).map((line, index) => {
    if (line.startsWith('#') || !line.trim()) return null;

    // Split by comma causing issues with quoted fields? simple split for now based on file content observation
    // The file seems to have fields that might contain commas e.g. "Explosives / Bombs,+10 damage,1"
    // But observing the content: "Explosives / Bombs,+10 damage,1,Sold by the Tinker, Act 1, 175"
    // "Healing Potion,+6 health,1,Sold by the Apothecary, Act 1, 56"
    // It seems naive split might work if fields don't have commas themselves (except effect?)
    // Wait, "+10 damage" has no comma. "+6 health" no comma.
    // "Sold by the Apothecary, Act 1" -> "Sold by the Apothecary" , " Act 1".
    // Let's check line 14: "Da Boss,+10 damage,1,Sold by Sea-Spray Steve, Act 1,432"
    // It has a trailing dot in my read? No. "432".
    // Let's use naive split for now.

    const parts = line.split(',');

    // Construct: Item Name,Effect,Uses, Notes, Act, Reference Number
    // Index: 0, 1, 2, 3, 4, 5
    // But wait, "Sold by the Apothecary, Act 1, 56" -> 3 parts?
    // "Sold by the Apothecary" (3)
    // " Act 1" (4) ?? No, usually "Sold by..." is one field.
    // Let's check row 2: "Healing Potion,+6 health,1,Sold by the Apothecary, Act 1, 56"
    // 0: Healing Potion
    // 1: +6 health
    // 2: 1
    // 3: Sold by the Apothecary
    // 4:  Act 1
    // 5:  56
    // seems correct.

    if (parts.length < 6) return null;

    const name = parts[0].trim();
    const effect = parts[1].trim();
    const uses = parseInt(parts[2].trim()) || 0;
    const notes = parts[3].trim();
    const actRaw = parts[4].trim();
    const referenceNumber = parseInt(parts[5].trim()) || 0;

    const actMatch = actRaw.match(/Act (\d+)/i) || actRaw.match(/(\d+)/);
    const act = actMatch ? parseInt(actMatch[1]) : 1;

    // Parse Effect
    // "Speed Potion,+2 speed / 1 rd" -> modifier: "+2 speed", duration: 1
    // "Healing Potion,+6 health" -> modifier: "+6 health", duration: 0
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
        act: act,
        effect: effect,
        modifier: modifier,
        stats: Object.keys(stats).length > 0 ? stats : undefined,
        duration: duration,
        uses: uses,
        notes: notes,
        referenceNumber: referenceNumber,
    };

    return item;
}).filter(i => i);

console.log(`import { BackpackItem } from '../types/hero';

export const BACKPACK_ITEMS: BackpackItem[] = ${JSON.stringify(processedItems, null, 2)};
`);
