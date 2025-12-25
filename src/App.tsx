import { useState } from 'react';
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
    const { hero, updateHealth } = useHero();

    return (
        <MobileLayout>
            <header className="app-header">
                <h1 className="app-title">Destiny Quest</h1>
            </header>

            <main className="app-main">
                {activeTab === 'hero' ? (
                    <div className="dq-card">
                        <div className="hero-header">
                            <h2 className="dq-card-title">Hero Sheet</h2>
                            <div className="hero-details">
                                <div className="hero-name">{hero.name}</div>
                                <div className="text-dim hero-path">{hero.path || 'Novice'}</div>
                            </div>
                        </div>

                        <HeroStats
                            stats={hero.stats}
                            onHealthChange={updateHealth}
                        />

                        <div className="equipment-section">
                            <h3 className="equipment-heading">Equipment</h3>
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
