import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiClock, FiTrendingUp, FiZap, FiPackage, FiCheckCircle, FiPlus } from "react-icons/fi";
import workouts from "../data/workouts.js";
import categoryStyles from "../data/categoryStyles.js";
import WorkoutCard from "../components/WorkoutCard.jsx";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { toDateKey } from "../data/helpers.js";
import "./WorkoutDetail.css";

export default function WorkoutDetail() {
  const { id } = useParams(); // read the :id from the URL
  const workout = workouts.find((w) => w.id === id);
  const [log, setLog] = useLocalStorage("wf-workouts", []);
  const [added, setAdded] = useState(false);

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

  const addToLog = () => {
    setLog([...log, { id: Date.now(), date: toDateKey(), name: workout.title, minutes: workout.duration }]);
    setAdded(true);
  };

  const stats = [
    { icon: FiClock, label: "Duration", value: `${workout.duration} min` },
    { icon: FiZap, label: "Calories", value: `~${workout.calories} kcal` },
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
              <button onClick={addToLog} className="btn btn-primary btn-block add-button">
                <FiPlus /> Add to today's log
              </button>
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