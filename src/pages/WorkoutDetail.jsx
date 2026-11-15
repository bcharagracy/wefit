import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiClock, FiTrendingUp, FiZap, FiPackage, FiCheckCircle, FiPlus } from "react-icons/fi";
import workouts from "../data/workouts.js";
import categoryStyles from "../data/categoryStyles.js";
import WorkoutCard from "../components/WorkoutCard.jsx";
import useMemoryState from "../hooks/useMemoryState.js";
import { toDateKey, estimateCalories } from "../data/helpers.js";
import "./WorkoutDetail.css";

export default function WorkoutDetail() {
  const { id } = useParams(); // read the :id from the URL
  const workout = workouts.find((w) => w.id === id);
  const [log, setLog] = useMemoryState("wf-workouts", []);
  // Remember WHICH workout was added, so the message doesn't carry over
  // when you open another workout from the "More workouts" list
  const [addedId, setAddedId] = useState(null);
  const added = addedId === id;
  // Minutes typed by the user for each workout (until they type, the usual time is shown)
  const [minutesById, setMinutesById] = useState({});
  // The plan's weight is used for calories (70 kg if there is no plan yet)
  const [profile] = useMemoryState("wf-profile", null);

  // Wrong id in the URL
  if (!workout) {
    return (
      <div className="not-found">
        <h1>Workout not found</h1>
        <p>The workout you are looking for doesn't exist.</p>
        <Link to="/workouts" className="btn btn-primary">Back to workouts</Link>
      </div>
    );
  }

  const style = categoryStyles[workout.category];
  const Icon = style.icon;
  const related = workouts.filter((w) => w.category === workout.category && w.id !== workout.id);

  const minutes = minutesById[id] ?? workout.duration;
  const validMinutes = Number(minutes) > 0 && Number(minutes) <= 300;
  const weight = profile ? profile.weight : 70;
  const calories = validMinutes ? estimateCalories(workout.met, weight, Number(minutes)) : 0;

  const addToLog = () => {
    setLog([...log, { id: Date.now(), date: toDateKey(), name: workout.title, minutes: Number(minutes) }]);
    setAddedId(id);
  };

  const stats = [
    { icon: FiClock, label: "Duration", value: `${workout.duration} min` },
    { icon: FiZap, label: profile ? "Calories (your weight)" : "Calories (70 kg)", value: `~${calories} kcal` },
    { icon: FiTrendingUp, label: "Level", value: workout.level },
    { icon: FiPackage, label: "Equipment", value: workout.equipment },
  ];

  return (
    <>
      <section className={`detail-hero cat-banner ${style.className}`}>
        <div className="container">
          <Link to="/workouts" className="back-link">
            <FiArrowLeft /> All workouts
          </Link>
          <div className="detail-title">
            <span className="detail-icon"><Icon /></span>
            <div>
              <p className="detail-category">{workout.category}</p>
              <h1>{workout.title}</h1>
            </div>
          </div>
          <p className="detail-description">{workout.description}</p>
        </div>
      </section>

      <section className="container grid grid-4 detail-stats">
        {stats.map(({ icon: StatIcon, label, value }) => (
          <div key={label} className="card detail-stat">
            <StatIcon />
            <div>
              <p className="detail-stat-label">{label}</p>
              <p className="detail-stat-value">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="container detail-body">
        <div className="card">
          <h2>How to do it</h2>
          <ol className="steps-list">
            {workout.steps.map((step, i) => (
              <li key={i}>
                <span className="step-dot">{i + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="detail-aside">
          <div className="card">
            <h2>Tips</h2>
            <ul className="tips-list">
              {workout.tips.map((tip) => (
                <li key={tip}>
                  <FiCheckCircle /> {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="card text-center">
            <p className="muted">Finished this workout?</p>
            {added ? (
              <p className="added-message">
                ✓ Added to today's log. <Link to="/tracker">View tracker</Link>
              </p>
            ) : (
              <>
                <div className="form-group log-minutes">
                  <label className="label" htmlFor="log-minutes">How many minutes did you do?</label>
                  <input
                    id="log-minutes"
                    type="number"
                    min="1"
                    max="300"
                    className={validMinutes ? "input" : "input invalid"}
                    value={minutes}
                    onChange={(e) => setMinutesById({ ...minutesById, [id]: e.target.value })}
                  />
                  {!validMinutes && <p className="error-text">Enter between 1 and 300 minutes.</p>}
                </div>
                <button onClick={addToLog} disabled={!validMinutes} className="btn btn-primary btn-block add-button">
                  <FiPlus /> Add to today's log
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container related">
          <h2>More {workout.category} workouts</h2>
          <div className="grid grid-3">
            {related.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}