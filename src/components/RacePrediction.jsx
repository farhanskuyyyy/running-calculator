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
        <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Race Referensi</label>
        <div className="grid grid-cols-4 gap-1.5">
          {RACES.map(r => (
            <button key={r.v} onClick={() => setRef(r.v)} className="py-2 rounded-md text-xs font-medium"
              style={{ background: ref === r.v ? 'var(--primary)' : 'var(--surface)', color: ref === r.v ? '#fff' : 'var(--text-secondary)', border: `1px solid ${ref === r.v ? 'var(--primary)' : 'var(--border)'}` }}>
              {r.l}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Waktu</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input type="number" value={h} onChange={e => setH(+e.target.value || 0)} placeholder="0"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Jam</span>
          </div>
          <div>
            <input type="number" value={m} onChange={e => setM(+e.target.value || 0)} placeholder="30"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Menit</span>
          </div>
          <div>
            <input type="number" value={s} onChange={e => setS(+e.target.value || 0)} placeholder="0"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Detik</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Target</label>
        <div className="grid grid-cols-4 gap-1.5">
          {RACES.map(r => (
            <button key={r.v} onClick={() => setTar(r.v)} className="py-2 rounded-md text-xs font-medium"
              style={{ background: tar === r.v ? 'var(--primary)' : 'var(--surface)', color: tar === r.v ? '#fff' : 'var(--text-secondary)', border: `1px solid ${tar === r.v ? 'var(--primary)' : 'var(--border)'}` }}>
              {r.l}
            </button>
          ))}
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Prediksi</button>
      {result && (
        <div className="p-4 rounded-lg text-center" style={{ background: 'var(--surface)' }}>
          <p className="text-3xl font-bold font-heading" style={{ color: 'var(--primary)' }}>{result.time}</p>
          <p className="text-[11px] uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>estimasi finish</p>
        </div>
      )}
    </div>
  );
}
