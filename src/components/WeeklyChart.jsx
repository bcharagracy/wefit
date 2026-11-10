import "./WeeklyChart.css";

// Bar chart of exercise minutes for the last 7 days, with a dashed goal line
export default function WeeklyChart({ days, goal }) {
  const max = Math.max(goal, ...days.map((d) => d.minutes));

  return (
    <div className="chart">
      <p className="chart-title">Last 7 days</p>

      <div className="chart-area" role="img" aria-label="Minutes of exercise for each of the last 7 days">
        <div className="chart-goal" style={{ bottom: `${(goal / max) * 100}%` }}>
          <span>Goal {goal} min</span>
        </div>

        {days.map((day, i) => (
          <div key={i} className="chart-col">
            <div
              className={i === days.length - 1 ? "chart-bar today" : "chart-bar"}
              style={{ height: `${(day.minutes / max) * 100}%` }}
            >
              {day.minutes > 0 && <span className="chart-value">{day.minutes}</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="chart-days">
        {days.map((day, i) => (
          <span key={i} className={i === days.length - 1 ? "today" : ""}>
            {day.label}
          </span>
        ))}
      </div>
    </div>
  );
}