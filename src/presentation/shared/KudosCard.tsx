import React from 'react';

/**
 * Map category values to gradient background classes (Tailwind)
 */
const CATEGORY_BG_GRADIENTS: Record<string, string> = {
  'great-teamwork': 'bg-gradient-to-br from-blue-100 via-blue-50 to-white',
  'innovation-champion': 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-white',
  'amazing-support': 'bg-gradient-to-br from-sky-100 via-sky-50 to-white',
  'leadership-excellence': 'bg-gradient-to-br from-purple-100 via-purple-50 to-white',
  'efficiency-expert': 'bg-gradient-to-br from-green-100 via-green-50 to-white',
  'above-and-beyond': 'bg-gradient-to-br from-pink-100 via-pink-50 to-white',
  'positive-attitude': 'bg-gradient-to-br from-teal-100 via-teal-50 to-white',
  'well-done': 'bg-gradient-to-br from-violet-100 via-violet-50 to-white',
  'outstanding-achievement': 'bg-gradient-to-br from-red-100 via-red-50 to-white',
  'magical-mindset': 'bg-gradient-to-br from-orange-100 via-orange-50 to-white',
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
  const bgGradient = CATEGORY_BG_GRADIENTS[categoryValue] || 'bg-gradient-to-br from-gray-50 via-white to-white';
  return (
    <div className={`${bgGradient} rounded-xl shadow-md p-6 flex flex-col gap-3 min-w-[260px] max-w-xs border border-gray-100 relative`}>
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