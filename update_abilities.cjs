
const fs = require('fs');
const path = require('path');

const DIR = 'src/mechanics/abilities';
const METHODS = [
    'onActivate',
    'onCombatStart',
    'onSpeedRoll',
    'onDamageRoll',
    'onDamageDealt',
    'onRoundEnd',
    'onReroll'
];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Check if we need to modify this file
    let needsModification = false;
    for (const method of METHODS) {
        if (content.includes(method + ':')) {
            needsModification = true;
            break;
        }
    }

    if (!needsModification) return;

    // Add import if not present
    if (!content.includes('applyUpdates')) {
        // try to find where to insert
        if (content.includes("import { registerAbility } from '../abilityRegistry';")) {
            content = content.replace("import { registerAbility } from '../abilityRegistry';", "import { registerAbility } from '../abilityRegistry';\nimport { applyUpdates } from '../../types/combat';");
        } else if (content.includes("import { CombatState }")) {
            // Maybe it's already importing something from combat
            if (!content.includes("applyUpdates")) {
                content = content.replace("import { CombatState }", "import { CombatState, applyUpdates }");
            }
        } else {
            // Fallback
            content = "import { applyUpdates } from '../../types/combat';\n" + content;
        }
    }

    // Helper to find balanced braces
    function findBalancedBlock(str, startIndex) {
        let count = 0;
        let started = false;
        for (let i = startIndex; i < str.length; i++) {
            if (str[i] === '{') {
                count++;
                started = true;
            } else if (str[i] === '}') {
                count--;
            }

            if (started && count === 0) {
                return i;
            }
        }
        return -1;
    }

    // Replace returns
    // This simple regex based approach is still risky for nested complex structures but better than global sed
    // We target `return {` ... `};` or `}` inside the known methods.

    // Actually, safer strategy:
    // Regex for `return {`
    // Find the matching closing brace.
    // Wrap it.

    let index = 0;
    while ((index = content.indexOf('return {', index)) !== -1) {
        // Check if this return is inside one of our methods? 
        // Hard to know without AST.
        // But in ability files, `return {` usually returns a Partial<CombatState> OR a DiceRoll[] or similar.
        // DiceRoll[] would be `return [{...}]` -> `return [` so `return {` matches object literal.
        // What about `return { value: 1, ... }` (DiceRoll)?
        // DiceRoll is usually used in `onSpeedRoll` returning `rolls`. But `onSpeedRoll` returns `CombatState` now.
        // Wait, `onSpeedRoll` BEFORE returned `Partial<CombatState>`?
        // Let's check `abilityRegistry` history.
        // `onSpeedRoll?: (..., rolls: DiceRoll[]) => Partial<CombatState>;`
        // So yes, it returned PartialState.

        // So ANY `return {` in these files is likely returning a Partial<CombatState>.
        // EXCEPT if there are internal helper functions.
        // But ability files are usually simple.

        // Let's proceed with finding the block.
        const start = index + 'return '.length; // start of `{`
        const end = findBalancedBlock(content, start);

        if (end !== -1) {
            const block = content.substring(start, end + 1);
            // We replace `return BLOCK` with `return applyUpdates(state, BLOCK)`
            // assuming `state` is the variable name.
            // Most files use `state` or `_state`.
            // We need to find the variable name for state.

            // Look backwards for function signature?
            // `(state,` or `(_state` or `state: CombatState`
            // This is getting complicated.

            // Simplification: Assume the first argument is state.
            // If the existing code uses `_state` but we use `state` in applyUpdates, it might break if `state` is shadowed or unused.
            // But valid JS allows using `_state` if defined.
            // WE MUST use the name of the variable that is available.

            // Let's try to infer variable name by looking backwards for `(state` or `(_state`.
            // Limit lookback to 500 chars.
            const lookback = content.substring(Math.max(0, index - 500), index);
            let stateVar = 'state';
            if (lookback.match(/on\w+:\s*\(\s*_state/)) {
                stateVar = '_state';
            } else if (lookback.match(/on\w+:\s*\(\s*state/)) {
                stateVar = 'state';
            }

            // Ensure we are replacing the specific instance
            const before = content.substring(0, index);
            const after = content.substring(end + 1);

            // Wrap
            content = before + `return applyUpdates(${stateVar}, ` + block + ')' + after;

            index += `return applyUpdates(${stateVar}, `.length + block.length + 1;
        } else {
            index++;
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

// Walk directory
function walk(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            walk(file);
        } else {
            if (file.endsWith('.ts') && !file.endsWith('.test.ts') && !file.endsWith('abilityFactories.ts')) {
                processFile(file);
            }
        }
    });
}

walk(DIR);
