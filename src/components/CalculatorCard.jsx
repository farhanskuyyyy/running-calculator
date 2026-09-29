export default function CalculatorCard({ title, icon, children }) {
  return (
    <div 
      className="rounded-xl p-6 border"
      style={{ 
        background: 'var(--surface)', 
        borderColor: 'var(--border)' 
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{icon}</span>
        <h2 className="text-lg font-semibold" style={{ color: 'var(--text)' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
