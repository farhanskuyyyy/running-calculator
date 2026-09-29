import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { DISTANCE_PRESETS, timeToSeconds, secondsToTime, paceToDisplay } from '../utils/runningCalculations';

export default function PaceCalculator() {
  const [distance, setDistance] = useState(5);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const totalSeconds = timeToSeconds(hours, minutes, seconds);
    if (totalSeconds <= 0 || distance <= 0) return;
    
    const paceSeconds = totalSeconds / distance;
    const speedKmh = (distance / totalSeconds) * 3600;
    
    setResult({
      pace: paceToDisplay(paceSeconds),
      speed: speedKmh.toFixed(2),
      paceRaw: paceSeconds,
    });
  };

  return (
    <CalculatorCard title="Pace Calculator" icon="🏃">
      <div className="space-y-4">
        {/* Distance */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Distance (km)
          </label>
          <div className="flex gap-2 mb-2">
            {DISTANCE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setDistance(preset.value)}
                className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  background: distance === preset.value ? 'var(--primary)' : 'var(--bg)',
                  color: distance === preset.value ? 'white' : 'var(--text-secondary)',
                  border: `1px solid ${distance === preset.value ? 'var(--primary)' : 'var(--border)'}`,
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 rounded-lg border"
            style={{ 
              background: 'var(--bg)', 
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }}
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Time
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                placeholder="HH"
                className="w-full px-3 py-3 rounded-lg border text-center"
                style={{ 
                  background: 'var(--bg)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              />
              <span className="block text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>Hours</span>
            </div>
            <div>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                placeholder="MM"
                className="w-full px-3 py-3 rounded-lg border text-center"
                style={{ 
                  background: 'var(--bg)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              />
              <span className="block text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>Minutes</span>
            </div>
            <div>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                placeholder="SS"
                className="w-full px-3 py-3 rounded-lg border text-center"
                style={{ 
                  background: 'var(--bg)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              />
              <span className="block text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>Seconds</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-medium text-white transition-all"
          style={{ background: 'var(--primary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--primary-light)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}
        >
          Calculate Pace
        </button>

        {/* Result */}
        {result && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{result.pace}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>min/km</p>
              </div>
              <div>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{result.speed}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>km/h</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
