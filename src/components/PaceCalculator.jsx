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
        <div className="flex gap-1.5">
          {DISTANCE_PRESETS.map(p => (
            <button key={p.value} onClick={() => setDist(p.value)} className="flex-1 py-2 rounded-lg text-xs font-medium transition-colors"
              style={{ background: dist === p.value ? 'var(--primary)' : 'var(--surface)', color: dist === p.value ? '#fff' : 'var(--text-secondary)' }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Waktu</label>
        <div className="flex gap-2 items-center">
          <input type="number" value={h} onChange={e => setH(+e.target.value || 0)} placeholder="0"
            className="flex-1 px-3 py-2.5 rounded-lg border text-center text-base" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>:</span>
          <input type="number" value={m} onChange={e => setM(+e.target.value || 0)} placeholder="30"
            className="flex-1 px-3 py-2.5 rounded-lg border text-center text-base" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>:</span>
          <input type="number" value={s} onChange={e => setS(+e.target.value || 0)} placeholder="0"
            className="flex-1 px-3 py-2.5 rounded-lg border text-center text-base" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>
        <div className="flex gap-2 mt-1">
          <span className="flex-1 text-center text-[10px]" style={{ color: 'var(--text-secondary)' }}>Jam</span>
          <span className="w-4" />
          <span className="flex-1 text-center text-[10px]" style={{ color: 'var(--text-secondary)' }}>Menit</span>
          <span className="w-4" />
          <span className="flex-1 text-center text-[10px]" style={{ color: 'var(--text-secondary)' }}>Detik</span>
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-lg font-medium text-white text-sm active:scale-[0.98] transition-transform"
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
