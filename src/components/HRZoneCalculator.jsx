import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateMaxHR, calculateAllZones, ZONE_TRAINING } from '../utils/runningCalculations';

export default function HRZoneCalculator() {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [customMax, setCustomMax] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    const ageNum = parseInt(age);
    const restNum = parseInt(restingHR);
    if (!ageNum || !restNum) return;
    let maxHR = useCustom ? parseInt(customMax) : calculateMaxHR(ageNum);
    if (!maxHR) return;
    setResult({ maxHR, restingHR: restNum, zones: calculateAllZones(maxHR, restNum) });
  };

  return (
    <CalculatorCard title="Heart Rate Zone" icon="💓">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Umur</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="25"
            className="w-full px-3 py-2.5 rounded-lg border text-base"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Resting HR (BPM)</label>
          <input type="number" value={restingHR} onChange={e => setRestingHR(e.target.value)} placeholder="60"
            className="w-full px-3 py-2.5 rounded-lg border text-base"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={useCustom} onChange={e => setUseCustom(e.target.checked)}
            className="w-4 h-4 rounded" style={{ accentColor: 'var(--primary)' }} />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Custom Max HR</span>
        </label>
        {useCustom && (
          <input type="number" value={customMax} onChange={e => setCustomMax(e.target.value)} placeholder="195"
            className="w-full px-3 py-2.5 rounded-lg border text-base"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        )}
        <button onClick={handleCalc} className="w-full py-3 rounded-lg font-medium text-white active:scale-[0.98]"
          style={{ background: 'var(--primary)' }}>Hitung Zone</button>
      </div>
      {result && (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
            <div><p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{result.maxHR}</p><p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Max HR</p></div>
            <div><p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{result.restingHR}</p><p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Resting</p></div>
            <div><p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>{result.maxHR - result.restingHR}</p><p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>Reserve</p></div>
          </div>
          <div className="space-y-2">
            {result.zones.map((zone, i) => (
              <div key={i} className="rounded-lg p-3 border-l-4" style={{ background: zone.bg, borderColor: zone.color }}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 text-[10px] font-bold text-white rounded" style={{ backgroundColor: zone.color }}>Z{zone.zone}</span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{zone.name}</span>
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: zone.color }}>{zone.heartRate.low}-{zone.heartRate.high}</span>
                </div>
                <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{zone.description}</p>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Distribusi Latihan</h3>
            {ZONE_TRAINING.map((t, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 text-xs">
                <span className="w-6 h-6 rounded flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ backgroundColor: ['#94A3B8','#3B82F6','#22C55E','#F59E0B','#EF4444'][i] }}>Z{t.zone}</span>
                <span className="flex-1" style={{ color: 'var(--text)' }}>{t.sessions}</span>
                <span style={{ color: 'var(--text-secondary)' }}>{t.weekly}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
