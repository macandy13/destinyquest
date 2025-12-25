import { useState, useEffect } from 'react';
import { Hero, INITIAL_HERO, HeroStats } from '../types/hero';

const STORAGE_KEY = 'dq-hero-v1';

export function useHero() {
    const [hero, setHero] = useState<Hero>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_HERO;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(hero));
    }, [hero]);

    const updateStat = (stat: keyof HeroStats, value: number) => {
        setHero(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                [stat]: value
            }
        }));
    };

    const updateHealth = (value: number) => {
        setHero(prev => ({
            ...prev,
            stats: {
                ...prev.stats,
                health: Math.min(Math.max(0, value), prev.stats.maxHealth)
            }
        }));
    };

    const updateName = (name: string) => {
        setHero(prev => ({ ...prev, name }));
    };

    const updatePath = (path: Hero['path']) => {
        setHero(prev => ({ ...prev, path }));
    };

    return {
        hero,
        updateStat,
        updateHealth,
        updateName,
        updatePath
    };
}
