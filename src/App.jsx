import { useState, useEffect } from 'react';
import PaceCalculator from './components/PaceCalculator';
import DistanceCalculator from './components/DistanceCalculator';
import TimeCalculator from './components/TimeCalculator';
import RacePrediction from './components/RacePrediction';
import HRZoneCalculator from './components/HRZoneCalculator';
import TrainingSimulator from './components/TrainingSimulator';

const tabs = [
  { id: 'pace', label: 'Pace', icon: '🏃' },
  { id: 'distance', label: 'Jarak', icon: '📏' },
  { id: 'time', label: 'Waktu', icon: '⏱️' },
  { id: 'race', label: 'Race', icon: '🏆' },
  { id: 'hr', label: 'HR Zone', icon: '💓' },
  { id: 'train', label: 'Latihan', icon: '🗓️' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('pace');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="min-h-screen min-h-dvh" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: 'var(--primary)' }}>
              Running Calculator
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Kalkulator latihan lari
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
            style={{ background: 'var(--surface)' }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-4 pb-20 md:pb-4">
        {/* Tab Navigation - Bottom on mobile, top on desktop */}
        <nav className="fixed bottom-0 left-0 right-0 z-10 border-t md:static md:bottom-auto md:border-t-0 md:mb-4"
          style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
          <div className="max-w-2xl mx-auto px-2 py-2 md:px-0 md:p-1 md:rounded-xl md:flex md:gap-1"
            style={{ background: 'var(--surface)' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex-1 min-w-0 py-2 md:py-2.5 px-1 md:px-2 rounded-lg text-xs md:text-sm font-medium transition-all"
                style={{
                  background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
                }}
              >
                <span className="block text-base md:text-lg">{tab.icon}</span>
                <span className="block mt-0.5 truncate">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Calculator Views */}
        <div className="space-y-4 md:space-y-6">
          {activeTab === 'pace' && <PaceCalculator />}
          {activeTab === 'distance' && <DistanceCalculator />}
          {activeTab === 'time' && <TimeCalculator />}
          {activeTab === 'race' && <RacePrediction />}
          {activeTab === 'hr' && <HRZoneCalculator />}
          {activeTab === 'train' && <TrainingSimulator />}
        </div>
      </main>
    </div>
  );
}
