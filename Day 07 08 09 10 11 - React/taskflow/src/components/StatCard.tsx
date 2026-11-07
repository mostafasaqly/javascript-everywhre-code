
interface StatCardProps {
  label: string;
  value: number;
  hint?: string;
  tone?: "default" | "danger";
}
function StatCard({ label, value, hint, tone = "default" }: StatCardProps) {
  return (
    <div className={"stat-card stat-card-" + tone}>
      <span className="stat-label">
        {label}
      </span>
      <strong className="stat-value">
        {value}
      </strong>
      {hint && <span className="stat-hint">{hint}</span>}
    </div>
  );
}
export default StatCard;