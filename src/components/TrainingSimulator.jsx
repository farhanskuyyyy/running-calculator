import { useState } from 'react';
import { paceToDisplay, calculatePaceImprovement, estimateWeeks, generateTrainingPlan } from '../utils/runningCalculations';

export default function TrainingSimulator() {
  const [dist, setDist] = useState(5);
  const [curM, setCurM] = useState(37);
  const [curS, setCurS] = useState(30);
  const [tarM, setTarM] = useState(30);
  const [tarS, setTarS] = useState(0);
  const [plan, setPlan] = useState(null);

  const calc = () => {
    const cur = ((curM * 60) + curS) / dist;
    const tar = ((tarM * 60) + tarS) / dist;
    if (tar >= cur) return alert('Target harus lebih cepat!');
    const imp = calculatePaceImprovement(cur, tar);
    setPlan({ cur, tar, weeks: estimateWeeks(imp), improvement: imp, days: generateTrainingPlan(cur, tar, estimateWeeks(imp))[0]?.days || [] });
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-xl" style={{ background: 'var(--surface)' }}>
        <div className="flex gap-1.5 mb-3">
          {[5, 10, 21.1].map(d => (
            <button key={d} onClick={() => setDist(d)} className="flex-1 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: dist === d ? 'var(--primary)' : 'var(--bg)', color: dist === d ? '#fff' : 'var(--text-secondary)' }}>
              {d === 21.1 ? 'Half' : d + 'K'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] mb-1 block" style={{ color: 'var(--text-secondary)' }}>Sekarang (mm:ss)</label>
            <div className="flex gap-1 items-center">
              <input type="number" value={curM} onChange={e => setCurM(+e.target.value || 0)} className="flex-1 px-2 py-2 rounded-lg border text-center text-sm"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>:</span>
              <input type="number" value={curS} onChange={e => setCurS(+e.target.value || 0)} className="flex-1 px-2 py-2 rounded-lg border text-center text-sm"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            </div>
          </div>
          <div>
            <label className="text-[10px] mb-1 block" style={{ color: 'var(--text-secondary)' }}>Target (mm:ss)</label>
            <div className="flex gap-1 items-center">
              <input type="number" value={tarM} onChange={e => setTarM(+e.target.value || 0)} className="flex-1 px-2 py-2 rounded-lg border text-center text-sm"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>:</span>
              <input type="number" value={tarS} onChange={e => setTarS(+e.target.value || 0)} className="flex-1 px-2 py-2 rounded-lg border text-center text-sm"
                style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }} />
            </div>
          </div>
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-lg font-medium text-white text-sm active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Buat Rencana</button>
      {plan && (
        <div className="space-y-3">
          <div className="flex gap-3 p-3 rounded-xl text-white text-center" style={{ background: 'var(--primary)' }}>
            <div className="flex-1"><p className="text-lg font-bold">{paceToDisplay(plan.cur)}</p><p className="text-[10px] opacity-80">Sekarang</p></div>
            <div className="flex-1"><p className="text-lg font-bold">{paceToDisplay(plan.tar)}</p><p className="text-[10px] opacity-80">Target</p></div>
            <div className="flex-1"><p className="text-lg font-bold">{plan.weeks}</p><p className="text-[10px] opacity-80">Minggu</p></div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'var(--surface)' }}>
            <h3 className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>Polarized 80/20</h3>
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div className="p-1.5 rounded-lg" style={{ background: 'var(--bg)' }}><p className="text-sm font-bold" style={{ color: '#22C55E' }}>80%</p><p style={{ color: 'var(--text-secondary)' }}>Easy</p></div>
              <div className="p-1.5 rounded-lg" style={{ background: 'var(--bg)' }}><p className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>5%</p><p style={{ color: 'var(--text-secondary)' }}>Tempo</p></div>
              <div className="p-1.5 rounded-lg" style={{ background: 'var(--bg)' }}><p className="text-sm font-bold" style={{ color: 'var(--primary)' }}>15%</p><p style={{ color: 'var(--text-secondary)' }}>Hard</p></div>
            </div>
          </div>
          <div className="p-3 rounded-xl" style={{ background: 'var(--surface)' }}>
            <h3 className="text-xs font-semibold mb-2" style={{ color: 'var(--text)' }}>Contoh Minggu</h3>
            <div className="space-y-1">
              {plan.days.map((d, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 text-[11px]">
                  <span className="w-7 font-semibold" style={{ color: 'var(--text-secondary)' }}>{d.day}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                    style={{ background: d.type === 'Rest' ? 'var(--border)' : d.zone?.includes('Z4') ? '#FEE2E2' : d.zone === 'Z3' ? '#FEF3C7' : '#D1FAE5',
                      color: d.type === 'Rest' ? 'var(--text-secondary)' : d.zone?.includes('Z4') ? '#991B1B' : d.zone === 'Z3' ? '#92400E' : '#065F46' }}>
                    {d.type}
                  </span>
                  <span className="flex-1 truncate" style={{ color: 'var(--text)' }}>{d.notes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
