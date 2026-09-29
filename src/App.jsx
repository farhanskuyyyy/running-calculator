import { useState, useEffect } from 'react';
import PaceCalculator from './components/PaceCalculator';
import DistanceCalculator from './components/DistanceCalculator';
import TimeCalculator from './components/TimeCalculator';
import RacePrediction from './components/RacePrediction';
import HRZoneCalculator from './components/HRZoneCalculator';
import TrainingSimulator from './components/TrainingSimulator';

const tabs = [
  { id: 'pace', label: 'Pace', icon: '🏃' },
  { id: 'distance', label: 'Distance', icon: '📏' },
  { id: 'time', label: 'Time', icon: '⏱️' },
  { id: 'race', label: 'Race', icon: '🏆' },
  { id: 'hr', label: 'HR Zone', icon: '💓' },
  { id: 'train', label: 'Train', icon: '🗓️' },
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
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header */}
      <header className="sticky top-0 z-10 border-b" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold" style={{ color: 'var(--primary)' }}>
              Running Calculator
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Training calculator for runners
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ background: 'var(--surface)' }}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: 'var(--surface)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 min-w-[55px] py-3 px-2 rounded-lg text-sm font-medium transition-all"
              style={{
                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-secondary)',
              }}
            >
              <span className="block text-lg">{tab.icon}</span>
              <span className="block text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Calculator Views */}
        <div className="space-y-6">
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
