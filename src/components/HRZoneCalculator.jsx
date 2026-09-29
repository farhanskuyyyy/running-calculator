import { useState } from 'react';
import { calculateMaxHR, calculateAllZones, ZONE_TRAINING } from '../utils/runningCalculations';

export default function HRZoneCalculator() {
  const [age, setAge] = useState('');
  const [rest, setRest] = useState('');
  const [result, setResult] = useState(null);

  const calc = () => {
    const a = parseInt(age), r = parseInt(rest);
    if (!a || !r) return;
    const max = calculateMaxHR(a);
    setResult({ max, rest: r, zones: calculateAllZones(max, r) });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Umur</label>
          <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="25"
            className="w-full px-3 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
        </div>
        <div>
          <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Resting HR</label>
          <input type="number" value={rest} onChange={e => setRest(e.target.value)} placeholder="60"
            className="w-full px-3 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Hitung Zone</button>
      {result && (
        <div className="space-y-2">
          <div className="flex gap-3 p-3 rounded-lg text-center" style={{ background: 'var(--surface)' }}>
            <div className="flex-1"><p className="text-xl font-bold font-heading" style={{ color: 'var(--primary)' }}>{result.max}</p><p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Max HR</p></div>
            <div className="flex-1"><p className="text-xl font-bold font-heading" style={{ color: 'var(--primary)' }}>{result.rest}</p><p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Resting</p></div>
            <div className="flex-1"><p className="text-xl font-bold font-heading" style={{ color: 'var(--primary)' }}>{result.max - result.rest}</p><p className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Reserve</p></div>
          </div>
          {result.zones.map((z, i) => (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-md border-l-3" style={{ background: z.bg, borderLeftColor: z.color, borderLeftWidth: 3 }}>
              <span className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold text-white" style={{ background: z.color }}>Z{z.zone}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{z.name}</span>
                  <span className="text-xs font-mono" style={{ color: z.color }}>{z.heartRate.low}-{z.heartRate.high}</span>
                </div>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-tertiary)' }}>{z.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
