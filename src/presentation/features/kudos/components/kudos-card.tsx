import React from 'react';

/**
 * Map category values to background color classes (tailwind or custom)
 */
const CATEGORY_BG_COLORS: Record<string, string> = {
  'great-teamwork': 'bg-blue-50',
  'innovation-champion': 'bg-yellow-50',
  'amazing-support': 'bg-sky-50',
  'leadership-excellence': 'bg-purple-50',
  'efficiency-expert': 'bg-green-50',
  'above-and-beyond': 'bg-pink-50',
  'positive-attitude': 'bg-teal-50',
  'well-done': 'bg-violet-50',
  'outstanding-achievement': 'bg-red-50',
  'magical-mindset': 'bg-orange-50',
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
  const bgColor = CATEGORY_BG_COLORS[categoryValue] || 'bg-white';
  return (
    <div className={`${bgColor} rounded-xl shadow-md p-6 flex flex-col gap-3 min-w-[260px] max-w-xs border border-gray-100 relative`}>
      <div className="flex items-center gap-2 mb-2">
        {/* Category Icon Placeholder */}
        <div className="w-4 h-4" style={{ color: categoryColor }}>
          {/* TODO: Replace with Icon component as per project best practices */}
          <span className="inline-block align-middle">★</span>
        </div>
        <span className="font-semibold text-sm" style={{ color: categoryColor }}>{category}</span>
      </div>
      <div className="flex items-center gap-3 mb-1">
        {/* Avatar Placeholder */}
        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">
          {recipientName.charAt(0)}
        </div>
        <div>
          <div className="font-medium text-gray-900 text-base leading-tight">{recipientName}</div>
          <div className="text-xs text-gray-500">{teamName}</div>
        </div>
      </div>
      <div className="flex-1 text-sm text-gray-700 mb-2">
        {message}
      </div>
      <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
        <span>From: {senderName}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}; 