import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import "./LogForm.css";

const emptyForm = { name: "", minutes: "" };

// Form to log a workout for today
export default function LogForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError("Please enter a workout name.");
    if (!(Number(form.minutes) > 0)) return setError("Please enter the minutes (more than 0).");

    onAdd({ name: form.name.trim(), minutes: Number(form.minutes) });
    setForm(emptyForm);
    setError("");
  };

  return (
    <form className="card log-form" onSubmit={handleSubmit} noValidate>
      <h2>Log a workout</h2>

      <div className="form-group">
        <label className="label" htmlFor="workout-name">Workout name</label>
        <input id="workout-name" className="input" placeholder="e.g. Evening walk"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="label" htmlFor="workout-minutes">Minutes</label>
        <input id="workout-minutes" type="number" min="1" className="input" placeholder="30"
          value={form.minutes} onChange={(e) => setForm({ ...form, minutes: e.target.value })} />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="btn btn-primary btn-block">
        <FiPlus /> Add workout
      </button>
    </form>
  );
}