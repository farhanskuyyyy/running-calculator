import { useEffect, useRef, useState } from 'react';

const features = [
  { icon: '⏱️', title: 'Pace', desc: 'Hitung pace per km dari jarak dan waktu — tahu persis kecepatan rata-ratamu.' },
  { icon: '📏', title: 'Jarak', desc: 'Konversi jarak kilometer ke mil dan sebaliknya tanpa hitung manual.' },
  { icon: '🏃', title: 'Waktu', desc: 'Estimasi waktu tempuh dari pace dan jarak, jadi tahu kapan sampai di garis finish.' },
  { icon: '🏆', title: 'Race Prediction', desc: 'Prediksi finish time race 5K, 10K, hingga marathon dari pace terbaikmu.' },
  { icon: '💓', title: 'HR Zone', desc: 'Lima zona detak jantung untuk latihan yang lebih terarah dan efisien.' },
  { icon: '📋', title: 'Training Plan', desc: 'Simulasi plan latihan mingguan untuk menuju race-mu berikutnya.' },
];

const reasons = [
  { title: 'Gratis', desc: 'Semua fitur terbuka tanpa biaya, tanpa iklan yang menyela latihanmu.' },
  { title: 'Tanpa login', desc: 'Langsung pakai — tidak perlu daftar akun, tidak perlu verifikasi email.' },
  { title: 'Offline-friendly', desc: 'Ringan dan cepat, tetap bisa dipakai walau koneksi tidak stabil.' },
];

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`lp-reveal${shown ? ' lp-revealed' : ''}${className ? ` ${className}` : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function LandingPage({ onOpenApp }) {
  return (
    <div className="lp-page">
      {/* Hero */}
      <section className="lp-hero">
        <div className="max-w-lg mx-auto px-4">
          <Reveal>
            <p className="lp-eyebrow">Running Calculator</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="lp-headline text-3xl sm:text-4xl mt-3">
              Pace yang tepat untuk setiap kilometer.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Kalkulator lari lengkap — pace, jarak, waktu, prediksi race, zona detak jantung,
              sampai training plan. Ringan, akurat, langsung dipakai tanpa ribet.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button onClick={() => onOpenApp('pace')} className="lp-btn lp-btn-primary">
                Mulai Hitung Pace
              </button>
              <a href="#fitur" className="lp-btn lp-btn-ghost">
                Lihat Semua Fitur
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <p className="mt-5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
              6 kalkulator · 5 zona HR · gratis tanpa login
            </p>
          </Reveal>
        </div>
      </section>

      {/* Fitur */}
      <section id="fitur" className="lp-anchor py-12 sm:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <Reveal>
            <p className="lp-eyebrow">Fitur</p>
            <h3 className="lp-headline text-2xl mt-2 mb-8">
              Enam kalkulator dalam satu tempat.
            </h3>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <article className="lp-card h-full">
                  <span className="text-2xl block mb-3">{f.icon}</span>
                  <h4 className="font-heading font-semibold text-[15px] mb-1.5" style={{ color: 'var(--text)' }}>
                    {f.title}
                  </h4>
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {f.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa Running Calc */}
      <section className="py-12 sm:py-16 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-lg mx-auto px-4">
          <Reveal>
            <p className="lp-eyebrow">Kenapa Running Calc</p>
            <h3 className="lp-headline text-2xl mt-2 mb-8">
              Dibuat untuk pelari yang ingin cepat mulai.
            </h3>
          </Reveal>
          <div className="space-y-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className="lp-reason">
                  <span className="lp-reason-mark" aria-hidden="true">✓</span>
                  <div>
                    <h4 className="font-heading font-semibold text-[15px]" style={{ color: 'var(--text)' }}>
                      {r.title}
                    </h4>
                    <p className="text-[13px] leading-relaxed mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                      {r.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-4">
        <div className="max-w-lg mx-auto px-4">
          <Reveal>
            <div className="lp-cta-final">
              <h3 className="lp-headline text-2xl">Siap hitung pace-mu?</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Buka kalkulator dan mulai dari pace pertama hari ini.
              </p>
              <button onClick={() => onOpenApp('pace')} className="lp-btn lp-btn-primary mt-5">
                Mulai Hitung Pace
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
