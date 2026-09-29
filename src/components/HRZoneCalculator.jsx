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
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g., 25"
            className="w-full px-4 py-3 rounded-lg border"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Resting Heart Rate (BPM)</label>
          <input type="number" value={restingHR} onChange={(e) => setRestingHR(e.target.value)} placeholder="e.g., 60"
            className="w-full px-4 py-3 rounded-lg border"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="customMaxHR" checked={useCustom} onChange={(e) => setUseCustom(e.target.checked)}
            className="w-4 h-4 rounded" style={{ accentColor: 'var(--primary)' }} />
          <label htmlFor="customMaxHR" className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Use custom Max HR (if known)
          </label>
        </div>

        {useCustom && (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Max Heart Rate (BPM)</label>
            <input type="number" value={customMaxHR} onChange={(e) => setCustomMaxHR(e.target.value)} placeholder="e.g., 195"
              className="w-full px-4 py-3 rounded-lg border"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          </div>
        )}

        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-medium text-white transition-all"
          style={{ background: 'var(--primary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--primary-light)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}>
          Calculate Zones
        </button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="p-4 rounded-xl grid grid-cols-3 gap-4 text-center" style={{ background: 'var(--bg)' }}>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{result.maxHR}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Max HR</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{result.restingHR}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Resting HR</p>
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{result.maxHR - result.restingHR}</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Reserve</p>
            </div>
          </div>

          <div className="space-y-3">
            {result.zones.map((zone, index) => (
              <div key={index} className="rounded-xl p-4 border-l-4"
                style={{ background: zone.bg, borderColor: zone.color }}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-bold text-white rounded" style={{ backgroundColor: zone.color }}>
                      Z{zone.zone}
                    </span>
                    <span className="font-semibold" style={{ color: 'var(--text)' }}>{zone.name}</span>
                  </div>
                  <span className="text-sm font-mono font-bold" style={{ color: zone.color }}>
                    {zone.heartRate.low}-{zone.heartRate.high}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{zone.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
