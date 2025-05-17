export const TEAM_OPTIONS = [
  { value: "alpha", label: "Alpha" },
  { value: "bravo", label: "Bravo" },
  { value: "charlie", label: "Charlie" },
  { value: "delta", label: "Delta" },
  { value: "kattapa", label: "Kattapa" },
  { value: "infra", label: "Infra" },
  { value: "data-and-analytics", label: "Data and Analytics" },
  { value: "hr", label: "HR" },
  { value: "mobile-app", label: "Mobile App" },
  { value: "support-staff", label: "Support Staff" },
  { value: "other", label: "Other" },
] as const;

export const CATEGORY_OPTIONS = [
  { value: "great-teamwork", label: "Great Teamwork" },
  { value: "innovation-champion", label: "Innovation Champion" },
  { value: "amazing-support", label: "Amazing Support" },
  { value: "leadership-excellence", label: "Leadership Excellence" },
  { value: "efficiency-expert", label: "Efficiency Expert" },
  { value: "above-and-beyond", label: "Above and Beyond" },
  { value: "positive-attitude", label: "Positive Attitude" },
  { value: "well-done", label: "Well Done" },
  { value: "outstanding-achievement", label: "Outstanding Achievement" },
  { value: "magical-mindset", label: "Magical Mindset" },
] as const;

export const KUDOS_TEMPLATES = [
  {
    id: "basic",
    name: "Basic Template",
    description: "A simple and clean template",
    className: "bg-white border border-gray-200 rounded-lg shadow-sm",
  },
  {
    id: "colorful",
    name: "Colorful Template",
    description: "A vibrant and energetic template",
    className:
      "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-lg shadow-lg",
  },
  {
    id: "professional",
    name: "Professional Template",
    description: "A formal and elegant template",
    className:
      "bg-slate-900 text-white rounded-lg shadow-lg border border-slate-700",
  },
];
