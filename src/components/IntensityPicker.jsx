import { intensities } from "../data/helpers.js";
import "./IntensityPicker.css";

// Three buttons: Light / Moderate / Intense
export default function IntensityPicker({ value, onChange }) {
  return (
    <div className="form-group">
      <p className="label">Intensity</p>
      <div className="intensity-options">
        {Object.entries(intensities).map(([key, level]) => (
          <button
            type="button"
            key={key}
            onClick={() => onChange(key)}
            className={value === key ? "intensity-option active" : "intensity-option"}
          >
            {level.label}
          </button>
        ))}
      </div>
    </div>
  );
}
