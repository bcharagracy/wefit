import { Link } from "react-router-dom";
import { FiArrowRight, FiActivity, FiTarget, FiBarChart2, FiCheck } from "react-icons/fi";
import WorkoutCard from "../components/WorkoutCard.jsx";
import workouts from "../data/workouts.js";
import "./Home.css";

const features = [
  { icon: FiTarget, title: "Personal plan", text: "Enter your height, weight and goal to get your BMI and workouts picked for you." },
  { icon: FiActivity, title: "Workout log", text: "Record every run, lift or yoga session in a few seconds." },
  { icon: FiBarChart2, title: "Progress", text: "Follow your daily goal, your weekly chart and your streak." },
];

const steps = [
  { title: "Get your plan", text: "Tell us your height, weight and goal to get your personal workouts." },
  { title: "Log your workouts", text: "Add each workout you finish to your tracker." },
  { title: "Track your progress", text: "Check your weekly chart and keep your streak going." },
];


const previewWeek = [40, 25, 0, 45, 30, 50, 35];
const previewDays = ["M", "T", "W", "T", "F", "S", "S"];

export default function Home() {
  return (
    <>
      
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <span className="badge">Fitness & wellness tracker</span>
            <h1>
              Build healthy habits, <span>one day at a time.</span>
            </h1>
            <p className="hero-text">
              WeFit gives you a workout plan that matches your goal, helps you log every session,
              and shows your progress so you stay motivated.
            </p>
            <div className="hero-actions">
              <Link to="/tracker" className="btn btn-primary">
                Get my plan <FiArrowRight />
              </Link>
              <Link to="/workouts" className="btn btn-outline">
                Browse workouts
              </Link>
            </div>
            <ul className="hero-points">
              <li><FiCheck /> Free to use</li>
              <li><FiCheck /> No account needed</li>
              <li><FiCheck /> Works on any device</li>
            </ul>
          </div>

         
          <div className="card hero-preview" aria-hidden="true">
            <div className="preview-top">
              <span className="muted">Today</span>
              <span className="preview-streak">🔥 5-day streak</span>
            </div>
            <p className="preview-value">
              45 <span>/ 45 min</span>
            </p>
            <div className="progress">
              <div className="progress-bar" style={{ width: "100%" }} />
            </div>

            <div className="preview-chart">
              {previewWeek.map((minutes, i) => (
                <div key={i} className="preview-col">
                  <div
                    className={i === previewWeek.length - 1 ? "preview-bar today" : "preview-bar"}
                    style={{ height: `${(minutes / 50) * 100}%` }}
                  />
                  <span>{previewDays[i]}</span>
                </div>
              ))}
            </div>

            <ul className="preview-list">
              <li>
                <span className="icon-box sm"><FiActivity /></span>
                <div><p>Morning Jog</p><span>Cardio</span></div>
                <strong>30 min</strong>
              </li>
              <li>
                <span className="icon-box sm"><FiActivity /></span>
                <div><p>Evening Stretch</p><span>Yoga</span></div>
                <strong>15 min</strong>
              </li>
            </ul>
          </div>
        </div>
      </section>

     
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Features</span>
            <h2>Everything you need in one place</h2>
            <p>Simple tools that fit into your daily routine.</p>
          </div>
          <div className="grid grid-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card card-hover feature-card">
                <span className="icon-box"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="section bg-white">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Start in three simple steps</h2>
          </div>
          <div className="grid grid-3 steps">
            {steps.map((step, i) => (
              <div key={step.title} className="step">
                <span className="step-number">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="section">
        <div className="container">
          <div className="section-row">
            <div>
              <span className="eyebrow">Workouts</span>
              <h2>Popular workouts</h2>
              <p className="muted">Guided routines to get you started.</p>
            </div>
            <Link to="/workouts" className="link-arrow">
              View all workouts <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-3">
            {workouts.slice(0, 3).map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        </div>
      </section>

   
      <section className="cta-section">
        <div className="container">
          <div className="cta">
            <h2>Ready to start?</h2>
            <p>It takes less than a minute to get your plan. Start your first workout today.</p>
            <Link to="/tracker" className="btn btn-white">
              Open my tracker <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}