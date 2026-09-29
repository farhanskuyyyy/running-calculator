import { useState } from 'react';
import { DISTANCE_PRESETS, timeToSeconds, paceToDisplay } from '../utils/runningCalculations';

export default function PaceCalculator() {
  const [dist, setDist] = useState(5);
  const [h, setH] = useState(0);
  const [m, setM] = useState(30);
  const [s, setS] = useState(0);
  const [result, setResult] = useState(null);

  const calc = () => {
    const t = (h * 3600) + (m * 60) + s;
    if (t <= 0 || dist <= 0) return;
    setResult({ pace: paceToDisplay(t / dist), speed: ((dist / t) * 3600).toFixed(1) });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Jarak</label>
        <div className="grid grid-cols-4 gap-1.5">
          {DISTANCE_PRESETS.map(p => (
            <button key={p.value} onClick={() => setDist(p.value)} className="py-2 rounded-lg text-xs font-medium transition-colors"
              style={{ background: dist === p.value ? 'var(--primary)' : 'var(--surface)', color: dist === p.value ? '#fff' : 'var(--text-secondary)' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Waktu</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input type="number" value={h} onChange={e => setH(+e.target.value || 0)} placeholder="0"
              className="w-full px-2 py-3 rounded-lg border text-center text-lg font-medium" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <span className="block text-[10px] text-center mt-1" style={{ color: 'var(--text-secondary)' }}>Jam</span>
          </div>
          <div>
            <input type="number" value={m} onChange={e => setM(+e.target.value || 0)} placeholder="30"
              className="w-full px-2 py-3 rounded-lg border text-center text-lg font-medium" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <span className="block text-[10px] text-center mt-1" style={{ color: 'var(--text-secondary)' }}>Menit</span>
          </div>
          <div>
            <input type="number" value={s} onChange={e => setS(+e.target.value || 0)} placeholder="0"
              className="w-full px-2 py-3 rounded-lg border text-center text-lg font-medium" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <span className="block text-[10px] text-center mt-1" style={{ color: 'var(--text-secondary)' }}>Detik</span>
          </div>
        </div>
      </div>
      <button onClick={calc} className="w-full py-3.5 rounded-lg font-medium text-white active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Hitung</button>
      {result && (
        <div className="flex gap-4 p-4 rounded-xl" style={{ background: 'var(--surface)' }}>
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{result.pace}</p>
            <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>min/km</p>
          </div>
          <div className="w-px" style={{ background: 'var(--border)' }} />
          <div className="flex-1 text-center">
            <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{result.speed}</p>
            <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>km/jam</p>
          </div>
        </div>
      )}
    </div>
  );
}
