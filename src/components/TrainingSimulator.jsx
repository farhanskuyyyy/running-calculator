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
      <div>
        <label className="text-[11px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Jarak</label>
        <div className="grid grid-cols-3 gap-1.5">
          {[5, 10, 21.1].map(d => (
            <button key={d} onClick={() => setDist(d)} className="py-2.5 rounded-md text-sm font-medium"
              style={{ background: dist === d ? 'var(--primary)' : 'var(--surface)', color: dist === d ? '#fff' : 'var(--text-secondary)', border: `1px solid ${dist === d ? 'var(--primary)' : 'var(--border)'}` }}>
              {d === 21.1 ? 'Half' : d + 'K'}
            </button>
          ))}
        </div>
      </div>
      <div className="p-3 rounded-lg" style={{ background: 'var(--surface)' }}>
        <label className="text-[10px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Pace Saat Ini (mm:ss)</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input type="number" value={curM} onChange={e => setCurM(+e.target.value || 0)} placeholder="37"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Menit</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl font-medium" style={{ color: 'var(--text-tertiary)' }}>:</span>
          </div>
          <div>
            <input type="number" value={curS} onChange={e => setCurS(+e.target.value || 0)} placeholder="30"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Detik</span>
          </div>
        </div>
      </div>
      <div className="p-3 rounded-lg" style={{ background: 'var(--surface)' }}>
        <label className="text-[10px] font-medium mb-1.5 block uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>Pace Target (mm:ss)</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input type="number" value={tarM} onChange={e => setTarM(+e.target.value || 0)} placeholder="30"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Menit</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl font-medium" style={{ color: 'var(--text-tertiary)' }}>:</span>
          </div>
          <div>
            <input type="number" value={tarS} onChange={e => setTarS(+e.target.value || 0)} placeholder="0"
              className="w-full px-2 py-3 rounded-md border text-center text-lg font-medium" style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)', fontFamily: 'DM Sans' }} />
            <span className="block text-[10px] text-center mt-1 uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Detik</span>
          </div>
        </div>
      </div>
      <button onClick={calc} className="w-full py-3 rounded-md font-medium text-white active:scale-[0.98]"
        style={{ background: 'var(--primary)' }}>Buat Rencana</button>
      {plan && (
        <div className="space-y-3">
          <div className="flex gap-3 p-3 rounded-lg text-white text-center" style={{ background: 'var(--primary)' }}>
            <div className="flex-1"><p className="text-lg font-bold font-heading">{paceToDisplay(plan.cur)}</p><p className="text-[10px] opacity-80 uppercase tracking-wide">Sekarang</p></div>
            <div className="flex-1"><p className="text-lg font-bold font-heading">{paceToDisplay(plan.tar)}</p><p className="text-[10px] opacity-80 uppercase tracking-wide">Target</p></div>
            <div className="flex-1"><p className="text-lg font-bold font-heading">{plan.weeks}</p><p className="text-[10px] opacity-80 uppercase tracking-wide">Minggu</p></div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: 'var(--surface)' }}>
            <h3 className="text-xs font-semibold font-heading mb-2" style={{ color: 'var(--text)' }}>Metode: Polarized 80/20</h3>
            <div className="grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div className="p-2 rounded-md" style={{ background: 'var(--bg)' }}><p className="text-sm font-bold font-heading" style={{ color: '#22C55E' }}>80%</p><p className="uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Easy</p></div>
              <div className="p-2 rounded-md" style={{ background: 'var(--bg)' }}><p className="text-sm font-bold font-heading" style={{ color: 'var(--text-tertiary)' }}>5%</p><p className="uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Tempo</p></div>
              <div className="p-2 rounded-md" style={{ background: 'var(--bg)' }}><p className="text-sm font-bold font-heading" style={{ color: 'var(--primary)' }}>15%</p><p className="uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>Hard</p></div>
            </div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: 'var(--surface)' }}>
            <h3 className="text-xs font-semibold font-heading mb-2" style={{ color: 'var(--text)' }}>Contoh Minggu</h3>
            <div className="space-y-1">
              {plan.days.map((d, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 text-[11px]">
                  <span className="w-8 font-semibold" style={{ color: 'var(--text-secondary)' }}>{d.day}</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium"
                    style={{ background: d.type === 'Rest' ? 'var(--border)' : d.zone?.includes('Z4') ? '#FEE2E2' : d.zone === 'Z3' ? '#FEF3C7' : '#D1FAE5',
                      color: d.type === 'Rest' ? 'var(--text-tertiary)' : d.zone?.includes('Z4') ? '#991B1B' : d.zone === 'Z3' ? '#92400E' : '#065F46' }}>
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
