#!/bin/bash
find src/mechanics/abilities -name "*.ts" -print0 | xargs -0 sed -i '' 's/return {/return applyUpdates(state, {/g; s/};/});/g' # This is too risky, needs more precision.
