import { Link } from "react-router-dom";
import { FiClock, FiTrendingUp } from "react-icons/fi";
import categoryStyles from "../data/categoryStyles.js";
import "./WorkoutCard.css";

export default function WorkoutCard({ workout }) {
  const style = categoryStyles[workout.category];
  const Icon = style.icon;

  return (
    <Link to={`/workouts/${workout.id}`} className={`workout-card ${style.className}`}>
      <div className="workout-card-banner cat-banner">
        <Icon className="workout-card-icon" />
      </div>

      <div className="workout-card-body">
        <span className="badge cat-badge">{workout.category}</span>
        <h3>{workout.title}</h3>
        <p className="workout-card-text">{workout.description}</p>
        <div className="workout-meta">
          <span><FiClock /> {workout.duration} min</span>
          <span><FiTrendingUp /> {workout.level}</span>
        </div>
      </div>
    </Link>
  );
}