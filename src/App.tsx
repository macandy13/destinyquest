import React, { useState } from 'react';
import './index.css';
import MobileLayout from './components/Layout/MobileLayout';
import BottomNav from './components/Navigation/BottomNav';

function App() {
    const [activeTab, setActiveTab] = useState<'hero' | 'combat'>('hero');

    return (
        <MobileLayout>
            <header style={{ padding: 'var(--spacing-md)' }}>
                <h1 style={{ fontSize: '1.5rem', textAlign: 'center' }}>Destiny Quest</h1>
            </header>

            <main style={{ padding: '0 var(--spacing-md)' }}>
                {activeTab === 'hero' ? (
                    <div style={{
                        background: 'var(--dq-grey)',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--dq-gold-dim)'
                    }}>
                        <h2>Hero Sheet</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
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
                    <div style={{
                        background: 'var(--dq-grey)',
                        padding: 'var(--spacing-md)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--dq-crimson)'
                    }}>
                        <h2 style={{ color: 'var(--dq-crimson)' }}>Combat</h2>
                        <p className="text-dim">No active combat.</p>
                        <button style={{
                            width: '100%',
                            marginTop: '16px',
                            padding: '12px',
                            background: 'var(--dq-crimson)',
                            border: 'none',
                            borderRadius: '4px',
                            color: 'white',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}>Start Fight</button>
                    </div>
                )}
            </main>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </MobileLayout>
    );
}

export default App;
