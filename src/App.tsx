import React, { useState } from 'react';
import './index.css';
import './App.css';
import MobileLayout from './components/Layout/MobileLayout';
import BottomNav from './components/Navigation/BottomNav';
import HeroStats from './components/Hero/HeroStats';
import EquipmentSlots from './components/Hero/EquipmentSlots';
import CombatArena from './components/Combat/CombatArena';
import { useHero } from './hooks/useHero';

function App() {
    const [activeTab, setActiveTab] = useState<'hero' | 'combat'>('hero');
    const { hero, updateStat, updateHealth } = useHero();

    return (
        <MobileLayout>
            <header className="app-header">
                <h1 className="app-title">Destiny Quest</h1>
            </header>

            <main className="app-main">
                {activeTab === 'hero' ? (
                    <div className="dq-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 className="dq-card-title">Hero Sheet</h2>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 'bold', color: 'var(--dq-gold)' }}>{hero.name}</div>
                                <div className="text-dim" style={{ fontSize: '0.8rem' }}>{hero.path || 'Novice'}</div>
                            </div>
                        </div>

                        <HeroStats
                            stats={hero.stats}
                            onUpdate={(stat, val) => {
                                if (stat === 'health') updateHealth(val);
                                else updateStat(stat, val);
                            }}
                        />

                        <div style={{ marginTop: '24px' }}>
                            <h3 style={{ fontSize: '1rem', color: 'var(--dq-light-grey)', marginBottom: '8px' }}>Equipment</h3>
                            <EquipmentSlots
                                hero={hero}
                                onSlotClick={(slot) => console.log('Clicked slot:', slot)}
                                onBackpackClick={(index) => console.log('Clicked backpack:', index)}
                            />
                        </div>
                    </div>
                ) : (
                    <CombatArena hero={hero} />
                )}
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </MobileLayout>
    );
}

export default App;
