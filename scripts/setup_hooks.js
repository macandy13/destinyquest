const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
    // 1. Get git common dir (resolves main .git path even inside worktrees)
    const gitCommonDir = execSync('git rev-parse --git-common-dir')
        .toString()
        .trim();

    const hooksDir = path.join(gitCommonDir, 'hooks');
    const hookPath = path.join(hooksDir, 'pre-commit');

    // Ensure hooks directory exists
    if (!fs.existsSync(hooksDir)) {
        fs.mkdirSync(hooksDir, { recursive: true });
    }

    // 2. Write pre-commit hook script content
    const hookContent = `#!/bin/sh
# Git pre-commit hook to run E2E smoke tests.
# Installed by scripts/setup_hooks.js

echo "🚀 Running E2E smoke tests before commit..."
npm run test:smoke

RESULT=$?
if [ $RESULT -ne 0 ]; then
  echo "❌ Smoke tests failed! Commit aborted."
  exit 1
fi

echo "✅ Smoke tests passed successfully. Proceeding with commit."
exit 0
`;

    fs.writeFileSync(hookPath, hookContent, { encoding: 'utf8', mode: 0o755 });

    // Explicitly set executable permissions
    try {
        fs.chmodSync(hookPath, '755');
    } catch (chmodErr) {
        console.warn('Warning: Could not set executable permissions via chmod.');
    }

    console.log(`🎉 Git pre-commit hook installed at: ${hookPath}`);
} catch (err) {
    console.error('❌ Failed to install Git pre-commit hook:', err.message);
    process.exit(1);
}
