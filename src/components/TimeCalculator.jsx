import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { secondsToTime, calculateTime } from '../utils/runningCalculations';

export default function TimeCalculator() {
  const [distance, setDistance] = useState(5);
  const [paceMin, setPaceMin] = useState(6);
  const [paceSec, setPaceSec] = useState(0);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const paceSeconds = (paceMin * 60) + paceSec;
    if (paceSeconds <= 0 || distance <= 0) return;
    setResult({ time: secondsToTime(calculateTime(distance, paceSeconds)) });
  };

  return (
    <CalculatorCard title="Kalkulator Waktu" icon="⏱️">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Jarak (km)</label>
          <input type="number" value={distance} onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2.5 rounded-lg border text-base"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Pace (min/km)</label>
          <div className="flex gap-2 items-center">
            <input type="number" value={paceMin} onChange={(e) => setPaceMin(parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-2.5 rounded-lg border text-center text-base"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <span className="text-lg font-bold" style={{ color: 'var(--text-secondary)' }}>:</span>
            <input type="number" value={paceSec} onChange={(e) => setPaceSec(parseInt(e.target.value) || 0)}
              className="w-20 px-2 py-2.5 rounded-lg border text-center text-base"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>min/km</span>
          </div>
        </div>
        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-medium text-white active:scale-[0.98]"
          style={{ background: 'var(--primary)' }}>Hitung Waktu</button>
        {result && (
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--bg)' }}>
            <p className="text-3xl md:text-4xl font-bold" style={{ color: 'var(--primary)' }}>{result.time}</p>
            <p className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>estimasi waktu</p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
