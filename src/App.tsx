import { useState } from 'react';
import './index.css';
import './App.css';
import MobileLayout from './components/Layout/MobileLayout';
import BottomNav from './components/Navigation/BottomNav';
import HeroStats from './components/Hero/HeroStats';
import HeroEquipment from './components/Hero/HeroEquipment';
import CombatArena from './components/Combat/CombatArena';
import { useHero } from './hooks/useHero';

function App() {
    const [activeTab, setActiveTab] = useState<'stats' | 'equipment' | 'combat'>('stats');
    const { hero, updateHealth, updateMoney, equipItem, unequipItem } = useHero();

    return (
        <MobileLayout>
            <header className="app-header">
                <img src="/logo-destiny.png" alt="Destiny Quest" className="app-logo" />
            </header>

            <main className="app-main">
                {activeTab === 'stats' && (
                    <div className="dq-card">
                        <div className="hero-header">
                            <h2 className="dq-card-title">Hero Sheet</h2>
                            <div className="hero-details">
                                <div className="hero-name">{hero.name}</div>
                                <div className="text-dim hero-path">{hero.path || 'Novice'}</div>
                            </div>
                        </div>

                        <HeroStats
                            hero={hero}
                            onHealthChange={updateHealth}
                            onMoneyChange={updateMoney}
                        />
                    </div>
                )}

                {activeTab === 'equipment' && (
                    <div className="dq-card">
                        <div className="hero-header">
                            <h2 className="dq-card-title">Equipment</h2>
                        </div>
                        <HeroEquipment
                            hero={hero}
                            onEquip={equipItem}
                            onUnequip={unequipItem}
                        />
                    </div>
                )}

                {activeTab === 'combat' && (
                    <CombatArena hero={hero} />
                )}
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </MobileLayout>
    );
}

export default App;
