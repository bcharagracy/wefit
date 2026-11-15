import { Link } from "react-router-dom";
import { FiTarget, FiActivity, FiBarChart2, FiSearch,FiArrowRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader.jsx";

const features = [
  { icon: FiTarget, title: "Personal plan", text: "Enter your height, weight and goal to get your BMI and workouts picked just for you.", link: "/tracker?show=plan" },
  { icon: FiActivity, title: "Workout log", text: "Save each workout with its duration, or add one from the library in a single click.", link: "/tracker?show=log" },
  { icon: FiBarChart2, title: "Progress & streaks", text: "See today's minutes against your goal, a chart of your last 7 days and your workout streak.", link: "/tracker?show=progress" },
  { icon: FiSearch, title: "Workout library", text: "Search and filter guided routines by category: Cardio, Strength, Yoga and HIIT.", link: "/workouts" },];

export default function Features() {
  return (
    <>
      <PageHeader title="Features" subtitle="Everything WeFit can do for you." />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
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