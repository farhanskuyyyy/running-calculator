import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { secondsToTime, predictRaceTime } from '../utils/runningCalculations';

const RACE_DISTANCES = [
  { label: '5K', value: 5 },
  { label: '10K', value: 10 },
  { label: 'Half Marathon', value: 21.1 },
  { label: 'Marathon', value: 42.195 },
];

export default function RacePrediction() {
  const [refDistance, setRefDistance] = useState(5);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [targetDistance, setTargetDistance] = useState(10);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds <= 0 || refDistance <= 0 || targetDistance <= 0) return;
    
    const predicted = predictRaceTime(totalSeconds, refDistance, targetDistance);
    setResult({ time: secondsToTime(predicted) });
  };

  return (
    <CalculatorCard title="Race Prediction" icon="🏆">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Reference Race
          </label>
          <div className="flex gap-2 mb-2">
            {RACE_DISTANCES.map((d) => (
              <button key={d.value} onClick={() => setRefDistance(d.value)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: refDistance === d.value ? 'var(--primary)' : 'var(--bg)',
                  color: refDistance === d.value ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${refDistance === d.value ? 'var(--primary)' : 'var(--border)'}`,
                }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            <input type="number" value={hours} onChange={(e) => setHours(parseInt(e.target.value) || 0)}
              placeholder="HH" className="w-full px-3 py-3 rounded-lg border text-center"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <input type="number" value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
              placeholder="MM" className="w-full px-3 py-3 rounded-lg border text-center"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            <input type="number" value={seconds} onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
              placeholder="SS" className="w-full px-3 py-3 rounded-lg border text-center"
              style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Target Race
          </label>
          <div className="flex gap-2">
            {RACE_DISTANCES.map((d) => (
              <button key={d.value} onClick={() => setTargetDistance(d.value)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: targetDistance === d.value ? 'var(--primary)' : 'var(--bg)',
                  color: targetDistance === d.value ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${targetDistance === d.value ? 'var(--primary)' : 'var(--border)'}`,
                }}>
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-medium text-white transition-all"
          style={{ background: 'var(--primary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--primary-light)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}>
          Predict Time
        </button>

        {result && (
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--bg)' }}>
            <p className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>{result.time}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>predicted finish time</p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
