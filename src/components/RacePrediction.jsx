import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { predictRaceTime, paceToDisplay, secondsToTime, timeToSeconds, DISTANCE_PRESETS } from '../utils/runningCalculations';

export default function RacePrediction() {
  const [refDistance, setRefDistance] = useState(5);
  const [refHours, setRefHours] = useState(0);
  const [refMinutes, setRefMinutes] = useState(25);
  const [refSeconds, setRefSeconds] = useState(0);
  const [targetDistance, setTargetDistance] = useState(10);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const totalSeconds = timeToSeconds(refHours, refMinutes, refSeconds);

    if (totalSeconds <= 0) {
      alert('Please enter a valid reference time');
      return;
    }
    if (refDistance <= 0 || targetDistance <= 0) {
      alert('Please enter valid distances');
      return;
    }

    const predictedTime = predictRaceTime(totalSeconds, refDistance, targetDistance);
    const predictedPace = predictedTime / targetDistance;

    setResult({
      time: secondsToTime(predictedTime),
      pace: paceToDisplay(predictedPace),
      targetDistance: targetDistance,
    });
  };

  return (
    <CalculatorCard title="Race Time Prediction" icon="🏆">
      <div className="space-y-4">
        {/* Reference Run */}
        <div className="bg-gray-50 rounded-xl p-4">
          <label className="block text-sm font-medium text-gray-600 mb-2">Reference Run</label>
          <div className="flex gap-2 mb-2">
            <select
              value={refDistance}
              onChange={(e) => setRefDistance(parseFloat(e.target.value))}
              className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              {DISTANCE_PRESETS.map((preset) => (
                <option key={preset.label} value={preset.value}>{preset.label}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <input
                type="number"
                value={refHours}
                onChange={(e) => setRefHours(parseInt(e.target.value) || 0)}
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
                value={refMinutes}
                onChange={(e) => setRefMinutes(parseInt(e.target.value) || 0)}
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
                value={refSeconds}
                onChange={(e) => setRefSeconds(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-center"
                min="0"
                max="59"
              />
              <span className="text-xs text-gray-500 text-center block mt-1">sec</span>
            </div>
          </div>
        </div>

        {/* Target Distance */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Target Distance</label>
          <select
            value={targetDistance}
            onChange={(e) => setTargetDistance(parseFloat(e.target.value))}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          >
            {DISTANCE_PRESETS.map((preset) => (
              <option key={preset.label} value={preset.value}>{preset.label}</option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Predict Race Time
        </button>

        {/* Result */}
        {result && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Predicted Time</p>
                <p className="text-2xl font-bold text-primary mono">{result.time}</p>
                <p className="text-xs text-gray-500">{result.targetDistance}K</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Predicted Pace</p>
                <p className="text-2xl font-bold text-primary mono">{result.pace}</p>
                <p className="text-xs text-gray-500">/km</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3 italic">
              *Estimasi berdasarkan rumus Riegel. Hasil bukan jaminan performa.
            </p>
          </div>
        )}
      </div>
    </CalculatorCard>
  );
}
