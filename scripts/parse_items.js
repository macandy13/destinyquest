import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'src/data/items.csv');
const content = fs.readFileSync(inputFile, 'utf8');

const rawData = content.trim().split('\n');

// Helper to map Item Box to Slot
const mapSlot = (box) => {
    const lower = box.toLowerCase();
    if (lower === 'main hand') return 'mainHand';
    if (lower === 'left hand') return 'leftHand';
    if (lower === 'ring') return 'ring1'; // Default slot
    return lower;
};

// Helper to map Item Box to Type
const mapType = (box) => {
    const lower = box.toLowerCase();
    if (lower === 'main hand') return 'mainHand';
    if (lower === 'left hand') return 'leftHand';
    if (lower === 'ring') return 'ring';
    return lower;
};

// Helper to clean name and extract career req
const processName = (name) => {
    let cleanName = name;
    let career = undefined;

    if (name.includes(' (W)')) {
        career = 'Warrior';
        cleanName = name.replace(' (W)', '').trim();
    } else if (name.includes(' (M)')) {
        career = 'Mage';
        cleanName = name.replace(' (M)', '').trim();
    } else if (name.includes(' (R)')) {
        career = 'Rogue';
        cleanName = name.replace(' (R)', '').trim();
    }

    return { name: cleanName, career };
};

const processedItems = rawData.slice(1).map((line, index) => {
    if (line.startsWith('#')) return null;

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
    if (parts.length < 9) return null;

    const itemBox = parts[0].trim();
    const book = parts[1].trim();
    const actRaw = parts[2].trim();
    const itemNameRaw = parts[3].trim();
    const speed = parseInt(parts[4]) || 0;
    const brawn = parseInt(parts[5]) || 0;
    const magic = parseInt(parts[6]) || 0;
    const armour = parseInt(parts[7]) || 0;
    const abilities = parts[8].trim().split(',');
    const entry = parts[9] ? parseInt(parts[9].trim()) : undefined;
    const location = parts[10] ? parts[10].trim() : undefined;

    const actMatch = actRaw.match(/Act (\d+)/);
    const act = actMatch ? parseInt(actMatch[1]) : 1;

    const { name, career } = processName(itemNameRaw);
    const id = name.toLowerCase().replace(/[']/g, '').replace(/[^a-z0-9]+/g, '_');

    const item = {
        id: id,
        name: name,
        type: mapType(itemBox),
        book: book,
        act: act,
        stats: {},
        abilities: abilities.map(a => a.trim()).filter(a => a !== 'None'),
        referenceNumber: entry, // Renamed from entry
        location: location,
        careerPreference: career
    };

    if (speed) item.stats.speed = speed;
    if (brawn) item.stats.brawn = brawn;
    if (magic) item.stats.magic = magic;
    if (armour) item.stats.armour = armour;

    return item;
}).filter(i => i);

console.log(`import { EquipmentItem } from '../types/hero';

export const ITEMS: EquipmentItem[] = ${JSON.stringify(processedItems, null, 2)};

export const getItemsBySlot = (slot: string) => {
    return ITEMS.filter(item => {
        if (slot === 'ring1' || slot === 'ring2') return item.type === 'ring';
        return item.type === slot;
    });
};
`);
