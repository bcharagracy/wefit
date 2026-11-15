import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import workouts from "../data/workouts.js";
import { estimateCalories, getMet, OTHER_MET } from "../data/helpers.js";
import IntensityPicker from "./IntensityPicker.jsx";
import "./LogForm.css";

const emptyForm = { workoutId: "", name: "", minutes: "", intensity: "moderate" };

// Form to log a workout for today. weight comes from the plan (70 kg if there is no plan).
export default function LogForm({ onAdd, weight }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  // A library workout uses its own MET; "Other" uses a general one
  const chosen = workouts.find((w) => w.id === form.workoutId);
  const isOther = form.workoutId === "other";
  const baseMet = chosen ? chosen.met : OTHER_MET;
  const minutes = Number(form.minutes);
  const calories = minutes > 0 ? estimateCalories(getMet(baseMet, form.intensity), weight, minutes) : 0;

  // Picking a library workout fills in its usual time (it can still be changed)
  const handleWorkoutChange = (e) => {
    const id = e.target.value;
    const workout = workouts.find((w) => w.id === id);
    setForm({ ...form, workoutId: id, minutes: workout ? String(workout.duration) : form.minutes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.workoutId) return setError("Please choose a workout.");
    if (isOther && !form.name.trim()) return setError("Please enter a workout name.");
    if (!(minutes > 0)) return setError("Please enter the minutes (more than 0).");

    onAdd({ name: chosen ? chosen.title : form.name.trim(), minutes, calories });
    setForm(emptyForm);
    setError("");
  };

  return (
    <form className="card log-form" onSubmit={handleSubmit} noValidate>
      <h2>Log a workout</h2>

      <div className="form-group">
        <label className="label" htmlFor="workout-choice">Workout</label>
        <select id="workout-choice" className="input" value={form.workoutId} onChange={handleWorkoutChange}>
          <option value="">Choose a workout...</option>
          {workouts.map((w) => (
            <option key={w.id} value={w.id}>{w.title}</option>
          ))}
          <option value="other">Other (type your own)</option>
        </select>
      </div>

      {isOther && (
        <div className="form-group">
          <label className="label" htmlFor="workout-name">Workout name</label>
          <input id="workout-name" className="input" placeholder="e.g. Evening walk"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
      )}

      <div className="form-group">
        <label className="label" htmlFor="workout-minutes">Minutes</label>
        <input id="workout-minutes" type="number" min="1" className="input" placeholder="30"
          value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} />
      </div>

      <IntensityPicker value={form.intensity} onChange={(intensity) => setForm({ ...form, intensity })} />

      {calories > 0 && <p className="log-calories">About {calories} kcal burned</p>}
      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="btn btn-primary btn-block">
        <FiPlus /> Add workout
      </button>
    </form>
  );
}
