import React from 'react';

/**
 * Map category values to background color classes (tailwind or custom)
 */
const CATEGORY_BG_COLORS: Record<string, string> = {
  'Great Teamwork': 'from-blue-300 to-blue-100',
  'Innovation Champion': 'from-yellow-300 to-yellow-100',
  'Amazing Support': 'from-sky-300 to-sky-100',
  'Leadership Excellence': 'from-purple-300 to-purple-100',
  'Efficiency Expert': 'from-green-300 to-green-100',
  'Above and Beyond': 'from-pink-300 to-pink-100',
  'Positive Attitude': 'from-teal-300 to-teal-100',
  'Well Done': 'from-violet-300 to-violet-100',
  'Outstanding Achievement': 'from-red-300 to-red-100',
  'Magical Mindset': 'from-orange-300 to-orange-100',
};

/**
 * Map category values to SVG icons (inline SVGs)
 */
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  'Great Teamwork': (
    // Teamwork (users)
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  'Innovation Champion': (
    // Award/Star
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" /></svg>
  ),
  'Amazing Support': (
    // Lifebuoy
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M9.17 14.83l-4.24 4.24" /></svg>
  ),
  'Leadership Excellence': (
    // Crown
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17l5-12 5 8 5-8 5 12" /><rect x="2" y="17" width="20" height="5" rx="2" /></svg>
  ),
  'Efficiency Expert': (
    // Clock
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
  ),
  'Above and Beyond': (
    // Rocket
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5L3 21l4.5-1.5M15 9l6-6M9 15l-6 6m12-12l6-6M9 15l6-6" /></svg>
  ),
  'Positive Attitude': (
    // Smile
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
  ),
  'Well Done': (
    // Trophy
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 21h8M12 17v4M17 5V3H7v2M17 5v2a5 5 0 0 1-10 0V5M17 5h2a2 2 0 0 1 2 2v1a5 5 0 0 1-5 5M7 5H5a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5" /></svg>
  ),
  'Outstanding Achievement': (
    // Medal
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><path d="M8.21 13.89L7 21l5-3 5 3-1.21-7.11" /></svg>
  ),
  'Magical Mindset': (
    // Magic wand
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4V2M15 22v-2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 15h2M20 15h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /><rect x="8" y="8" width="8" height="8" rx="4" /></svg>
  ),
};

/**
 * Map category values to text color classes (tailwind or custom)
 */
const CATEGORY_TEXT_COLORS: Record<string, string> = {
  'great teamwork': '#1d4ed8', // blue-700
  'innovation champion': '#b45309', // yellow-700
  'amazing support': '#0369a1', // sky-700
  'leadership excellence': '#6d28d9', // purple-700
  'efficiency expert': '#15803d', // green-700
  'above and beyond': '#be185d', // pink-700
  'positive attitude': '#0f766e', // teal-700
  'well done': '#6d28d9', // violet-700
  'outstanding achievement': '#b91c1c', // red-700
  'magical mindset': '#ea580c', // orange-600
};

/**
 * Props for the KudosCard component.
 */
export interface KudosCardProps {
  category: string; // e.g., "Well Done"
  categoryValue: string; // e.g., "well-done"
  recipientName: string;
  teamName: string;
  message: string;
  senderName: string;
  date: string; // formatted date string
  categoryColor?: string; // optional color for category
}

/**
 * KudosCard component displays a single kudos entry.
 * Follows atomic design and project best practices.
 */
export const KudosCard: React.FC<KudosCardProps> = ({
  category,
  categoryValue,
  recipientName,
  teamName,
  message,
  senderName,
  date,
  categoryColor = '#7C3AED', // default to purple
}) => {
  const gradient = CATEGORY_BG_COLORS[category] || 'from-gray-200 to-gray-50';

  return (
    <div className="rounded-2xl shadow-lg overflow-hidden max-w-xs min-w-[260px] bg-white border border-gray-100 flex flex-col">
      {/* Wavy colored top section */}
      <div className={`relative h-24 bg-gradient-to-b ${gradient}`}>
        {/* Wavy SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 400 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 20 Q100 40 200 20 T400 20 V40 H0 V20 Z"
            fill="white"
          />
        </svg>
        {/* Card header: Icon and category name */}
        <div className="flex items-center gap-2 px-6 pt-6 pb-2">
          <span className="flex-shrink-0">{CATEGORY_ICONS[categoryValue] || (
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /></svg>
          )}</span>
          <span className="font-semibold text-base" style={{ color: CATEGORY_TEXT_COLORS[categoryValue] || categoryColor }}>{category}</span>
        </div>
      </div>
      {/* Card content */}
      <div className="flex flex-col gap-2 px-6 py-2 flex-1">
        <div className="flex items-center gap-3 justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
            {recipientName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium text-gray-900 text-base leading-tight">{recipientName}</div>
            <div className="text-xs text-gray-500">{teamName}</div>
          </div>
        </div>
        <div className="flex-1 text-sm text-gray-700 text-center mt-2 mb-2">
          {message}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <span>From: {senderName}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}; 