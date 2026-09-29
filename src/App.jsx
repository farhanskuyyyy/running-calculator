import { useState, useEffect } from 'react';
import PaceCalculator from './components/PaceCalculator';
import DistanceCalculator from './components/DistanceCalculator';
import TimeCalculator from './components/TimeCalculator';
import RacePrediction from './components/RacePrediction';
import HRZoneCalculator from './components/HRZoneCalculator';
import TrainingSimulator from './components/TrainingSimulator';

const tabs = [
  { id: 'pace', label: 'Pace', icon: '⏱️', component: PaceCalculator },
  { id: 'distance', label: 'Jarak', icon: '📏', component: DistanceCalculator },
  { id: 'time', label: 'Waktu', icon: '🏃', component: TimeCalculator },
  { id: 'race', label: 'Race', icon: '🏆', component: RacePrediction },
  { id: 'hr', label: 'HR', icon: '💓', component: HRZoneCalculator },
  { id: 'train', label: 'Plan', icon: '📋', component: TrainingSimulator },
];

export default function App() {
  const [active, setActive] = useState('pace');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('rc-theme') || 'light';
    setTheme(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('rc-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const Comp = tabs.find(c => c.id === active)?.component;

  return (
    <div className="min-h-screen min-h-dvh flex flex-col" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      {/* Header */}
      <header className="sticky top-0 z-20 border-b" style={{ background: 'var(--bg)', borderColor: 'var(--border)' }}>
        <div className="max-w-lg mx-auto px-4 h-12 flex items-center justify-between">
          <h1 className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>Running Calc</h1>
          <button onClick={toggleTheme} className="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
            style={{ background: 'var(--surface)' }}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4" style={{ paddingBottom: '100px' }}>
        <Comp />
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t safe-area-bottom" 
        style={{ background: 'var(--bg)', borderColor: 'var(--border)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="max-w-lg mx-auto flex">
          {tabs.map((c) => (
            <button key={c.id} onClick={() => setActive(c.id)}
              className="flex-1 flex flex-col items-center py-2 transition-colors"
              style={{ color: active === c.id ? 'var(--primary)' : 'var(--text-secondary)' }}>
              <span className="text-base leading-none mb-0.5">{c.icon}</span>
              <span className="text-[9px] font-medium">{c.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
