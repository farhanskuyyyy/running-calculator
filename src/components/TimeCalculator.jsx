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
    
    const totalSeconds = calculateTime(distance, paceSeconds);
    setResult({ time: secondsToTime(totalSeconds) });
  };

  return (
    <CalculatorCard title="Time Calculator" icon="⏱️">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Distance (km)
          </label>
          <input type="number" value={distance} onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-lg border"
            style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Pace (min/km)
          </label>
          <div className="flex gap-2 items-center">
            <input type="number" value={paceMin} onChange={(e) => setPaceMin(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-3 rounded-lg border text-center"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <span className="text-xl font-bold" style={{ color: 'var(--text-secondary)' }}>:</span>
            <input type="number" value={paceSec} onChange={(e) => setPaceSec(parseInt(e.target.value) || 0)}
              className="w-20 px-3 py-3 rounded-lg border text-center"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>min/km</span>
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-medium text-white transition-all"
          style={{ background: 'var(--primary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--primary-light)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}>
          Calculate Time
        </button>

        {result && (
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--bg)' }}>
            <p className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>{result.time}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>estimated time</p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
