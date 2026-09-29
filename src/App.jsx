import { useState } from 'react';
import PaceCalculator from './components/PaceCalculator';
import DistanceCalculator from './components/DistanceCalculator';
import TimeCalculator from './components/TimeCalculator';
import RacePrediction from './components/RacePrediction';
import HRZoneCalculator from './components/HRZoneCalculator';

const tabs = [
  { id: 'pace', label: 'Pace', icon: '🏃' },
  { id: 'distance', label: 'Distance', icon: '📏' },
  { id: 'time', label: 'Time', icon: '⏱️' },
  { id: 'race', label: 'Race', icon: '🏆' },
  { id: 'hr', label: 'HR Zone', icon: '💓' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('pace');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-green-600">🏃 Running Calculator</h1>
          <p className="text-sm text-gray-500">Training calculator for runners</p>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 bg-white rounded-xl p-1 shadow-sm border border-gray-100 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[60px] py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
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
        </div>
      </main>
    </div>
  );
}
