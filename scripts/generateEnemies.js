import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_PATH = path.join(__dirname, '../src/data/enemies.csv');
const OUTPUT_PATH = path.join(__dirname, '../src/data/enemies.ts');

function parseCSV(content) {
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    // Act,Enemy Name,Entry,S,B,M,A,H,Special Abilities / Logic Hooks
    // Map headers to simpler keys if needed, but we can just rely on index or standard mapping

    return lines.slice(1).map(line => {
        // Handle commas inside quotes if any (simple split first, assuming no complexity for now from observed file)
        const parts = line.split(',');

        // CSV columns: Act,Enemy Name,Entry,S,B,M,A,H,Abilities
        const act = parseInt(parts[0]);
        const name = parts[1];
        const entry = parts[2];

        const parseStat = (val) => val === '-' ? 0 : parseInt(val);
        const speed = parseStat(parts[3]);
        const brawn = parseStat(parts[4]);
        const magic = parseStat(parts[5]);
        const armour = parseStat(parts[6]);
        const health = parseStat(parts[7]);

        // Abilities might contain commas, so we might need to join the rest
        // But the example file shows abilities as singular descriptions or simple strings.
        // The last column is "Special Abilities / Logic Hooks"
        // Let's rejoin the rest just in case
        const abilitiesRaw = parts.slice(8).join(',');

        // Extract ability names. Format seems like "Name: Description". 
        // We likely want just the name for the 'abilities' array.
        // Example: "Savagery: +1 Brawn for combat" -> "Savagery"
        // Example: "None (Intro/Tutorial)" -> []
        let abilities = [];
        if (abilitiesRaw && abilitiesRaw !== 'None (Intro/Tutorial)') {
            const abilityName = abilitiesRaw.split(':')[0].trim();
            if (abilityName) abilities.push(abilityName);
        }

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
            abilities,
            bookRef: {
                book: 'Legions of Shadow',
                act: act,
                section: parseInt(entry, 10)
            }
        };

    });
}

try {
    const content = fs.readFileSync(CSV_PATH, 'utf-8');
    const enemies = parseCSV(content);

    const fileContent = `import { Enemy } from '../types/character';

export const ENEMIES: Enemy[] = ${JSON.stringify(enemies, null, 2)};
`;

    fs.writeFileSync(OUTPUT_PATH, fileContent);
    console.log(`Successfully generated enemies.ts with ${enemies.length} enemies.`);
} catch (error) {
    console.error('Error generating enemies:', error);
    process.exit(1);
}
