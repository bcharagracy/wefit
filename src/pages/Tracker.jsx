import { Link, useSearchParams } from "react-router-dom";
import { FiActivity, FiTrash2, FiArrowLeft } from "react-icons/fi";
import PageHeader from "../components/PageHeader.jsx";
import PlanSection from "../components/PlanSection.jsx";
import LogForm from "../components/LogForm.jsx";
import WeeklyChart from "../components/WeeklyChart.jsx";
import useMemoryState from "../hooks/useMemoryState.js";
import { toDateKey, lastSevenDays, total, countStreak, estimateCalories } from "../data/helpers.js";
import { goals } from "../data/plan.js";
import "./Tracker.css";

const DEFAULT_GOAL = 30; // minutes per day, used until the user creates a plan

// ?show=... (used by the Features page) displays only one card
const VIEWS = {
  plan: "Personal plan",
  log: "Workout log",
  progress: "Your progress",
};

export default function Tracker() {
  const [searchParams] = useSearchParams();
  const show = VIEWS[searchParams.get("show")] ? searchParams.get("show") : null;

  // Kept in memory only: resets when the page is refreshed
  const [log, setLog] = useMemoryState("wf-workouts", []);
  const [profile, setProfile] = useMemoryState("wf-profile", null);

  const today = toDateKey();
  const dailyGoal = profile ? (profile.dailyMinutes ?? goals[profile.goal].dailyMinutes) : DEFAULT_GOAL;

  const weight = profile ? profile.weight : 70; // used for calories

  const todayWorkouts = log.filter((w) => w.date === today);
  const caloriesToday = todayWorkouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  const minutesOn = (date) => total(log.filter((w) => w.date === date), "minutes");
  const minutesToday = minutesOn(today);
  const goalPercent = Math.min(100, (minutesToday / dailyGoal) * 100);

  // Minutes for each of the last 7 days (for the chart)
  const week = lastSevenDays().map((d) => ({
    label: d.toLocaleDateString("en-US", { weekday: "short" }),
    minutes: minutesOn(toDateKey(d)),
  }));
  const weekTotal = total(week, "minutes");
  const activeDays = week.filter((d) => d.minutes > 0).length;
  const streak = countStreak(log);

  const addWorkout = (workout) => setLog([...log, { ...workout, id: Date.now(), date: today }]);
  const removeWorkout = (id) => setLog(log.filter((w) => w.id !== id));

  // Fills the last week with example workouts — handy for screenshots and demos
  const loadSample = () => {
    const names = ["Morning Jog", "Full Body Strength", "Sunrise Yoga Flow", "Core Crusher"];
    setLog(
      lastSevenDays().map((d, i) => {
        const minutes = 20 + ((i * 13) % 35);
        return {
          id: Date.now() + i,
          date: toDateKey(d),
          name: names[i % names.length],
          minutes,
          calories: estimateCalories(5, weight, minutes), // moderate intensity
        };
      })
    );
  };

  // ----- Cards -----
  const planCard = <PlanSection profile={profile} setProfile={setProfile} />;
  const logCard = <LogForm onAdd={addWorkout} weight={weight} />;
  const progressCard = (
    <div className="card">
      <div className="card-head">
        <h2>Your progress</h2>
        <button onClick={loadSample} className="link-arrow">Load sample data</button>
      </div>

      <div className="goal">
        <div className="goal-labels">
          <span>Today</span>
          <span>{minutesToday} / {dailyGoal} min</span>
        </div>
        <div className="progress">
          <div className="progress-bar" style={{ width: `${goalPercent}%` }} />
        </div>
      </div>

      <div className="stats-grid">
        <Stat value={`🔥 ${streak}`} label="day streak" />
        <Stat value={weekTotal} label="min this week" />
        <Stat value={`${activeDays}/7`} label="active days" />
        <Stat value={caloriesToday} label="kcal today" />
      </div>

      <WeeklyChart days={week} goal={dailyGoal} />
    </div>
  );

  const todayCard = (
    <div className="card">
      <h2 className="list-title">Today's workouts</h2>
      {todayWorkouts.length === 0 ? (
        <p className="empty-box">No workouts logged yet today. Add one above or pick one from your plan!</p>
      ) : (
        <ul className="today-list">
          {todayWorkouts.map((w) => (
            <li key={w.id}>
              <span className="icon-box sm"><FiActivity /></span>
              <p className="today-name">{w.name}</p>
              <span className="today-value">
                {w.minutes} min{w.calories ? ` · ${w.calories} kcal` : ""}
              </span>
              <button className="icon-button" onClick={() => removeWorkout(w.id)} aria-label={`Delete ${w.name}`}>
                <FiTrash2 />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const header = (
    <PageHeader
      title={show ? VIEWS[show] : "My Tracker"}
      subtitle={new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
    />
  );

  // ----- Single card view (from the Features page) -----
  if (show) {
    return (
      <>
        {header}
        <section className="container tracker tracker-single">
          {show === "plan" && planCard}
          {show === "log" && <>{logCard}{todayCard}</>}
          {show === "progress" && progressCard}
          <Link to="/tracker" className="link-arrow">
            <FiArrowLeft /> Open the full tracker
          </Link>
        </section>
      </>
    );
  }

  // ----- Full tracker -----
  return (
    <>
      {header}
      <section className="container tracker">
        {planCard}
        <div className="tracker-row">
          {logCard}
          {progressCard}
        </div>
        {todayCard}
      </section>
    </>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat-box">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}