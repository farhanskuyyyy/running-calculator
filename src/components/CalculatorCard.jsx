export default function CalculatorCard({ title, icon, children }) {
  return (
    <div 
      className="rounded-xl p-4 md:p-6 border"
      style={{ 
        background: 'var(--surface)', 
        borderColor: 'var(--border)' 
      }}
    >
      <div className="flex items-center gap-2 mb-3 md:mb-4">
        <span className="text-lg md:text-xl">{icon}</span>
        <h2 className="text-base md:text-lg font-semibold" style={{ color: 'var(--text)' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
