import { useState } from "react";
import { Link } from "react-router-dom";
import { FiTarget, FiEdit2, FiChevronRight, FiClock } from "react-icons/fi";
import { goals, calculateBMI, bmiCategory, recommendWorkouts } from "../data/plan.js";
import categoryStyles from "../data/categoryStyles.js";
import "./PlanSection.css";

export default function PlanSection({ profile, setProfile }) {
  const [editing, setEditing] = useState(!profile);
  const [form, setForm] = useState(profile || { height: "", weight: "", goal: "fit" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const height = Number(form.height);
    const weight = Number(form.weight);
    if (height < 100 || height > 250) return setError("Please enter a height between 100 and 250 cm.");
    if (weight < 30 || weight > 300) return setError("Please enter a weight between 30 and 300 kg.");

    setProfile({ height, weight, goal: form.goal });
    setError("");
    setEditing(false);
  };

  // ----- Form view -----
  if (editing) {
    return (
      <form onSubmit={handleSubmit} className="card" noValidate>
        <div className="plan-head">
          <span className="icon-box"><FiTarget /></span>
          <div>
            <h2>Get your plan</h2>
            <p className="muted">Tell us about yourself and we'll pick workouts for you.</p>
          </div>
        </div>

        <div className="form-row plan-fields">
          <div className="form-group">
            <label className="label" htmlFor="height">Height (cm)</label>
            <input id="height" type="number" className="input" placeholder="170"
              value={form.height} onChange={(e) => setForm({ ...form, height: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="weight">Weight (kg)</label>
            <input id="weight" type="number" className="input" placeholder="70"
              value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
          </div>
        </div>

        <p className="label plan-goal-label">Your goal</p>
        <div className="goal-options">
          {Object.entries(goals).map(([key, goal]) => (
            <button
              type="button"
              key={key}
              onClick={() => setForm({ ...form, goal: key })}
              className={form.goal === key ? "goal-option active" : "goal-option"}
            >
              {goal.label}
            </button>
          ))}
        </div>

        {error && <p className="error-text plan-error">{error}</p>}

        <div className="plan-actions">
          <button type="submit" className="btn btn-primary">Get my plan</button>
          {profile && (
            <button type="button" onClick={() => setEditing(false)} className="btn btn-outline">
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  }

  // ----- Result view -----
  const bmi = calculateBMI(profile.height, profile.weight);
  const category = bmiCategory(bmi);
  const goal = goals[profile.goal];
  const plan = recommendWorkouts(profile.goal, bmi);

  return (
    <div className="card">
      <div className="plan-top">
        <div className="plan-head">
          <span className="icon-box"><FiTarget /></span>
          <div>
            <h2>Your plan: {goal.label}</h2>
            <p className="muted">{profile.height} cm · {profile.weight} kg</p>
          </div>
        </div>
        <button className="link-arrow" onClick={() => { setForm(profile); setEditing(true); }}>
          <FiEdit2 /> Edit
        </button>
      </div>

      <div className="plan-body">
        {/* BMI + advice */}
        <div className="bmi-box">
          <p className="muted">Your BMI</p>
          <p className="bmi-value">{bmi}</p>
          <span className={`badge ${category.className}`}>{category.label}</span>
          <p className="bmi-advice">{goal.advice}</p>
          <p className="bmi-goal">Daily goal: {goal.dailyMinutes} minutes</p>
        </div>

        {/* Recommended workouts */}
        <div>
          <p className="label">Recommended for you</p>
          <ul className="plan-list">
            {plan.map((w) => {
              const style = categoryStyles[w.category];
              const Icon = style.icon;
              return (
                <li key={w.id}>
                  <Link to={`/workouts/${w.id}`} className={`plan-item ${style.className}`}>
                    <span className="plan-item-icon cat-banner"><Icon /></span>
                    <div className="plan-item-info">
                      <p>{w.title}</p>
                      <span>{w.category} · <FiClock /> {w.duration} min · {w.level}</span>
                    </div>
                    <FiChevronRight className="plan-item-arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="plan-disclaimer">BMI is a general guide only and is not medical advice.</p>
    </div>
  );
}