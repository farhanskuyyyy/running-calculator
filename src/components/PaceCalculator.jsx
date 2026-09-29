import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { DISTANCE_PRESETS, timeToSeconds, paceToDisplay } from '../utils/runningCalculations';

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
    });
  };

  return (
    <CalculatorCard title="Kalkulator Pace" icon="🏃">
      <div className="space-y-4">
        {/* Distance Presets */}
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Jarak (km)
          </label>
          <div className="grid grid-cols-4 gap-1.5 md:gap-2 mb-2">
            {DISTANCE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setDistance(preset.value)}
                className="py-2 px-1 rounded-lg text-xs md:text-sm font-medium transition-all"
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
            className="w-full px-3 py-2.5 md:py-3 rounded-lg border text-base"
            style={{ 
              background: 'var(--bg)', 
              borderColor: 'var(--border)',
              color: 'var(--text)'
            }}
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
            Waktu
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                placeholder="JJ"
                className="w-full px-2 py-2.5 md:py-3 rounded-lg border text-center text-base"
                style={{ 
                  background: 'var(--bg)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              />
              <span className="block text-[10px] md:text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>Jam</span>
            </div>
            <div>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                placeholder="MM"
                className="w-full px-2 py-2.5 md:py-3 rounded-lg border text-center text-base"
                style={{ 
                  background: 'var(--bg)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              />
              <span className="block text-[10px] md:text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>Menit</span>
            </div>
            <div>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                placeholder="DD"
                className="w-full px-2 py-2.5 md:py-3 rounded-lg border text-center text-base"
                style={{ 
                  background: 'var(--bg)', 
                  borderColor: 'var(--border)',
                  color: 'var(--text)'
                }}
              />
              <span className="block text-[10px] md:text-xs mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>Detik</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full py-3 rounded-lg font-medium text-white transition-all active:scale-[0.98]"
          style={{ background: 'var(--primary)' }}
        >
          Hitung Pace
        </button>

        {/* Result */}
        {result && (
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--primary)' }}>{result.pace}</p>
                <p className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>min/km</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--primary)' }}>{result.speed}</p>
                <p className="text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>km/jam</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
