import React from 'react';

/**
 * Map category values to background color classes (tailwind or custom)
 */
const CATEGORY_BG_COLORS: Record<string, string> = {
  'great-teamwork': 'from-blue-400 to-blue-200',
  'innovation-champion': 'from-yellow-400 to-yellow-200',
  'amazing-support': 'from-sky-400 to-sky-200',
  'leadership-excellence': 'from-purple-400 to-purple-200',
  'efficiency-expert': 'from-green-400 to-green-200',
  'above-and-beyond': 'from-pink-400 to-pink-200',
  'positive-attitude': 'from-teal-400 to-teal-200',
  'well-done': 'from-violet-400 to-violet-200',
  'outstanding-achievement': 'from-red-400 to-red-200',
  'magical-mindset': 'from-orange-400 to-orange-200',
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
  const gradient = CATEGORY_BG_COLORS[categoryValue] || 'from-gray-200 to-gray-50';

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
        {/* Icon */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-3xl" style={{ color: categoryColor }}>★</span>
        </div>
      </div>
      {/* Card content */}
      <div className="flex flex-col gap-2 px-6 py-4 flex-1">
        <span className="font-semibold text-sm text-center" style={{ color: categoryColor }}>{category}</span>
        <div className="flex items-center gap-3 justify-center">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
            {recipientName.charAt(0)}
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