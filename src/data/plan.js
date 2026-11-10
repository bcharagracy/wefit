import workouts from "./workouts.js";

export const goals = {
  lose: {
    label: "Lose weight",
    categories: ["Cardio", "HIIT"],
    dailyMinutes: 45,
    advice: "Focus on cardio and HIIT to burn more calories. Aim for 5 active days a week.",
  },
  muscle: {
    label: "Build muscle",
    categories: ["Strength", "HIIT"],
    dailyMinutes: 40,
    advice: "Train strength 3–4 times a week and give each muscle group a day to recover.",
  },
  fit: {
    label: "Stay fit",
    categories: ["Cardio", "Strength", "Yoga"],
    dailyMinutes: 30,
    advice: "Mix cardio, strength and yoga to stay healthy, flexible and full of energy.",
  },
};


export function calculateBMI(heightCm, weightKg) {
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}


export function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: "Underweight", className: "bmi-under" };
  if (bmi < 25) return { label: "Healthy weight", className: "bmi-healthy" };
  if (bmi < 30) return { label: "Overweight", className: "bmi-over" };
  return { label: "Obese", className: "bmi-obese" };
}


export function recommendWorkouts(goalKey, bmi, count = 3) {
  const goal = goals[goalKey];
  const avoidAdvanced = bmi >= 30 || bmi < 18.5;
  const suitable = workouts.filter((w) => !(avoidAdvanced && w.level === "Advanced"));

 
  const picked = [];
  for (let round = 0; picked.length < count && round < suitable.length; round++) {
    for (const category of goal.categories) {
      const options = suitable.filter((w) => w.category === category);
      if (options[round] && picked.length < count) picked.push(options[round]);
    }
  }
  return picked;
}