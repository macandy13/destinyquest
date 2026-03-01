import React, { useState } from 'react';
import { Hero, BackpackItem } from '../../types/hero';
import { BookRef } from '../../types/bookRef';
import { Enemy } from '../../types/character';
import EnemySelector from './EnemySelector';
import CombatArena from './CombatArena';

interface CombatTabProps {
    hero: Hero;
    onCombatFinish: (results: {
        health?: number,
        backpack: (BackpackItem | null)[]
    }) => void;
    filterFn?: (bookRef: BookRef) => boolean;
}

const CombatTab: React.FC<CombatTabProps> = ({
    hero,
    onCombatFinish,
    filterFn
}) => {
    const [selectedEnemy, setSelectedEnemy] =
        useState<Enemy | null>(null);

    const handleCombatFinish = (results: {
        health?: number,
        backpack: (BackpackItem | null)[]
    }) => {
        setSelectedEnemy(null);
        onCombatFinish(results);
    };

    if (!selectedEnemy) {
        return (
            <EnemySelector
                onSelect={setSelectedEnemy}
                filterFn={filterFn}
            />
        );
    }

    return (
        <CombatArena
            hero={hero}
            enemy={selectedEnemy}
            onCombatFinish={handleCombatFinish}
        />
    );
};

export default CombatTab;
