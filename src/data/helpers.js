export function toDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function lastSevenDays() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
}


export function total(list, field) {
  return list.reduce((sum, item) => sum + item[field], 0);
}

export function countStreak(entries) {
  const days = new Set(entries.map((e) => e.date));
  const d = new Date();
  if (!days.has(toDateKey(d))) d.setDate(d.getDate() - 1);
  let streak = 0;
  while (days.has(toDateKey(d))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

// Calories burned, using the MET formula:
// calories = MET x weight (kg) x hours
export function estimateCalories(met, weightKg, minutes) {
  return Math.round(met * weightKg * (minutes / 60));
}

// How hard the workout was. The factor changes the workout's MET:
// Light = 70%, Moderate = the workout as written, Intense = 130%
export const intensities = {
  light: { label: "Light", factor: 0.7 },
  moderate: { label: "Moderate", factor: 1 },
  intense: { label: "Intense", factor: 1.3 },
};

// Base MET for workouts typed by hand ("Other")
export const OTHER_MET = 5;

export function getMet(baseMet, intensity) {
  return baseMet * intensities[intensity].factor;
}
