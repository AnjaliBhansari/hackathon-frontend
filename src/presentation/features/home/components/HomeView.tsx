import React from 'react';
import { KudosCard } from '@/presentation/shared/KudosCard';

// New category values and labels
const CATEGORY_OPTIONS = [
  { value: 'great-teamwork', label: 'Great Teamwork', color: '#2563EB' },
  { value: 'innovation-champion', label: 'Innovation Champion', color: '#F59E42' },
  { value: 'amazing-support', label: 'Amazing Support', color: '#38BDF8' },
  { value: 'leadership-excellence', label: 'Leadership Excellence', color: '#7C3AED' },
  { value: 'efficiency-expert', label: 'Efficiency Expert', color: '#10B981' },
  { value: 'above-and-beyond', label: 'Above and Beyond', color: '#F472B6' },
  { value: 'positive-attitude', label: 'Positive Attitude', color: '#14B8A6' },
  { value: 'well-done', label: 'Well Done', color: '#7C3AED' },
  { value: 'outstanding-achievement', label: 'Outstanding Achievement', color: '#EF4444' },
  { value: 'magical-mindset', label: 'Magical Mindset', color: '#FB923C' },
];

// Dummy data for temporary display
const dummyKudos = [
  {
    category: CATEGORY_OPTIONS[7].label,
    categoryValue: CATEGORY_OPTIONS[7].value,
    categoryColor: CATEGORY_OPTIONS[7].color,
    recipientName: 'Sarah Chen',
    teamName: 'Marketing Team',
    message: 'Outstanding work on the Q1 campaign! Your creative direction and attention to detail made all the difference. Thank you for your dedication!',
    senderName: 'Michael Thompson',
    date: 'Mar 15, 2025',
  },
  {
    category: CATEGORY_OPTIONS[0].label,
    categoryValue: CATEGORY_OPTIONS[0].value,
    categoryColor: CATEGORY_OPTIONS[0].color,
    recipientName: 'David Kumar',
    teamName: 'Engineering Team',
    message: 'Incredible job debugging the production issue! Your quick thinking and problem-solving skills saved us hours of downtime. You\'re a true asset to the team!',
    senderName: 'Emily Rodriguez',
    date: 'Mar 14, 2025',
  },
  {
    category: CATEGORY_OPTIONS[2].label,
    categoryValue: CATEGORY_OPTIONS[2].value,
    categoryColor: CATEGORY_OPTIONS[2].color,
    recipientName: 'Kevin Smith',
    teamName: 'Support Team',
    message: 'Thank you for going above and beyond in helping our enterprise clients. Your dedication to customer success is truly remarkable!',
    senderName: 'Sarah Johnson',
    date: 'Mar 10, 2025',
  },
  {
    category: CATEGORY_OPTIONS[8].label,
    categoryValue: CATEGORY_OPTIONS[8].value,
    categoryColor: CATEGORY_OPTIONS[8].color,
    recipientName: 'Rachel Green',
    teamName: 'Product Team',
    message: 'Your leadership in the product launch was exceptional! The way you handled the challenges and kept the team motivated was truly inspiring.',
    senderName: 'Alex Martinez',
    date: 'Mar 12, 2025',
  },
  {
    category: CATEGORY_OPTIONS[1].label,
    categoryValue: CATEGORY_OPTIONS[1].value,
    categoryColor: CATEGORY_OPTIONS[1].color,
    recipientName: 'Tom Anderson',
    teamName: 'Innovation Team',
    message: 'Your innovative solution to our customer onboarding process is game-changing! This will significantly improve our user experience.',
    senderName: 'Chris Wong',
    date: 'Mar 11, 2025',
  },
  {
    category: CATEGORY_OPTIONS[3].label,
    categoryValue: CATEGORY_OPTIONS[3].value,
    categoryColor: CATEGORY_OPTIONS[3].color,
    recipientName: 'Lisa Park',
    teamName: 'Sales Team',
    message: 'Phenomenal work closing the enterprise deal! Your persistence and relationship-building skills are truly impressive. Congratulations on this huge win!',
    senderName: 'James Wilson',
    date: 'Mar 13, 2025',
  },
];

/**
 * HomeView component that represents the main view of the home page.
 * Displays a grid of KudosCard components with dummy data.
 */
export const HomeView: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Kudos Wall</h1>
          <p className="text-gray-500">Celebrate your teammates' achievements and contributions!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {dummyKudos.map((kudos, idx) => (
            <KudosCard key={idx} {...kudos} />
          ))}
        </div>
      </div>
    </main>
  );
}; 