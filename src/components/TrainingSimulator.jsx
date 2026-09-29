import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { DISTANCE_PRESETS, paceToDisplay, calculatePaceImprovement, estimateWeeks, generateTrainingPlan, calculateImprovements } from '../utils/runningCalculations';

export default function TrainingSimulator() {
  const [distance, setDistance] = useState(5);
  const [currentMinutes, setCurrentMinutes] = useState(37);
  const [currentSeconds, setCurrentSeconds] = useState(30);
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
    setPlan({ distance, currentPace: currentPaceSeconds, targetPace: targetPaceSeconds, improvement, weeks, trainingPlan, improvements });
  };

  return (
    <CalculatorCard title="Training Simulator" icon="🗓️">
      <div className="space-y-4">
        {/* Current Performance */}
        <div className="p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
          <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Current Performance</h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              {[5, 10, 21.1].map(d => (
                <button key={d} onClick={() => setDistance(d)} className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    background: distance === d ? 'var(--primary)' : 'var(--surface)',
                    color: distance === d ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${distance === d ? 'var(--primary)' : 'var(--border)'}`,
                  }}>
                  {d === 21.1 ? 'Half' : d + 'K'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Current Time</label>
                <div className="flex gap-1">
                  <input type="number" value={currentMinutes} onChange={e => setCurrentMinutes(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-2 rounded-lg border text-center text-sm"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                  <span className="self-center" style={{ color: 'var(--text-secondary)' }}>:</span>
                  <input type="number" value={currentSeconds} onChange={e => setCurrentSeconds(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-2 rounded-lg border text-center text-sm"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1" style={{ color: 'var(--text-secondary)' }}>Target Time</label>
                <div className="flex gap-1">
                  <input type="number" value={targetMinutes} onChange={e => setTargetMinutes(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-2 rounded-lg border text-center text-sm"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                  <span className="self-center" style={{ color: 'var(--text-secondary)' }}>:</span>
                  <input type="number" value={targetSeconds} onChange={e => setTargetSeconds(parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-2 rounded-lg border text-center text-sm"
                    style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={handleSimulate} className="w-full py-3 rounded-lg font-medium text-white transition-all"
          style={{ background: 'var(--primary)' }}
          onMouseEnter={(e) => e.target.style.background = 'var(--primary-light)'}
          onMouseLeave={(e) => e.target.style.background = 'var(--primary)'}>
          Generate Training Plan
        </button>
      </div>

      {plan && (
        <div className="mt-6 space-y-4">
          {/* Summary */}
          <div className="p-4 rounded-xl text-white" style={{ background: 'var(--primary)' }}>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{paceToDisplay(plan.currentPace)}</p>
                <p className="text-xs opacity-80">Current</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{paceToDisplay(plan.targetPace)}</p>
                <p className="text-xs opacity-80">Target</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{plan.weeks}</p>
                <p className="text-xs opacity-80">Weeks</p>
              </div>
            </div>
          </div>

          {/* Training Method */}
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Training Method: Polarized (80/20)</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
              Based on research by Seiler & Kjerland (2006)
            </p>
            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="p-2 rounded-lg" style={{ background: 'var(--surface)' }}>
                <p className="text-lg font-bold" style={{ color: '#22C55E' }}>80%</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Easy (Z1-Z2)</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: 'var(--surface)' }}>
                <p className="text-lg font-bold" style={{ color: 'var(--text-secondary)' }}>5%</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Moderate (Z3)</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: 'var(--surface)' }}>
                <p className="text-lg font-bold" style={{ color: 'var(--primary)' }}>15%</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Hard (Z4-Z5)</p>
              </div>
            </div>
          </div>

          {/* Sample Week */}
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <h3 className="font-semibold mb-3" style={{ color: 'var(--text)' }}>Sample Week</h3>
            <div className="space-y-2">
              {plan.trainingPlan[0]?.days.map((day, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg"
                  style={{ background: day.type === 'Rest' ? 'var(--surface)' : 'var(--bg)' }}>
                  <span className="w-10 text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>{day.day}</span>
                  <span className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      background: day.type === 'Rest' ? 'var(--border)' : 
                                  day.zone?.includes('Z4') || day.zone?.includes('Z5') ? '#FEE2E2' :
                                  day.zone === 'Z3' ? '#FEF3C7' : '#D1FAE5',
                      color: day.type === 'Rest' ? 'var(--text-secondary)' :
                             day.zone?.includes('Z4') || day.zone?.includes('Z5') ? '#991B1B' :
                             day.zone === 'Z3' ? '#92400E' : '#065F46'
                    }}>
                    {day.type}
                  </span>
                  <span className="text-sm flex-1" style={{ color: 'var(--text)' }}>{day.notes}</span>
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{day.duration}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-xl" style={{ background: 'var(--bg)' }}>
            <h3 className="font-semibold mb-2" style={{ color: 'var(--text)' }}>Tips</h3>
            <ul className="text-sm space-y-1" style={{ color: 'var(--text-secondary)' }}>
              <li>• 80% of runs should feel EASY</li>
              <li>• Never skip rest days</li>
              <li>• Increase volume by max 10% per week</li>
              <li>• Sleep 7-9 hours for recovery</li>
            </ul>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
