import { useState, useEffect, useMemo } from 'react';
import { Hero, INITIAL_HERO, HeroStats, EquipmentItem, EquipmentSlot, BackpackItem } from '../types/hero';
import { getCareer } from '../data/careers';
import { getAbilityDefinition } from '../mechanics/abilityRegistry';

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
        maxHealth: hero.stats.maxHealth // Base persisted
    };

    // Apply Path bonuses
    if (hero.path === 'Warrior') effectiveStats.maxHealth += 15;
    if (hero.path === 'Mage') effectiveStats.maxHealth += 10;
    if (hero.path === 'Rogue') effectiveStats.maxHealth += 5;

    // Add stats from equipment
    Object.values(hero.equipment).forEach(item => {
        if (item && item.stats) {
            if (item.stats.speed) effectiveStats.speed += item.stats.speed;
            if (item.stats.brawn) effectiveStats.brawn += item.stats.brawn;
            if (item.stats.magic) effectiveStats.magic += item.stats.magic;
            if (item.stats.armour) effectiveStats.armour += item.stats.armour;
            if (item.stats.maxHealth) effectiveStats.maxHealth += item.stats.maxHealth;
        }
    });

    const effectiveHero = {
        ...hero,
        stats: effectiveStats
    };

    // Collect active abilities from equipment and career
    const activeAbilities = useMemo(() => Array.from(new Set<string>([
        // Equipment abilities
        ...Object.values(hero.equipment).flatMap(item => item?.abilities || []),
        // Career abilities
        ...(hero.career ? getCareer(hero.career)?.abilities ?? [] : [])
    ])), [hero.equipment, hero.career]);

    const updateHealth = (value: number) => {
        setHero(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                health: Math.min(Math.max(0, value), effectiveStats.maxHealth) // Clamp to effective max
            }
        }));
    };

    const updateName = (name: string) => {
        setHero(prev => ({ ...prev, name }));
    };

    const updatePath = (path: Hero['path']) => {
        setHero(prev => ({
            ...prev,
            path,
            career: '' // Reset career when path changes
        }));
    };

    const updateCareer = (career: string) => {
        setHero(prev => ({ ...prev, career }));
    };

    const updateMoney = (value: number) => {
        setHero(prev => ({
            ...prev,
            money: Math.max(0, value)
        }));
    };

    const equipItem = (item: EquipmentItem, slot: EquipmentSlot) => {
        setHero(prev => {
            let money = prev.money;
            // Trigger onEquipItem hooks
            activeAbilities.forEach(abilityName => {
                const def = getAbilityDefinition(abilityName);
                if (def && def.onEquipItem) {
                    const updatedHero = def.onEquipItem(prev, item, slot);
                    // Update local vars if needed. MidasTouch only updates money.
                    money = updatedHero.money;
                }
            });

            return {
                ...prev,
                money,
                equipment: {
                    ...prev.equipment,
                    [slot]: item
                }
            };
        });
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
        activeAbilities,
        updateHealth,
        updateName,
        updatePath,
        updateCareer,
        updateMoney,
        equipItem,
        unequipItem,
        setBackpackItem,
        deleteBackpackItem,
        updateBackpack
    };
}
