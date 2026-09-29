import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateTime, paceToDisplay, secondsToTime, DISTANCE_PRESETS } from '../utils/runningCalculations';

export default function TimeCalculator() {
  const [distance, setDistance] = useState('');
  const [paceMinutes, setPaceMinutes] = useState(5);
  const [paceSeconds, setPaceSeconds] = useState(30);
  const [result, setResult] = useState(null);

  const handlePreset = (value) => {
    setDistance(value.toString());
  };

  const handleCalculate = () => {
    const dist = parseFloat(distance);
    const paceSecondsTotal = (paceMinutes * 60) + paceSeconds;

    if (!dist || dist <= 0) {
      alert('Please enter a valid distance');
      return;
    }
    if (paceSecondsTotal <= 0) {
      alert('Please enter a valid pace');
      return;
    }

    const totalTime = calculateTime(dist, paceSecondsTotal);

    setResult({
      time: secondsToTime(totalTime),
      pace: paceToDisplay(paceSecondsTotal),
    });
  };

  return (
    <CalculatorCard title="Time Calculator" icon="⏱️">
      <div className="space-y-4">
        {/* Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Distance</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            min="0"
            step="0.1"
          />
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

        {/* Pace */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Pace (min/km)</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <input
                type="number"
                value={paceMinutes}
                onChange={(e) => setPaceMinutes(parseInt(e.target.value) || 0)}
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
                value={paceSeconds}
                onChange={(e) => setPaceSeconds(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-center"
                min="0"
                max="59"
              />
              <span className="text-xs text-gray-500 text-center block mt-1">sec</span>
            </div>
            <span className="text-gray-500">/km</span>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Calculate Time
        </button>

        {/* Result */}
        {result && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Estimated Time</p>
              <p className="text-3xl font-bold text-primary mono">{result.time}</p>
              <p className="text-xs text-gray-500">at pace {result.pace} /km</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
