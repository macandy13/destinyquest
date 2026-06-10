const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 5178;
const BASE_URL = `http://localhost:${PORT}`;
const BASELINES_DIR = path.join(__dirname, '../src/test/visual/baselines');
const ACTUAL_DIR = path.join(__dirname, '../src/test/visual/actual');

// Ensure directories exist
if (!fs.existsSync(BASELINES_DIR)) {
    fs.mkdirSync(BASELINES_DIR, { recursive: true });
}
if (!fs.existsSync(ACTUAL_DIR)) {
    fs.mkdirSync(ACTUAL_DIR, { recursive: true });
}

// Find Google Chrome path on macOS
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!fs.existsSync(CHROME_PATH)) {
    console.error('Google Chrome not found at expected macOS location:', CHROME_PATH);
    process.exit(1);
}

// Start Vite server
console.log(`Starting Vite server on port ${PORT}...`);
const server = spawn('npx', ['vite', '--port', PORT.toString()], {
    cwd: path.join(__dirname, '..'),
    shell: true
});

server.stderr.on('data', (data) => {
    console.error(`Vite error: ${data}`);
});

// Wait for server to start
let serverReady = false;
server.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('ready in') || output.includes(PORT.toString())) {
        serverReady = true;
    }
});

// Helper to wait
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runTests() {
    // Wait up to 5 seconds for server to boot
    for (let i = 0; i < 10; i++) {
        if (serverReady) break;
        await wait(500);
    }

    if (!serverReady) {
        console.error('Vite server failed to start on port', PORT);
        server.kill();
        process.exit(1);
    }

    console.log('Server started. Taking screenshots...');

    const targets = [
        {
            name: 'default_all_books',
            url: `${BASE_URL}/`,
            width: 440,
            height: 800
        },
        {
            name: 'selected_book_legion',
            url: `${BASE_URL}/?book=The+Legion+of+Shadow`,
            width: 440,
            height: 800
        },
        {
            name: 'default_all_books_full',
            url: `${BASE_URL}/`,
            width: 1024,
            height: 800
        },
        {
            name: 'selected_book_legion_full',
            url: `${BASE_URL}/?book=The+Legion+of+Shadow`,
            width: 1024,
            height: 800
        }
    ];

    let allPassed = true;

    for (const target of targets) {
        const actualPath = path.join(ACTUAL_DIR, `${target.name}.png`);
        const baselinePath = path.join(BASELINES_DIR, `${target.name}.png`);

        console.log(`Capturing ${target.name}...`);
        
        try {
            execSync(
                `"${CHROME_PATH}" --headless --disable-gpu --screenshot="${actualPath}" --window-size=${target.width},${target.height} "${target.url}"`,
                { stdio: 'ignore' }
            );
        } catch (err) {
            console.error(`Failed to capture screenshot for ${target.name}:`, err.message);
            allPassed = false;
            continue;
        }

        // If baseline doesn't exist, create it
        if (!fs.existsSync(baselinePath)) {
            console.log(`Baseline not found for ${target.name}. Creating baseline.`);
            fs.copyFileSync(actualPath, baselinePath);
            continue;
        }

        // Simple file size comparison as a basic integrity check
        const actualStats = fs.statSync(actualPath);
        const baselineStats = fs.statSync(baselinePath);

        // Size threshold variance check (e.g. within 15% size is considered matching layout structure)
        const sizeDiffRatio = Math.abs(actualStats.size - baselineStats.size) / baselineStats.size;

        if (sizeDiffRatio > 0.15) {
            console.error(
                `❌ Visual Regression Fail: ${target.name} has changed significantly in visual density/size. ` +
                `Baseline: ${baselineStats.size} bytes, Actual: ${actualStats.size} bytes (diff: ${(sizeDiffRatio * 100).toFixed(1)}%)`
            );
            allPassed = false;
        } else {
            console.log(`✅ Visual Regression Pass: ${target.name} (diff: ${(sizeDiffRatio * 100).toFixed(1)}%)`);
        }
    }

    // Shut down server
    console.log('Shutting down Vite server...');
    server.kill();
    
    if (allPassed) {
        console.log('🎉 All visual regression tests passed successfully!');
        process.exit(0);
    } else {
        console.error('❌ Some visual regression tests failed.');
        process.exit(1);
    }
}

runTests();
