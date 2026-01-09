import { useState, useEffect } from 'react';
import { Hero, INITIAL_HERO, HeroStats, EquipmentItem, EquipmentSlot, BackpackItem } from '../types/hero';

const STORAGE_KEY = 'dq-hero-v1';

export function useHero() {
    const [hero, setHero] = useState<Hero>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        let hero = saved ? JSON.parse(saved) : INITIAL_HERO;
        hero.backpack = [...hero.backpack, ...Array(5).fill(null)].slice(0, 5);
        return hero;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(hero));
    }, [hero]);

    // Calculate derived stats
    const effectiveStats: HeroStats = {
        speed: 0,
        brawn: 0,
        magic: 0,
        armour: 0,
        health: hero.stats.health, // Persisted
        maxHealth: hero.stats.maxHealth // Persisted (or should this be derived too? keeping persisted for now)
    };

    // Add stats from equipment
    Object.values(hero.equipment).forEach(item => {
        if (item && item.stats) {
            if (item.stats.speed) effectiveStats.speed += item.stats.speed;
            if (item.stats.brawn) effectiveStats.brawn += item.stats.brawn;
            if (item.stats.magic) effectiveStats.magic += item.stats.magic;
            if (item.stats.armour) effectiveStats.armour += item.stats.armour;
            // Health bonuses usually add to Max Health, assuming that for now:
            if (item.stats.maxHealth) effectiveStats.maxHealth += item.stats.maxHealth;
        }
    });

    const effectiveHero = {
        ...hero,
        stats: effectiveStats
    };

    const updateHealth = (value: number) => {
        setHero(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                health: Math.min(Math.max(0, value), prev.stats.maxHealth) // Note: using base maxHealth for clamping might be wrong if equip gives bonus.
                // But for persistence, we likely want to store relative health or absolute?
                // Let's store absolute, but we need to be careful if maxHealth changes.
                // For now, simple update.
            }
        }));
    };

    const updateName = (name: string) => {
        setHero(prev => ({ ...prev, name }));
    };

    const updatePath = (path: Hero['path']) => {
        setHero(prev => ({ ...prev, path }));
    };

    const updateMoney = (value: number) => {
        setHero(prev => ({
            ...prev,
            money: Math.max(0, value)
        }));
    };

    const equipItem = (item: EquipmentItem, slot: EquipmentSlot) => {
        setHero(prev => ({
            ...prev,
            equipment: {
                ...prev.equipment,
                [slot]: item
            }
        }));
    };

    const unequipItem = (slot: EquipmentSlot) => {
        setHero(prev => {
            const newEquipment = { ...prev.equipment };
            delete newEquipment[slot];
            return {
                ...prev,
                equipment: newEquipment
            };
        });
    };

    const setBackpackItem = (item: BackpackItem, index: number) => {
        setHero(prev => {
            const newBackpack = [...prev.backpack];
            newBackpack[index] = item;
            return {
                ...prev,
                backpack: newBackpack
            };
        });
    };

    const deleteBackpackItem = (index: number) => {
        setHero(prev => {
            const newBackpack = [...prev.backpack];
            newBackpack[index] = null;
            return {
                ...prev,
                backpack: newBackpack
            };
        });
    };

    const updateBackpack = (newBackpack: (BackpackItem | null)[]) => {
        setHero(prev => ({
            ...prev,
            backpack: newBackpack
        }));
    };

    return {
        hero: effectiveHero,
        updateHealth,
        updateName,
        updatePath,
        updateMoney,
        equipItem,
        unequipItem,
        setBackpackItem,
        deleteBackpackItem,
        updateBackpack
    };
}
