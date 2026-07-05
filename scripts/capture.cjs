const { spawn } = require('child_process');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const PORT = 5188;
const BASE_URL = `http://localhost:${PORT}`;
const SCREENSHOTS_DIR = path.join(__dirname, '../tests/screenshots');

// Helper to wait
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
    // 1. Start Vite Server
    console.log(`Starting Vite server on port ${PORT}...`);
    const server = spawn('npx', ['vite', '--port', PORT.toString()], {
        cwd: path.join(__dirname, '..'),
        shell: true
    });

    let serverReady = false;
    server.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('ready in') || output.includes(PORT.toString())) {
            serverReady = true;
        }
    });

    server.stderr.on('data', (data) => {
        console.error(`Vite error: ${data}`);
    });

    // Wait for server to boot (up to 5 seconds)
    for (let i = 0; i < 10; i++) {
        if (serverReady) break;
        await wait(500);
    }

    if (!serverReady) {
        console.error('Vite server failed to start');
        server.kill();
        process.exit(1);
    }

    console.log('Server started. Running smoke test...');

    let browser;
    try {
        // Ensure screenshots directory exists
        if (!fs.existsSync(SCREENSHOTS_DIR)) {
            fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
        }

        // 2. Launch Puppeteer
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        await page.setViewport({
            width: 440,
            height: 850,
            deviceScaleFactor: 2,
            isMobile: true,
            hasTouch: true
        });

        // 3. Clear localStorage for clean state
        console.log('Navigating and clearing localStorage...');
        await page.goto(BASE_URL, { waitUntil: 'networkidle2' });
        await page.evaluate(() => localStorage.clear());
        await page.reload({ waitUntil: 'networkidle2' });

        // 4. Create Hero
        console.log('Entering hero name...');
        const inputEl = await page.waitForSelector('.hero-input');
        await inputEl.click({ clickCount: 3 });
        await page.keyboard.press('Backspace');
        await page.type('.hero-input', 'Mighty Gladiator');

        console.log('Selecting Warrior path...');
        const selects = await page.$$('.hero-input');
        await selects[1].select('Warrior');
        await wait(500);

        console.log('Selecting Gladiator career...');
        const selectsUpdated = await page.$$('.hero-input');
        await selectsUpdated[2].select('Gladiator');
        await wait(500);

        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, '01-hero-created.png')
        });

        // 5. Navigate to Inventory
        console.log('Navigating to Inventory...');
        await page.waitForSelector('.nav-button');
        const navButtons = await page.$$('.nav-button');
        await navButtons[1].click();
        await wait(500);

        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, '02-inventory-tab.png')
        });

        // 6. Equip Main-Hand Weapon
        console.log('Equipping Main weapon...');
        const slots = await page.$$('.equipment-slot');
        let foundMain = false;
        for (const slot of slots) {
            const label = await slot.$eval(
                '.slot-label',
                el => el.textContent
            ).catch(() => null);
            if (label === 'Main') {
                await slot.click();
                foundMain = true;
                break;
            }
        }
        if (!foundMain) throw new Error('Main Hand slot not found');
        await wait(500);

        await page.waitForSelector('.dq-input');
        await page.type('.dq-input', 'Skullbreaker');
        await wait(500);

        await page.waitForSelector('.item-card');
        const itemCards = await page.$$('.item-card');
        let equippedWeapon = false;
        for (const card of itemCards) {
            const name = await card.$eval(
                '.item-name',
                el => el.textContent
            ).catch(() => null);
            if (name && name.includes('Skullbreaker')) {
                await card.click();
                equippedWeapon = true;
                break;
            }
        }
        if (!equippedWeapon) throw new Error('Skullbreaker not equipped');
        await wait(500);

        // 7. Equip Chest Armour
        console.log('Equipping Chest armor...');
        const slots2 = await page.$$('.equipment-slot');
        let foundChest = false;
        for (const slot of slots2) {
            const label = await slot.$eval(
                '.slot-label',
                el => el.textContent
            ).catch(() => null);
            if (label === 'Chest') {
                await slot.click();
                foundChest = true;
                break;
            }
        }
        if (!foundChest) throw new Error('Chest slot not found');
        await wait(500);

        await page.waitForSelector('.dq-input');
        await page.type('.dq-input', 'Goblin leathers');
        await wait(500);

        await page.waitForSelector('.item-card');
        const itemCards2 = await page.$$('.item-card');
        let equippedChest = false;
        for (const card of itemCards2) {
            const name = await card.$eval(
                '.item-name',
                el => el.textContent
            ).catch(() => null);
            if (name && name.includes('Goblin leathers')) {
                await card.click();
                equippedChest = true;
                break;
            }
        }
        if (!equippedChest) throw new Error('Goblin leathers not equipped');
        await wait(500);

        // 8. Equip Backpack Healing Potion
        console.log('Equipping Healing Potion to backpack...');
        await page.waitForSelector('.backpack-slot-wrapper');
        const backpackSlots = await page.$$('.backpack-slot-wrapper');
        await backpackSlots[0].click();
        await wait(500);

        await page.waitForSelector('.dq-input');
        await page.type('.dq-input', 'Healing Potion');
        await wait(500);

        await page.waitForSelector('.item-card');
        const itemCards3 = await page.$$('.item-card');
        let equippedPotion = false;
        for (const card of itemCards3) {
            const name = await card.$eval(
                '.item-name',
                el => el.textContent
            ).catch(() => null);
            if (name && name.includes('Healing Potion')) {
                await card.click();
                equippedPotion = true;
                break;
            }
        }
        if (!equippedPotion) throw new Error('Healing Potion not equipped');
        await wait(500);

        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, '03-equipped.png')
        });

        // 9. Navigate to Combat
        console.log('Navigating to Combat...');
        const navButtonsCombat = await page.$$('.nav-button');
        await navButtonsCombat[2].click();
        await wait(500);

        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, '04-combat-opponent-selection.png')
        });

        // 10. Select Custom Opponent and click Fight Dummy
        console.log('Selecting Custom opponent tab...');
        await page.waitForSelector('.tab-btn');
        const tabBtns = await page.$$('.tab-btn');
        await tabBtns[1].click();
        await wait(500);

        console.log('Starting fight with Training Dummy...');
        await page.waitForSelector('.custom-enemy-form .btn-secondary');
        const fightDummyBtn = await page.$(
            '.custom-enemy-form .btn-secondary'
        );
        await fightDummyBtn.click();
        await wait(1000);

        // 11. Run through Combat
        let screenshotIndex = 5;
        while (true) {
            const isEnded = await page.evaluate(() => {
                const arena = document.querySelector('.combat-arena');
                if (!arena) return false;
                const text = arena.textContent || '';
                return text.includes('VICTORY!') || text.includes('DEFEAT!');
            });

            if (isEnded) {
                console.log('Combat finished!');
                break;
            }

            const actionBtn = await page.$(
                '.btn-primary.btn-phase-action'
            );
            if (actionBtn) {
                const btnText = await page.evaluate(
                    el => el.textContent.trim(),
                    actionBtn
                );
                console.log(`Combat Action: clicking "${btnText}"`);

                const cleanText = btnText.toLowerCase().replace(/\s+/g, '-');
                const filename = `${String(screenshotIndex).padStart(
                    2,
                    '0'
                )}-combat-${cleanText}.png`;

                await page.screenshot({
                    path: path.join(SCREENSHOTS_DIR, filename)
                });
                screenshotIndex++;

                await actionBtn.click();
                await wait(1000);
            } else {
                console.log('Waiting for action button...');
                await wait(1000);
            }
        }

        // 12. Combat End Phase Screenshot
        const endFilename = `${String(screenshotIndex).padStart(
            2,
            '0'
        )}-combat-end.png`;
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, endFilename)
        });
        screenshotIndex++;

        // 13. Exit Combat and restore health
        console.log('Exiting combat and restoring health...');
        const endButtons = await page.$$('button');
        let exited = false;
        for (const btn of endButtons) {
            const text = await page.evaluate(el => el.textContent, btn);
            if (text.includes('Restore Health')) {
                await btn.click();
                exited = true;
                break;
            }
        }
        if (!exited) throw new Error('Exit combat button not found');
        await wait(1000);

        // 14. Final Screenshot
        const finalFilename = `${String(screenshotIndex).padStart(
            2,
            '0'
        )}-returned-to-hero-sheet.png`;
        await page.screenshot({
            path: path.join(SCREENSHOTS_DIR, finalFilename)
        });

        console.log('🎉 E2E Smoke Test completed successfully!');
        await browser.close();
        server.kill();
        process.exit(0);
    } catch (err) {
        console.error('❌ E2E Smoke Test failed:', err.message);
        if (browser) await browser.close();
        server.kill();
        process.exit(1);
    }
})();
