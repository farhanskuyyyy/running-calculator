import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateMaxHR, calculateAllZones, HR_ZONES, ZONE_TRAINING } from '../utils/runningCalculations';

export default function HRZoneCalculator() {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [customMaxHR, setCustomMaxHR] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const ageNum = parseInt(age);
    const restingNum = parseInt(restingHR);
    
    if (!ageNum || ageNum < 10 || ageNum > 100) return;
    if (!restingNum || restingNum < 30 || restingNum > 100) return;
    
    let maxHR = useCustom ? parseInt(customMaxHR) : calculateMaxHR(ageNum);
    if (!maxHR || maxHR < 100 || maxHR > 220) return;
    
    const zones = calculateAllZones(maxHR, restingNum);
    setResult({ maxHR, restingHR: restingNum, zones });
  };

  return (
    <CalculatorCard title="Heart Rate Zone Calculator" icon="💓">
      <div className="space-y-4">
        {/* Age Input */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="e.g., 25"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Resting HR */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Resting Heart Rate (BPM)</label>
          <input
            type="number"
            value={restingHR}
            onChange={(e) => setRestingHR(e.target.value)}
            placeholder="e.g., 60"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-400 mt-1">Typical: 40-80 BPM. Measure in morning.</p>
        </div>

        {/* Custom Max HR Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="customMaxHR"
            checked={useCustom}
            onChange={(e) => setUseCustom(e.target.checked)}
            className="w-4 h-4 text-red-600 rounded"
          />
          <label htmlFor="customMaxHR" className="text-sm text-gray-600">Use custom Max HR (if known)</label>
        </div>

        {useCustom && (
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Max Heart Rate (BPM)</label>
            <input
              type="number"
              value={customMaxHR}
              onChange={(e) => setCustomMaxHR(e.target.value)}
              placeholder="e.g., 195"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        )}

        <button
          onClick={handleCalculate}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
        >
          Calculate Zones 💓
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 space-y-4">
          {/* Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-red-600">{result.maxHR}</p>
                <p className="text-xs text-gray-500">Max HR</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{result.restingHR}</p>
                <p className="text-xs text-gray-500">Resting HR</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{result.maxHR - result.restingHR}</p>
                <p className="text-xs text-gray-500">Heart Rate Reserve</p>
              </div>
            </div>
          </div>

          {/* Zones */}
          <div className="space-y-3">
            {result.zones.map((zone, index) => (
              <div
                key={index}
                className="rounded-xl p-4 border-l-4"
                style={{ backgroundColor: zone.bg, borderColor: zone.color }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span
                      className="inline-block px-2 py-1 text-xs font-bold text-white rounded"
                      style={{ backgroundColor: zone.color }}
                    >
                      Z{zone.zone}
                    </span>
                    <span className="ml-2 font-semibold text-gray-800">{zone.name}</span>
                  </div>
                  <span className="text-sm font-mono font-bold" style={{ color: zone.color }}>
                    {zone.heartRate.low}-{zone.heartRate.high} BPM
                  </span>
                </div>
                <p className="text-xs text-gray-600">{zone.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-500">% HRR:</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: zone.color,
                        width: `${zone.highPercent * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color: zone.color }}>
                    {zone.targetPercent}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Training Guide */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">📊 Training Distribution Guide</h3>
            <div className="space-y-2">
              {ZONE_TRAINING.map((t, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: HR_ZONES[i].color }}
                  >
                    Z{t.zone}
                  </span>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{t.sessions}</span>
                      <span className="text-gray-500">{t.weekly}</span>
                    </div>
                    <span className="text-xs text-gray-400">Intensity: {t.intensity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
