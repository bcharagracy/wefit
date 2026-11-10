import { Link } from "react-router-dom";
import { FiGithub, FiMail, FiInstagram } from "react-icons/fi";
import Logo from "./Logo.jsx";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-text">
            Your personal fitness companion. Get a plan, log your workouts and track your
            progress.
          </p>
        </div>

        <div>
          <h4>Quick links</h4>
          <ul className="footer-links">
            <li><Link to="/workouts">Workouts</Link></li>
            <li><Link to="/tracker">My Tracker</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Follow us</h4>
          <div className="footer-social">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FiGithub /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram /></a>
            <a href="mailto:hello@wefit.com" aria-label="Email"><FiMail /></a>
          </div>
        </div>
      </div>

      <p className="footer-bottom">© {new Date().getFullYear()} WeFit — CSCI426 Project</p>
    </footer>
  );
}