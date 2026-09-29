import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { paceToDisplay, calculateDistance } from '../utils/runningCalculations';

export default function DistanceCalculator() {
  const [paceMin, setPaceMin] = useState(6);
  const [paceSec, setPaceSec] = useState(0);
  const [timeHours, setTimeHours] = useState(0);
  const [timeMin, setTimeMin] = useState(30);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const paceSeconds = (paceMin * 60) + paceSec;
    const totalSeconds = (timeHours * 3600) + (timeMin * 60);
    if (paceSeconds <= 0 || totalSeconds <= 0) return;
    
    const distance = calculateDistance(totalSeconds, paceSeconds);
    setResult({ distance: distance.toFixed(2) });
  };

  return (
    <CalculatorCard title="Distance Calculator" icon="📏">
      <div className="space-y-4">
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

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Time
          </label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <input type="number" value={timeHours} onChange={(e) => setTimeHours(parseInt(e.target.value) || 0)}
                placeholder="Hours" className="w-full px-3 py-3 rounded-lg border text-center"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            </div>
            <div>
              <input type="number" value={timeMin} onChange={(e) => setTimeMin(parseInt(e.target.value) || 0)}
                placeholder="Minutes" className="w-full px-3 py-3 rounded-lg border text-center"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            </div>
          </div>
        </div>

        <button onClick={handleCalculate} className="w-full py-3 rounded-lg font-medium text-white transition-all"
          style={{ background: 'var(--primary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--primary-light)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}>
          Calculate Distance
        </button>

        {result && (
          <div className="p-4 rounded-xl text-center" style={{ background: 'var(--bg)' }}>
            <p className="text-4xl font-bold" style={{ color: 'var(--primary)' }}>{result.distance}</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>kilometers</p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
