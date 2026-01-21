import React from 'react';
import { Combatant } from '../../types/combatState';
import { Enemy } from '../../types/character';
import CombatantCard from './CombatantCard';
import '../Shared/NumberControl.css';
import './EnemyCarousel.css';

interface EnemyCarouselProps {
    enemies: Combatant<Enemy>[];
    activeIndex: number;
    onSelect: (index: number) => void;
}

const EnemyCarousel: React.FC<EnemyCarouselProps> = ({ enemies, activeIndex, onSelect }) => {
    const activeEnemy = enemies[activeIndex];

    const handlePrev = () => {
        onSelect((activeIndex - 1 + enemies.length) % enemies.length);
    };

    const handleNext = () => {
        onSelect((activeIndex + 1) % enemies.length);
    };

    if (!activeEnemy) return null;

    return (
        <div className="enemy-carousel">
            <div className="carousel-container" style={{ position: 'relative' }}>
                <CombatantCard
                    name={activeEnemy.name}
                    currentHealth={activeEnemy.stats.health}
                    maxHealth={activeEnemy.stats.maxHealth}
                    speed={activeEnemy.stats.speed}
                    brawn={activeEnemy.stats.brawn}
                    magic={activeEnemy.stats.magic}
                    armour={activeEnemy.stats.armour}
                    isEnemy={true}
                    activeEffects={activeEnemy.activeEffects}
                />

                {/* Overlays */}
                {enemies.length > 1 && (
                    <>
                        <button
                            className="carousel-btn prev-btn nc-btn"
                            onClick={handlePrev}
                            aria-label="Previous Enemy">
                            &#9664;
                        </button>

                        <div className="carousel-dot-indicator">
                            {enemies.map((enemy, index) => {
                                const isDead = enemy.stats.health <= 0;
                                const isActive = index === activeIndex;
                                return (
                                    <div
                                        key={enemy.id}
                                        className={`indicator-dot ${isActive ? 'active' : ''} ${isDead ? 'dead' : ''}`}
                                        title={`${enemy.name} ${isDead ? '(Defeated)' : ''}`}
                                    />
                                );
                            })}
                        </div>

                        <button
                            className="carousel-btn next-btn nc-btn"
                            onClick={handleNext}
                            aria-label="Next Enemy"
                        >
                            &#9654;
                        </button>
                    </>
                )}

                {/* Status Overlay */}
                {activeEnemy.stats.health <= 0 && (
                    <div className="enemy-status-badge dead">DEFEATED</div>
                )}
            </div>
        </div>
    );
};

export default EnemyCarousel;
