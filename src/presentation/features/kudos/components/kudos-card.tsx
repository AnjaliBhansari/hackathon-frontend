import React from "react";
import Link from "next/link";
import { getUserInfo } from "@/utils/auth";

/**
 * Map category values to background color classes (tailwind or custom)
 */
const CATEGORY_BG_COLORS: Record<string, string> = {
  "Great Teamwork": "from-blue-300 to-blue-100",
  "Innovation Champion": "from-yellow-300 to-yellow-100",
  "Amazing Support": "from-sky-300 to-sky-100",
  "Leadership Excellence": "from-purple-300 to-purple-100",
  "Efficiency Expert": "from-green-300 to-green-100",
  "Above and Beyond": "from-pink-300 to-pink-100",
  "Positive Attitude": "from-teal-300 to-teal-100",
  "Well Done": "from-violet-300 to-violet-100",
  "Outstanding Achievement": "from-red-300 to-red-100",
  "Magical Mindset": "from-orange-300 to-orange-100",
};

/**
 * Map category values to SVG icons (inline SVGs)
 */
const CATEGORY_ICONS: Record<string, JSX.Element> = {
  "Great Teamwork": (
    // Teamwork (users)
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  "Innovation Champion": (
    // Award/Star
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15 8.5 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 9 8.5 12 2" />
    </svg>
  ),
  "Amazing Support": (
    // Lifebuoy
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <path d="M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M9.17 14.83l-4.24 4.24" />
    </svg>
  ),
  "Leadership Excellence": (
    // Crown
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 17l5-12 5 8 5-8 5 12" />
      <rect x="2" y="17" width="20" height="5" rx="2" />
    </svg>
  ),
  "Efficiency Expert": (
    // Clock
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  "Above and Beyond": (
    // Rocket
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5L3 21l4.5-1.5M15 9l6-6M9 15l-6 6m12-12l6-6M9 15l6-6" />
    </svg>
  ),
  "Positive Attitude": (
    // Smile
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  "Well Done": (
    // Trophy
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 21h8M12 17v4M17 5V3H7v2M17 5v2a5 5 0 0 1-10 0V5M17 5h2a2 2 0 0 1 2 2v1a5 5 0 0 1-5 5M7 5H5a2 2 0 0 0-2 2v1a5 5 0 0 0 5 5" />
    </svg>
  ),
  "Outstanding Achievement": (
    // Medal
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="7" />
      <path d="M8.21 13.89L7 21l5-3 5 3-1.21-7.11" />
    </svg>
  ),
  "Magical Mindset": (
    // Magic wand
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 4V2M15 22v-2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 15h2M20 15h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      <rect x="8" y="8" width="8" height="8" rx="4" />
    </svg>
  ),
};

/**
 * Map category values to text color classes (tailwind or custom)
 */
const CATEGORY_TEXT_COLORS: Record<string, string> = {
  "Great Teamwork": "#1d4ed8", // blue-700
  "Innovation Champion": "#b45309", // yellow-700
  "Amazing Support": "#0369a1", // sky-700
  "Leadership Excellence": "#6d28d9", // purple-700
  "Efficiency Expert": "#15803d", // green-700
  "Above and Beyond": "#be185d", // pink-700
  "Positive Attitude": "#0f766e", // teal-700
  "Well Done": "#6d28d9", // violet-700
  "Outstanding Achievement": "#b91c1c", // red-700
  "Magical Mindset": "#ea580c", // orange-600
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
  creator: any;
  date: string; // formatted date string
  categoryColor?: string; // optional color for category
  userId?: number;
  isRecipientClickable?: boolean; // new prop to control if recipient name is clickable
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
  creator,
  date,
  userId,
  categoryColor = "#7C3AED",
  isRecipientClickable = false, // default to false
}) => {
  const gradient = CATEGORY_BG_COLORS[category] || "from-gray-200 to-gray-50";
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div 
      id={`kudos-card-${userId || 'preview'}`}
      className="group relative rounded-xl shadow-lg overflow-hidden w-full max-w-sm bg-white border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-purple-100 hover:-translate-y-1"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 opacity-50" />
      
      {/* Animated floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div 
          className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          style={{
            backgroundColor: CATEGORY_TEXT_COLORS[categoryValue] || categoryColor,
          }}
        />
      </div>

      {/* Animated theme-colored dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pop"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: CATEGORY_TEXT_COLORS[categoryValue] || categoryColor,
              opacity: 0.15,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s',
              animationIterationCount: 'infinite',
            }}
          />
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:14px_24px] opacity-[0.02]" />

      {/* Shine effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Wavy colored top section with enhanced animation */}
      <div
        id={`kudos-card-header-${userId || 'preview'}`}
        className={`relative h-32 bg-gradient-to-br ${gradient} transition-all duration-300 overflow-hidden`}
      >
        {/* Animated dots pattern */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>

        {/* Wavy SVG with enhanced animation */}
        <svg
          className="absolute bottom-0 left-0 w-full transition-transform duration-300 group-hover:scale-105"
          viewBox="0 0 400 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0 20 Q100 40 200 20 T400 20 V40 H0 V20 Z" fill="white" />
        </svg>

        {/* Card header: Icon and category name with enhanced animation */}
        <div className="flex items-center gap-3 px-6 pt-8 pb-2 transition-all duration-300">
          <span 
            id={`kudos-card-icon-${userId || 'preview'}`} 
            className="flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-purple-200/50"
          >
            {CATEGORY_ICONS[categoryValue] || (
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            )}
          </span>
          <span
            id={`kudos-card-category-${userId || 'preview'}`}
            className="font-bold text-base transition-all duration-300 group-hover:scale-105 group-hover:shadow-sm"
            style={{
              color: CATEGORY_TEXT_COLORS[categoryValue] || categoryColor,
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Card content with enhanced animations */}
      <div id={`kudos-card-content-${userId || 'preview'}`} className="flex flex-col gap-4 p-6 relative">
        {/* Profile section with enhanced animation */}
        <div id={`kudos-card-profile-${userId || 'preview'}`} className="flex items-center gap-3 transition-all duration-300">
          <div 
            id={`kudos-card-avatar-${userId || 'preview'}`} 
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-lg font-bold text-purple-700 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-100 group-hover:rotate-3"
          >
            {recipientName.charAt(0).toUpperCase()}
          </div>
          <div className="transition-all duration-300">
            <div id={`kudos-card-recipient-${userId || 'preview'}`} className="font-medium text-gray-900 text-base leading-tight group-hover:text-purple-700">
              {isRecipientClickable ? (
                <Link
                  href={`/profile/${userId}`}
                  className="hover:underline text-purple-700 transition-colors duration-200"
                >
                  {recipientName}
                </Link>
              ) : (
                recipientName
              )}
            </div>
            <div id={`kudos-card-team-${userId || 'preview'}`} className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
              {teamName}
            </div>
          </div>
        </div>

        {/* Message with enhanced animation */}
        <div 
          id={`kudos-card-message-${userId || 'preview'}`} 
          className="text-sm text-gray-700 min-h-[80px] transition-all duration-300 group-hover:text-gray-800 bg-gray-50/50 p-4 rounded-lg group-hover:bg-gray-100/50 relative overflow-hidden backdrop-blur-sm"
        >
          {/* Decorative quote marks with animation */}
          <div className="absolute top-2 left-2 text-4xl text-purple-200/30 font-serif transition-transform duration-300 group-hover:scale-110">"</div>
          <div className="absolute bottom-2 right-2 text-4xl text-purple-200/30 font-serif transition-transform duration-300 group-hover:scale-110">"</div>
          <div className="relative z-10">{message}</div>
        </div>

        {/* Footer with enhanced animation */}
        <div 
          id={`kudos-card-footer-${userId || 'preview'}`} 
          className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100 transition-all duration-300 group-hover:border-purple-100"
        >
          <span 
            id={`kudos-card-creator-${userId || 'preview'}`} 
            className="transition-all duration-300 group-hover:text-gray-500 flex items-center gap-1"
          >
            <span className="text-purple-500 font-medium">From:</span> {creator.name}
          </span>
          <span 
            id={`kudos-card-date-${userId || 'preview'}`} 
            className="transition-all duration-300 group-hover:text-gray-500"
          >
            {formatDate(date)}
          </span>
        </div>
      </div>

      {/* Hover lift effect with enhanced shadow */}
      <div className="absolute inset-0 -z-10 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-purple-100/50" />
    </div>
  );
};
