import { FiHeart, FiUsers, FiShield } from "react-icons/fi";
import PageHeader from "../components/PageHeader.jsx";
import workouts, { categories } from "../data/workouts.js";
import { goals } from "../data/plan.js";
import "./About.css";

const values = [
  { icon: FiHeart, title: "Health first", text: "Small daily habits lead to big long-term results." },
  { icon: FiUsers, title: "For everyone", text: "Beginner or athlete, the plan adapts to your level." },
  { icon: FiShield, title: "Your data, your device", text: "Your logs are stored only in your own browser." },
];

const stats = [
  { number: workouts.length, label: "Guided workouts" },
  { number: categories.length - 1, label: "Workout categories" }, 
  { number: Object.keys(goals).length, label: "Fitness goals" },
  { number: "100%", label: "Free to use" },
];


const team = [
  { initials: "GB", name: "Gracy", role: "Computer Science Student", text: "UI/UX design, React components, routing and local data storage." },
];

export default function About() {
  return (
    <>
      <PageHeader title="About WeFit" subtitle="Why we built a simple fitness and wellness tracker." />

      <section className="section">
        <div className="container about-intro">
          <div>
            <span className="eyebrow">Our mission</span>
            <h2>Fitness made simple</h2>
            <p>
              Many people want to get fit but don't know where to start, and most fitness apps feel
              complicated. WeFit keeps things simple: get a plan that matches your goal, log what you
              did today, and watch your progress grow.
            </p>
            <p>
              The project was built for the CSCI426 Advanced Web Programming course using ReactJS
              and plain CSS, with a focus on clean design and a smooth experience on both desktop
              and mobile.
            </p>
          </div>
          <div className="stat-grid">
            {stats.map((s) => (
              <div key={s.label} className="card text-center">
                <p className="stat-number">{s.number}</p>
                <p className="muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="section-head">
            <h2>What we believe in</h2>
          </div>
          <div className="grid grid-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="card text-center value-card">
                <span className="icon-box round"><Icon /></span>
                <h3>{title}</h3>
                <p className="muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Meet the team</h2>
          </div>
          <div className="team-list">
            {team.map((member) => (
              <div key={member.name} className="card team-card">
                <div className="avatar">{member.initials}</div>
                <div>
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="muted">{member.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}