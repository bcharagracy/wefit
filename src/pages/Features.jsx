import { Link } from "react-router-dom";
import { FiTarget, FiActivity, FiBarChart2, FiSearch, FiAward, FiSmartphone, FiArrowRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader.jsx";

const features = [
  { icon: FiTarget, title: "Personal plan", text: "Enter your height, weight and goal to get your BMI and workouts picked just for you.", link: "/tracker" },
  { icon: FiActivity, title: "Workout log", text: "Save each workout with its duration, or add one from the library in a single click.", link: "/tracker" },
  { icon: FiBarChart2, title: "Progress tracking", text: "See today's minutes against your goal and a chart of your last 7 days.", link: "/tracker" },
  { icon: FiAward, title: "Streaks", text: "Work out on back-to-back days and watch your streak grow.", link: "/tracker" },
  { icon: FiSearch, title: "Workout library", text: "Search and filter guided routines by category: Cardio, Strength, Yoga and HIIT.", link: "/workouts" },
  { icon: FiSmartphone, title: "Works everywhere", text: "A responsive design that looks great on your phone, tablet and laptop.", link: "/" },
];

export default function Features() {
  return (
    <>
      <PageHeader title="Features" subtitle="Everything WeFit can do for you." />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {features.map(({ icon: Icon, title, text, link }) => (
              <div key={title} className="card card-hover feature-card">
                <span className="icon-box"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link to={link} className="link-arrow">
                  Try it <FiArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}