import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { secondsToTime, predictRaceTime } from '../utils/runningCalculations';

const RACES = [
  { label: '5K', value: 5 },
  { label: '10K', value: 10 },
  { label: 'Half', value: 21.1 },
  { label: 'Full', value: 42.195 },
];

export default function RacePrediction() {
  const [refDist, setRefDist] = useState(5);
  const [h, setH] = useState(0);
  const [m, setM] = useState(30);
  const [s, setS] = useState(0);
  const [targetDist, setTargetDist] = useState(10);
  const [result, setResult] = useState(null);

  const handleCalc = () => {
    const total = (h * 3600) + (m * 60) + s;
    if (total <= 0) return;
    setResult({ time: secondsToTime(predictRaceTime(total, refDist, targetDist)) });
  };

  return (
    <CalculatorCard title="Prediksi Race" icon="🏆">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Race Referensi</label>
          <div className="grid grid-cols-4 gap-1.5">
            {RACES.map((d) => (
              <button key={d.value} onClick={() => setRefDist(d.value)}
                className="py-2 rounded-lg text-xs md:text-sm font-medium"
                style={{
                  background: refDist === d.value ? 'var(--primary)' : 'var(--bg)',
                  color: refDist === d.value ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${refDist === d.value ? 'var(--primary)' : 'var(--border)'}`,
                }}>{d.label}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Waktu</label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" value={h} onChange={e => setH(parseInt(e.target.value) || 0)} placeholder="JJ"
              className="w-full px-2 py-2.5 rounded-lg border text-center text-base"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <input type="number" value={m} onChange={e => setM(parseInt(e.target.value) || 0)} placeholder="MM"
              className="w-full px-2 py-2.5 rounded-lg border text-center text-base"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <input type="number" value={s} onChange={e => setS(parseInt(e.target.value) || 0)} placeholder="DD"
              className="w-full px-2 py-2.5 rounded-lg border text-center text-base"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Target Race</label>
          <div className="grid grid-cols-4 gap-1.5">
            {RACES.map((d) => (
              <button key={d.value} onClick={() => setTargetDist(d.value)}
                className="py-2 rounded-lg text-xs md:text-sm font-medium"
                style={{
                  background: targetDist === d.value ? 'var(--primary)' : 'var(--bg)',
                  color: targetDist === d.value ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${targetDist === d.value ? 'var(--primary)' : 'var(--border)'}`,
                }}>{d.label}</button>
            ))}
          </div>
        </div>
        <button onClick={handleCalc} className="w-full py-3 rounded-lg font-medium text-white active:scale-[0.98]"
          style={{ background: 'var(--primary)' }}>Prediksi Waktu</button>
        {result && (
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--bg)' }}>
            <p className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--primary)' }}>{result.time}</p>
            <p className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>estimasi finish</p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
