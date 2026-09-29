import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { calculateDistance, paceToDisplay, timeToSeconds, secondsToTime, DISTANCE_PRESETS } from '../utils/runningCalculations';

export default function DistanceCalculator() {
  const [paceMinutes, setPaceMinutes] = useState(5);
  const [paceSeconds, setPaceSeconds] = useState(30);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const paceSecondsTotal = (paceMinutes * 60) + paceSeconds;
    const totalSeconds = timeToSeconds(hours, minutes, seconds);

    if (paceSecondsTotal <= 0) {
      alert('Please enter a valid pace');
      return;
    }
    if (totalSeconds <= 0) {
      alert('Please enter a valid time');
      return;
    }

    const distance = calculateDistance(paceSecondsTotal, totalSeconds);

    setResult({
      distance: distance.toFixed(2),
      distanceUnit: 'km',
    });
  };

  return (
    <CalculatorCard title="Distance Calculator" icon="📏">
      <div className="space-y-4">
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

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Training Time</label>
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
          Calculate Distance
        </button>

        {/* Result */}
        {result && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Estimated Distance</p>
              <p className="text-3xl font-bold text-primary mono">{result.distance}</p>
              <p className="text-sm text-gray-500">{result.distanceUnit}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
