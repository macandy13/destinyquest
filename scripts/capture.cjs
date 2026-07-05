const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set simulated mobile device viewport size
    await page.setViewport({
        width: 440,
        height: 850,
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true
    });

    const outputDir = path.join(__dirname, '../tests/screenshots');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    console.log('Navigating to local dev server...');
    await page.goto('http://localhost:5174/', { waitUntil: 'networkidle2' });

    console.log('Setting test hero in localStorage...');
    await page.evaluate(() => {
        const testHero = {
            type: 'hero',
            name: 'Mighty Gladiator',
            path: 'Warrior',
            career: 'Gladiator',
            stats: {
                speed: 3,
                brawn: 4,
                magic: 1,
                armour: 2,
                health: 45,
                maxHealth: 45
            },
            equipment: {
                mainHand: {
                    id: 'sword1',
                    name: 'Gladiator Sword',
                    type: 'mainHand',
                    stats: { brawn: 2, speed: 1 },
                    abilities: ['Pound'],
                    bookRef: { book: 'Core', act: 1 }
                },
                chest: {
                    id: 'armour1',
                    name: 'Gladiator Plate',
                    type: 'chest',
                    stats: { armour: 2 },
                    abilities: ['Thorn Armour'],
                    bookRef: { book: 'Core', act: 1 }
                }
            },
            backpack: [
                {
                    id: 'potion1',
                    name: 'Healing Potion',
                    type: 'backpack',
                    description: 'Restore 10 health',
                    effect: { name: 'heal', value: 10 },
                    bookRef: { book: 'Core', act: 1 }
                },
                null, null, null, null
            ],
            money: 100
        };
        localStorage.setItem('dq-hero-v1', JSON.stringify(testHero));
    });

    console.log('Reloading to load test hero...');
    await page.reload({ waitUntil: 'networkidle2' });

    await page.waitForSelector('.nav-button');
    const buttons = await page.$$('.nav-button');
    await buttons[2].click();

    await page.waitForSelector('.tab-btn');
    const tabBtns = await page.$$('.tab-btn');
    await tabBtns[1].click();

    await page.waitForSelector('.custom-enemy-form .btn-secondary');
    const fightDummyBtn = await page.$('.custom-enemy-form .btn-secondary');
    await fightDummyBtn.click();

    await page.waitForSelector('.combat-arena');

    // 1. COMBAT START PHASE SCREENSHOT
    console.log('Capturing: combat-start.png...');
    await page.screenshot({ path: path.join(outputDir, 'combat-start.png') });

    // 2. Click "Roll Speed Dice"
    console.log('Clicking Roll Speed Dice...');
    let actionBtn = await page.waitForSelector('.btn-phase-action');
    await actionBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    // 3. SPEED ROLL PHASE SCREENSHOT
    console.log('Capturing: speed-roll.png...');
    await page.screenshot({ path: path.join(outputDir, 'speed-roll.png') });

    // 4. Click "Roll Damage Dice" or "Commit Speed..."
    console.log('Clicking Roll Damage/Commit Speed...');
    actionBtn = await page.waitForSelector('.btn-phase-action');
    await actionBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    // 5. DAMAGE ROLL PHASE SCREENSHOT
    console.log('Capturing: damage-roll.png...');
    await page.screenshot({ path: path.join(outputDir, 'damage-roll.png') });

    // 6. Click "Confirm Damage Roll"
    console.log('Clicking Confirm Damage...');
    actionBtn = await page.waitForSelector('.btn-phase-action');
    await actionBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    // 7. APPLY DAMAGE / PASSIVE PHASE SCREENSHOT
    console.log('Capturing: apply-damage.png...');
    await page.screenshot({ path: path.join(outputDir, 'apply-damage.png') });

    // 8. Click "Resolve Passive Abilities" or "Next Round"
    console.log('Clicking Next Action...');
    actionBtn = await page.waitForSelector('.btn-phase-action');
    await actionBtn.click();
    await new Promise(r => setTimeout(r, 1000));

    // 9. ROUND SUMMARY / PASSIVE DAMAGE SCREENSHOT
    console.log('Capturing: round-summary.png...');
    await page.screenshot({ path: path.join(outputDir, 'round-summary.png') });

    await browser.close();
    console.log('Finished capturing all phases.');
})();
