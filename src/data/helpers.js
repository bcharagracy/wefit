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