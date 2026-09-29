import { useState } from 'react';
import PaceCalculator from './components/PaceCalculator';
import DistanceCalculator from './components/DistanceCalculator';
import TimeCalculator from './components/TimeCalculator';
import RacePrediction from './components/RacePrediction';

const tabs = [
  { id: 'pace', label: 'Pace', icon: '🏃' },
  { id: 'distance', label: 'Distance', icon: '📏' },
  { id: 'time', label: 'Time', icon: '⏱️' },
  { id: 'race', label: 'Race Prediction', icon: '🏆' },
];

function App() {
  const [activeTab, setActiveTab] = useState('pace');

  const renderCalculator = () => {
    switch (activeTab) {
      case 'pace':
        return <PaceCalculator />;
      case 'distance':
        return <DistanceCalculator />;
      case 'time':
        return <TimeCalculator />;
      case 'race':
        return <RacePrediction />;
      default:
        return <PaceCalculator />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">🏃 Running Calculator</h1>
          <p className="text-sm text-gray-500 mt-1">
            Calculate your pace, distance, training time, and race predictions.
          </p>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-2xl mx-auto px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {renderCalculator()}
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-4 py-8 text-center text-xs text-gray-400">
        <p>Running Calculator — Hitung pace, distance, dan prediksi waktu lari</p>
        <p className="mt-1">Rumus prediksi: Riegel Formula (T₂ = T₁ × (D₂/D₁)^1.06)</p>
      </footer>
    </div>
  );
}

export default App;
