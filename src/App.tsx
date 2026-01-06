import { useState } from 'react';
import './index.css';
import './App.css';
import logo from './assets/logo-destiny.png';
import MobileLayout from './components/Layout/MobileLayout';
import BottomNav from './components/Navigation/BottomNav';
import HeroStats from './components/Hero/HeroStats';
import HeroEquipment from './components/Hero/HeroEquipment';
import CombatTab from './components/Combat/CombatTab';
import { useHero } from './hooks/useHero';

function App() {
    const [activeTab, setActiveTab] = useState<'stats' | 'equipment' | 'combat'>('stats');
    const { hero, updateHealth, updateMoney, equipItem, unequipItem, setBackpackItem, deleteBackpackItem, updateBackpack } = useHero();

    const handleCombatFinish = (results: { health?: number, backpack: (any)[] }) => {
        if (results.health) updateHealth(results.health);
        updateBackpack(results.backpack);
        setActiveTab('stats');
    };

    return (
        <MobileLayout>
            <header className="app-header">
                <img src={logo} alt="Destiny Quest" className="app-logo" />
            </header>

            <main className="app-main">
                {activeTab === 'stats' && (
                    <HeroStats
                        hero={hero}
                        onHealthChange={updateHealth}
                        onMoneyChange={updateMoney}
                    />
                )}

                {activeTab === 'equipment' && (
                    <HeroEquipment
                        hero={hero}
                        onEquip={equipItem}
                        onUnequip={unequipItem}
                        onSetBackpackItem={setBackpackItem}
                        onDeleteBackpackItem={deleteBackpackItem}
                    />
                )}

                {activeTab === 'combat' && (
                    <CombatTab
                        hero={hero}
                        onCombatFinish={handleCombatFinish} />
                )}
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </MobileLayout>
    );
}

export default App;
