export default function CalculatorCard({ title, icon, children }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <h2 className="text-base font-semibold font-heading" style={{ color: 'var(--text)' }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
