import { useState } from 'react';
import { calculateDistance } from '../utils/runningCalculations';

export default function DistanceCalculator() {
  const [pm, setPm] = useState(6);
  const [ps, setPs] = useState(0);
  const [th, setTh] = useState(0);
  const [tm, setTm] = useState(30);
  const [result, setResult] = useState(null);

  const calc = () => {
    const pace = (pm * 60) + ps;
    const time = (th * 3600) + (tm * 60);
    if (pace <= 0 || time <= 0) return;
    setResult({ dist: calculateDistance(time, pace).toFixed(2) });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Pace (min/km)</label>
        <div className="flex gap-2 items-center">
          <input type="number" value={pm} onChange={e => setPm(+e.target.value || 0)} className="w-20 px-3 py-2.5 rounded-lg border text-center text-base"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>:</span>
          <input type="number" value={ps} onChange={e => setPs(+e.target.value || 0)} className="w-20 px-3 py-2.5 rounded-lg border text-center text-base"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>min/km</span>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Waktu</label>
        <div className="flex gap-2 items-center">
          <input type="number" value={th} onChange={e => setTh(+e.target.value || 0)} placeholder="Jam"
            className="flex-1 px-3 py-2.5 rounded-lg border text-center text-base" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>:</span>
          <input type="number" value={tm} onChange={e => setTm(+e.target.value || 0)} placeholder="Menit"
            className="flex-1 px-3 py-2.5 rounded-lg border text-center text-base" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-lg font-medium text-white text-sm active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Hitung</button>
      {result && (
        <div className="p-4 rounded-xl text-center" style={{ background: 'var(--surface)' }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{result.dist}</p>
          <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>kilometer</p>
        </div>
      )}
    </div>
  );
}
