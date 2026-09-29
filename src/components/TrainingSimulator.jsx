import { useState } from 'react';
import CalculatorCard from './CalculatorCard';
import { paceToDisplay, calculatePaceImprovement, estimateWeeks, generateTrainingPlan, calculateImprovements } from '../utils/runningCalculations';

export default function TrainingSimulator() {
  const [dist, setDist] = useState(5);
  const [curM, setCurM] = useState(37);
  const [curS, setCurS] = useState(30);
  const [tarM, setTarM] = useState(30);
  const [tarS, setTarS] = useState(0);
  const [plan, setPlan] = useState(null);

  const handleSim = () => {
    const cur = ((curM * 60) + curS) / dist;
    const tar = ((tarM * 60) + tarS) / dist;
    if (tar >= cur) return alert('Target harus lebih cepat!');
    const imp = calculatePaceImprovement(cur, tar);
    const wks = estimateWeeks(imp);
    setPlan({
      cur, tar, improvement: imp, weeks: wks,
      trainingPlan: generateTrainingPlan(cur, tar, wks),
      improvements: calculateImprovements(cur, tar, wks)
    });
  };

  return (
    <CalculatorCard title="Simulator Latihan" icon="🗓️">
      <div className="space-y-4">
        <div className="p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
          <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Performa Saat Ini</h3>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {[5, 10, 21.1].map(d => (
              <button key={d} onClick={() => setDist(d)} className="py-1.5 rounded-lg text-xs font-medium"
                style={{ background: dist === d ? 'var(--primary)' : 'var(--surface)', color: dist === d ? 'white' : 'var(--text-secondary)', border: `1px solid ${dist === d ? 'var(--primary)' : 'var(--border)'}` }}>
                {d === 21.1 ? 'Half' : d + 'K'}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] mb-1 block" style={{ color: 'var(--text-secondary)' }}>Sekarang</label>
              <div className="flex gap-1">
                <input type="number" value={curM} onChange={e => setCurM(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-2 rounded-lg border text-center text-sm" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                <span className="self-center text-xs" style={{ color: 'var(--text-secondary)' }}>:</span>
                <input type="number" value={curS} onChange={e => setCurS(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-2 rounded-lg border text-center text-sm" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
              </div>
            </div>
            <div>
              <label className="text-[10px] mb-1 block" style={{ color: 'var(--text-secondary)' }}>Target</label>
              <div className="flex gap-1">
                <input type="number" value={tarM} onChange={e => setTarM(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-2 rounded-lg border text-center text-sm" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
                <span className="self-center text-xs" style={{ color: 'var(--text-secondary)' }}>:</span>
                <input type="number" value={tarS} onChange={e => setTarS(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-2 rounded-lg border text-center text-sm" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleSim} className="w-full py-3 rounded-lg font-medium text-white active:scale-[0.98]"
          style={{ background: 'var(--primary)' }}>Buat Rencana</button>
      </div>

      {plan && (
        <div className="mt-4 space-y-3">
          <div className="p-3 rounded-xl text-white" style={{ background: 'var(--primary)' }}>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div><p className="text-xl font-bold">{paceToDisplay(plan.cur)}</p><p className="text-[10px] opacity-80">Sekarang</p></div>
              <div><p className="text-xl font-bold">{paceToDisplay(plan.tar)}</p><p className="text-[10px] opacity-80">Target</p></div>
              <div><p className="text-xl font-bold">{plan.weeks}</p><p className="text-[10px] opacity-80">Minggu</p></div>
            </div>
          </div>

          <div className="p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Metode: Polarized (80/20)</h3>
            <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
              <div className="p-2 rounded-lg" style={{ background: 'var(--surface)' }}>
                <p className="text-base font-bold" style={{ color: '#22C55E' }}>80%</p>
                <p style={{ color: 'var(--text-secondary)' }}>Easy</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: 'var(--surface)' }}>
                <p className="text-base font-bold" style={{ color: 'var(--text-secondary)' }}>5%</p>
                <p style={{ color: 'var(--text-secondary)' }}>Tempo</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: 'var(--surface)' }}>
                <p className="text-base font-bold" style={{ color: 'var(--primary)' }}>15%</p>
                <p style={{ color: 'var(--text-secondary)' }}>Hard</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--text)' }}>Contoh Minggu</h3>
            <div className="space-y-1.5">
              {plan.trainingPlan[0]?.days.map((day, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg text-xs"
                  style={{ background: day.type === 'Rest' ? 'var(--surface)' : 'var(--bg)' }}>
                  <span className="w-8 font-bold" style={{ color: 'var(--text-secondary)' }}>{day.day}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                    style={{ background: day.type === 'Rest' ? 'var(--border)' : day.zone?.includes('Z4') || day.zone?.includes('Z5') ? '#FEE2E2' : day.zone === 'Z3' ? '#FEF3C7' : '#D1FAE5',
                      color: day.type === 'Rest' ? 'var(--text-secondary)' : day.zone?.includes('Z4') || day.zone?.includes('Z5') ? '#991B1B' : day.zone === 'Z3' ? '#92400E' : '#065F46' }}>
                    {day.type}
                  </span>
                  <span className="flex-1 truncate" style={{ color: 'var(--text)' }}>{day.notes}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl" style={{ background: 'var(--bg)' }}>
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text)' }}>Tips</h3>
            <ul className="text-xs space-y-0.5" style={{ color: 'var(--text-secondary)' }}>
              <li>• 80% lari harus terasa MUDAH</li>
              <li>• Jangan skip rest day</li>
              <li>• Naikkan volume max 10%/minggu</li>
              <li>• Tidur 7-9 jam</li>
            </ul>
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}
