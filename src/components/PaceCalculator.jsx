import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculatePace, calculateSpeed, paceToDisplay, timeToSeconds, DISTANCE_PRESETS } from '../utils/runningCalculations';

export default function PaceCalculator() {
  const [distance, setDistance] = useState('');
  const [unit, setUnit] = useState('km');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState(null);

  const handlePreset = (value) => {
    setDistance(value.toString());
  };

  const handleCalculate = () => {
    const dist = parseFloat(distance);
    if (!dist || dist <= 0) {
      alert('Please enter a valid distance');
      return;
    }

    const totalSeconds = timeToSeconds(hours, minutes, seconds);
    if (totalSeconds <= 0) {
      alert('Please enter a valid time');
      return;
    }

    const pace = calculatePace(dist, totalSeconds);
    const speed = calculateSpeed(dist, totalSeconds);

    setResult({
      pace: paceToDisplay(pace),
      paceUnit: unit,
      speed: speed.toFixed(2),
      speedUnit: unit === 'km' ? 'km/h' : 'mph',
    });
  };

  return (
    <CalculatorCard title="Pace Calculator" icon="🏃">
      <div className="space-y-4">
        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Distance</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder="0"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              min="0"
              step="0.1"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="km">km</option>
              <option value="mile">mile</option>
            </select>
          </div>
          {/* Presets */}
          <div className="flex flex-wrap gap-2 mt-2">
            {DISTANCE_PRESETS.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset.value)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-primary hover:text-white rounded-lg transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Time</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-center"
                min="0"
                max="23"
              />
              <span className="text-xs text-gray-500 text-center block mt-1">hours</span>
            </div>
            <span className="text-xl text-gray-400">:</span>
            <div className="flex-1">
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-center"
                min="0"
                max="59"
              />
              <span className="text-xs text-gray-500 text-center block mt-1">min</span>
            </div>
            <span className="text-xl text-gray-400">:</span>
            <div className="flex-1">
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-center"
                min="0"
                max="59"
              />
              <span className="text-xs text-gray-500 text-center block mt-1">sec</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Calculate Pace
        </button>

        {/* Result */}
        {result && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Pace</p>
                <p className="text-2xl font-bold text-primary mono">{result.pace}</p>
                <p className="text-xs text-gray-500">/{result.paceUnit}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Speed</p>
                <p className="text-2xl font-bold text-primary mono">{result.speed}</p>
                <p className="text-xs text-gray-500">{result.speedUnit}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
