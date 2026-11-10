import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import PageHeader from "../components/PageHeader.jsx";
import WorkoutCard from "../components/WorkoutCard.jsx";
import workouts, { categories } from "../data/workouts.js";
import "./Workouts.css";

export default function Workouts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Keep only the workouts that match the category and the search text
  const filtered = workouts.filter((w) => {
    const matchesCategory = category === "All" || w.category === category;
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <PageHeader title="Workout Library" subtitle="Find a routine that matches your mood and level." />

      <section className="container workouts-page">
        {/* Search + filters */}
        <div className="toolbar">
          <div className="search">
            <FiSearch />
            <input
              type="text"
              className="input"
              placeholder="Search workouts..."
              aria-label="Search workouts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="pill-group">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={category === c ? "pill active" : "pill"}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className="results-count">
          Showing {filtered.length} workout{filtered.length !== 1 && "s"}
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-3">
            {filtered.map((w) => (
              <WorkoutCard key={w.id} workout={w} />
            ))}
          </div>
        ) : (
          <div className="card text-center muted">
            No workouts match your search. Try another word or category.
          </div>
        )}
      </section>
    </>
  );
}