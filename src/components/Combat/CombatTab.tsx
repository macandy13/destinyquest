import React, { useState } from 'react';
import { Hero, BackpackItem } from '../../types/hero';
import { Enemy } from '../../types/character';
import EnemySelector from './EnemySelector';
import CombatArena from './CombatArena';

interface CombatTabProps {
    hero: Hero;
    onCombatFinish: (results: { health?: number, backpack: (BackpackItem | null)[] }) => void;
}

const CombatTab: React.FC<CombatTabProps> = ({ hero, onCombatFinish }) => {
    const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);

    const handleCombatFinish = (results: { health?: number, backpack: (BackpackItem | null)[] }) => {
        setSelectedEnemy(null);
        onCombatFinish(results);
    };

    if (!selectedEnemy) {
        return <EnemySelector onSelect={setSelectedEnemy} />;
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
