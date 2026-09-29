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
        <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Pace (min/km)</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input type="number" value={pm} onChange={e => setPm(+e.target.value || 0)} placeholder="6"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Menit</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl font-medium" style={{ color: 'var(--text-tertiary)' }}>:</span>
          </div>
          <div>
            <input type="number" value={ps} onChange={e => setPs(+e.target.value || 0)} placeholder="0"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Detik</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Waktu</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <input type="number" value={th} onChange={e => setTh(+e.target.value || 0)} placeholder="0"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Jam</span>
          </div>
          <div>
            <input type="number" value={tm} onChange={e => setTm(+e.target.value || 0)} placeholder="30"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Menit</span>
          </div>
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Hitung</button>
      {result && (
        <div className="p-4 rounded-lg text-center" style={{ background: 'var(--surface)' }}>
          <p className="text-3xl font-bold font-heading" style={{ color: 'var(--primary)' }}>{result.dist}</p>
          <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>kilometer</p>
        </div>
      )}
    </div>
  );
}
