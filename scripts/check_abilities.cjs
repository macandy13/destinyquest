const fs = require('fs');
const path = require('path');

const projectRoot = '/Users/maus/Documents/code/destinyquest';
const enemiesCsvPath = path.join(projectRoot, 'src/data/enemies.csv');
const abilitiesDir = path.join(projectRoot, 'src/mechanics/abilities');

function getImplementedAbilities() {
    const implemented = new Set();
    const noop = new Set();
    const files = getAllFiles(abilitiesDir);

    for (const file of files) {
        const content = fs.readFileSync(file, 'utf8');
        const regex = /name:\s*['"]([^'"]+)['"]/g;
        let match;
        const isNoopFile = file.includes('noopAbilities.ts');

        while ((match = regex.exec(content)) !== null) {
            const name = match[1].trim();
            if (isNoopFile) {
                noop.add(name);
            } else {
                implemented.add(name);
            }
        }
    }
    return { implemented, noop };
}

function getAllFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const stat = fs.statSync(path.join(dir, file));
        if (stat.isDirectory()) {
            getAllFiles(path.join(dir, file), fileList);
        } else {
            if (file.endsWith('.ts') && !file.endsWith('.test.ts')) {
                fileList.push(path.join(dir, file));
            }
        }
    }
    return fileList;
}

function getCsvAbilities() {
    const content = fs.readFileSync(enemiesCsvPath, 'utf8');
    const lines = content.split('\n');
    const abilities = new Set();

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const parts = parseCsvLine(line);
        if (parts.length > 9) {
            const abils = parts[9];
            if (abils) {
                const list = abils.split(';').map(s => s.trim()).filter(s => s);
                list.forEach(a => abilities.add(a));
            }
        }
    }
    return abilities;
}

function parseCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

const { implemented, noop } = getImplementedAbilities();
const csvAbilities = getCsvAbilities();

const completelyMissing = [];
const onlyNoop = [];

function normalize(s) {
    return s.toLowerCase().trim();
}

const implementedMap = new Map();
implemented.forEach(a => implementedMap.set(normalize(a), a));

const noopMap = new Map();
noop.forEach(a => noopMap.set(normalize(a), a));

console.log('--- Analysis Report ---');

for (const ability of csvAbilities) {
    const key = normalize(ability);
    if (!implementedMap.has(key)) {
        if (noopMap.has(key)) {
            onlyNoop.push(ability);
        } else {
            completelyMissing.push(ability);
        }
    }
}

console.log(`\nTotal Unique Abilities in CSV: ${csvAbilities.size}`);

console.log(`\n[MISSING] Abilities in CSV but NOT in Codebase (count: ${completelyMissing.length}):`);
if (completelyMissing.length > 0) {
    completelyMissing.sort().forEach(a => console.log(`- ${a}`));
} else {
    console.log('None! All abilities are at least registered.');
}
