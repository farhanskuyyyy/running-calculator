import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { 
  DISTANCE_PRESETS, 
  paceToDisplay, 
  calculatePaceImprovement, 
  estimateWeeks, 
  generateTrainingPlan,
  calculateImprovements 
} from '../utils/runningCalculations';

export default function TrainingSimulator() {
  const [distance, setDistance] = useState(5);
  const [currentMinutes, setCurrentMinutes] = useState(37);
  const [currentSeconds, setCurrentSeconds] = useState(30);
  const [currentHR, setCurrentHR] = useState(160);
  const [targetMinutes, setTargetMinutes] = useState(30);
  const [targetSeconds, setTargetSeconds] = useState(0);
  const [plan, setPlan] = useState(null);

  const handleSimulate = () => {
    const currentPaceSeconds = ((currentMinutes * 60) + currentSeconds) / distance;
    const targetPaceSeconds = ((targetMinutes * 60) + targetSeconds) / distance;
    
    if (targetPaceSeconds >= currentPaceSeconds) {
      alert('Target pace should be faster (lower) than current pace!');
      return;
    }
    
    const improvement = calculatePaceImprovement(currentPaceSeconds, targetPaceSeconds);
    const weeks = estimateWeeks(improvement);
    const trainingPlan = generateTrainingPlan(currentPaceSeconds, targetPaceSeconds, weeks);
    const improvements = calculateImprovements(currentPaceSeconds, targetPaceSeconds, weeks);
    
    setPlan({
      distance,
      currentPace: currentPaceSeconds,
      targetPace: targetPaceSeconds,
      improvement,
      weeks,
      trainingPlan,
      improvements,
      avgHR: currentHR
    });
  };

  return (
    <CalculatorCard title="Training Simulator" icon="🗓️">
      <div className="space-y-4">
        {/* Current Performance */}
        <div className="bg-blue-50 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-3">📊 Current Performance</h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Distance</label>
              <div className="flex gap-2">
                {DISTANCE_PRESETS.filter(d => [5, 10, 21.1].includes(d.value)).map(d => (
                  <button key={d.value} onClick={() => setDistance(d.value)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                      distance === d.value 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}>
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Current Time</label>
                <div className="flex gap-2">
                  <input type="number" value={currentMinutes} onChange={e => setCurrentMinutes(parseInt(e.target.value) || 0)}
                    placeholder="min" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center" />
                  <span className="text-gray-400 self-center">:</span>
                  <input type="number" value={currentSeconds} onChange={e => setCurrentSeconds(parseInt(e.target.value) || 0)}
                    placeholder="sec" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Avg HR (BPM)</label>
                <input type="number" value={currentHR} onChange={e => setCurrentHR(parseInt(e.target.value) || 0)}
                  placeholder="160" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Target Performance */}
        <div className="bg-green-50 rounded-xl p-4">
          <h3 className="font-semibold text-green-800 mb-3">🎯 Target Performance</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Target Time</label>
              <div className="flex gap-2">
                <input type="number" value={targetMinutes} onChange={e => setTargetMinutes(parseInt(e.target.value) || 0)}
                  placeholder="min" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center" />
                <span className="text-gray-400 self-center">:</span>
                <input type="number" value={targetSeconds} onChange={e => setTargetSeconds(parseInt(e.target.value) || 0)}
                  placeholder="sec" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-center" />
              </div>
            </div>
            <div className="flex items-end">
              <div className="text-center w-full bg-green-100 rounded-lg py-2">
                <p className="text-2xl font-bold text-green-600">
                  {paceToDisplay(((targetMinutes * 60) + targetSeconds) / distance)}
                </p>
                <p className="text-xs text-gray-500">min/km</p>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSimulate}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-green-600 transition-all">
          Generate Training Plan 🗓️
        </button>
      </div>

      {/* Results */}
      {plan && (
        <div className="mt-6 space-y-4">
          {/* Summary Stats */}
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-4 text-white">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{paceToDisplay(plan.currentPace)}</p>
                <p className="text-sm opacity-80">Current Pace</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">{paceToDisplay(plan.targetPace)}</p>
                <p className="text-sm opacity-80">Target Pace</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-2xl font-bold">{plan.weeks}</p>
                <p className="text-xs opacity-80">Weeks</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{plan.improvement}%</p>
                <p className="text-xs opacity-80">Improvement</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{plan.avgHR}</p>
                <p className="text-xs opacity-80">Avg HR</p>
              </div>
            </div>
          </div>

          {/* Expected Improvements */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">📈 Expected Physiological Adaptations</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="font-medium text-blue-800">VO2max</p>
                <p className="text-blue-600">{plan.improvements.vo2maxIncrease}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="font-medium text-green-800">Lactate Threshold</p>
                <p className="text-green-600">{plan.improvements.lactateThreshold}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="font-medium text-purple-800">Weekly Pace Drop</p>
                <p className="text-purple-600">{plan.improvements.weeklyPaceDrop}</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="font-medium text-orange-800">Total Improvement</p>
                <p className="text-orange-600">{plan.improvements.totalImprovement}</p>
              </div>
            </div>
          </div>

          {/* Training Method */}
          <div className="bg-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold text-indigo-800 mb-2">🧬 Training Method: Polarized (80/20)</h3>
            <p className="text-sm text-indigo-700 mb-2">
              Based on research by Seiler & Kjerland (2006), the most effective training distribution:
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-green-600">80%</p>
                <p className="text-xs text-gray-600">Easy (Z1-Z2)</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-gray-400">5%</p>
                <p className="text-xs text-gray-600">Moderate (Z3)</p>
              </div>
              <div className="bg-white rounded-lg p-2">
                <p className="text-lg font-bold text-red-600">15%</p>
                <p className="text-xs text-gray-600">Hard (Z4-Z5)</p>
              </div>
            </div>
          </div>

          {/* Weekly Plan */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">📅 Sample Week</h3>
            <div className="space-y-2">
              {plan.trainingPlan[0]?.days.map((day, i) => (
                <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${
                  day.type === 'Rest' ? 'bg-gray-50' :
                  day.zone === 'Z4-Z5' ? 'bg-red-50' :
                  day.zone === 'Z3' ? 'bg-yellow-50' : 'bg-green-50'
                }`}>
                  <span className="w-10 text-sm font-bold text-gray-600">{day.day}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    day.type === 'Rest' ? 'bg-gray-200 text-gray-600' :
                    day.zone === 'Z4-Z5' ? 'bg-red-200 text-red-700' :
                    day.zone === 'Z3' ? 'bg-yellow-200 text-yellow-700' : 'bg-green-200 text-green-700'
                  }`}>{day.type}</span>
                  <span className="text-sm text-gray-600 flex-1">{day.notes}</span>
                  <span className="text-xs text-gray-500">{day.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Workouts */}
          <div className="bg-white rounded-xl border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">🔥 Key Workouts</h3>
            <div className="space-y-3 text-sm">
              <div className="border-l-4 border-red-500 pl-3">
                <p className="font-medium">Interval Training (Z4-Z5)</p>
                <p className="text-gray-600">4x800m @ target pace, 400m jog recovery</p>
                <p className="text-xs text-gray-400">Purpose: Improve VO2max & running economy</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-3">
                <p className="font-medium">Tempo Run (Z3)</p>
                <p className="text-gray-600">20 min @ comfortably hard pace</p>
                <p className="text-xs text-gray-400">Purpose: Increase lactate threshold</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-medium">Long Run (Z2)</p>
                <p className="text-gray-600">60+ min @ easy conversational pace</p>
                <p className="text-xs text-gray-400">Purpose: Build aerobic base & endurance</p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-amber-50 rounded-xl p-4">
            <h3 className="font-semibold text-amber-800 mb-2">💡 Pro Tips</h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• 80% of runs should feel EASY (can hold conversation)</li>
              <li>• Never skip rest days — adaptation happens during recovery</li>
              <li>• Increase weekly volume by max 10% per week</li>
              <li>• Sleep 7-9 hours for optimal recovery</li>
              <li>• Easy runs: HR should be 60-70% of max HR</li>
            </ul>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
