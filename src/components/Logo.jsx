import { useId } from "react";
import { Link } from "react-router-dom";
import "./Logo.css";

// Original WeFit logo: a "W" drawn like a heartbeat line
export default function Logo() {
  const gradientId = useId(); // unique id, because the logo appears twice (navbar + footer)

  return (
    <Link to="/" className="logo" aria-label="WeFit home">
      <svg viewBox="0 0 32 32" className="logo-mark" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#26a5ad" />
            <stop offset="1" stopColor="#5bb8dc" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
        <path
          d="M6.5 10 L11 22 L16 13.5 L21 22 L25.5 10"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>
        We<span className="logo-accent">Fit</span>
      </span>
    </Link>
  );
}