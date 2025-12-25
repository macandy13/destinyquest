import React, { useState } from 'react';
import './index.css';
import './App.css';
import MobileLayout from './components/Layout/MobileLayout';
import BottomNav from './components/Navigation/BottomNav';

function App() {
    const [activeTab, setActiveTab] = useState<'hero' | 'combat'>('hero');

    return (
        <MobileLayout>
            <header className="app-header">
                <h1 className="app-title">Destiny Quest</h1>
            </header>

            <main className="app-main">
                {activeTab === 'hero' ? (
                    <div className="dq-card">
                        <h2 className="dq-card-title">Hero Sheet</h2>
                        <div className="hero-stats-grid">
                            <div>
                                <span className="text-dim">Name</span>
                                <div>Unknown</div>
                            </div>
                            <div>
                                <span className="text-dim">Class</span>
                                <div>Novice</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="dq-card combat">
                        <h2 className="dq-card-title">Combat</h2>
                        <p className="text-dim">No active combat.</p>
                        <button className="btn-primary">Start Fight</button>
                    </div>
                )}
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </MobileLayout>
    );
}

export default App;
