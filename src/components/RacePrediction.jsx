import { useState } from 'react';
import { secondsToTime, predictRaceTime } from '../utils/runningCalculations';

const RACES = [{l:'5K',v:5},{l:'10K',v:10},{l:'Half',v:21.1},{l:'Marathon',v:42.195}];

export default function RacePrediction() {
  const [ref, setRef] = useState(5);
  const [h, setH] = useState(0);
  const [m, setM] = useState(30);
  const [s, setS] = useState(0);
  const [tar, setTar] = useState(10);
  const [result, setResult] = useState(null);

  const calc = () => {
    const t = (h * 3600) + (m * 60) + s;
    if (t <= 0) return;
    setResult({ time: secondsToTime(predictRaceTime(t, ref, tar)) });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Race Referensi</label>
        <div className="flex gap-1.5">
          {RACES.map(r => (
            <button key={r.v} onClick={() => setRef(r.v)} className="flex-1 py-2 rounded-lg text-xs font-medium"
              style={{ background: ref === r.v ? 'var(--primary)' : 'var(--surface)', color: ref === r.v ? '#fff' : 'var(--text-secondary)' }}>
              {r.l}
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
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Target</label>
        <div className="flex gap-1.5">
          {RACES.map(r => (
            <button key={r.v} onClick={() => setTar(r.v)} className="flex-1 py-2 rounded-lg text-xs font-medium"
              style={{ background: tar === r.v ? 'var(--primary)' : 'var(--surface)', color: tar === r.v ? '#fff' : 'var(--text-secondary)' }}>
              {r.l}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-lg font-medium text-white text-sm active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Prediksi</button>
      {result && (
        <div className="p-4 rounded-xl text-center" style={{ background: 'var(--surface)' }}>
          <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{result.time}</p>
          <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>estimasi finish</p>
        </div>
      )}
    </div>
  );
}
