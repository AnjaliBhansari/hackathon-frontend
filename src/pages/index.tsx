import React from "react";
import { KudosCard } from "@/presentation/features/kudos/components/kudos-card";

// Dummy data for temporary display
const dummyKudos = [
  {
    category: "Well Done",
    categoryValue: "well-done",
    recipientName: "Sarah Chen",
    teamName: "Marketing Team",
    message:
      "Outstanding work on the Q1 campaign! Your creative direction and attention to detail made all the difference. Thank you for your dedication!",
    senderName: "Michael Thompson",
    date: "Mar 15, 2025",
    categoryColor: "#7C3AED",
  },
  {
    category: "Great Teamwork",
    categoryValue: "great-teamwork",
    recipientName: "David Kumar",
    teamName: "Engineering Team",
    message:
      "Incredible job debugging the production issue! Your quick thinking and problem-solving skills saved us hours of downtime. You're a true asset to the team!",
    senderName: "Emily Rodriguez",
    date: "Mar 14, 2025",
    categoryColor: "#2563EB",
  },
  {
    category: "Proud of You",
    categoryValue: "proud-of-you",
    recipientName: "Lisa Park",
    teamName: "Sales Team",
    message:
      "Phenomenal work closing the enterprise deal! Your persistence and relationship-building skills are truly impressive. Congratulations on this huge win!",
    senderName: "James Wilson",
    date: "Mar 13, 2025",
    categoryColor: "#10B981",
  },
  {
    category: "Outstanding Achievement",
    categoryValue: "outstanding-achievement",
    recipientName: "Rachel Green",
    teamName: "Product Team",
    message:
      "Your leadership in the product launch was exceptional! The way you handled the challenges and kept the team motivated was truly inspiring.",
    senderName: "Alex Martinez",
    date: "Mar 12, 2025",
    categoryColor: "#EF4444",
  },
  {
    category: "Brilliant Idea",
    categoryValue: "brilliant-idea",
    recipientName: "Tom Anderson",
    teamName: "Innovation Team",
    message:
      "Your innovative solution to our customer onboarding process is game-changing! This will significantly improve our user experience.",
    senderName: "Chris Wong",
    date: "Mar 11, 2025",
    categoryColor: "#F59E42",
  },
  {
    category: "Amazing Support",
    categoryValue: "amazing-support",
    recipientName: "Kevin Smith",
    teamName: "Support Team",
    message:
      "Thank you for going above and beyond in helping our enterprise clients. Your dedication to customer success is truly remarkable!",
    senderName: "Sarah Johnson",
    date: "Mar 10, 2025",
    categoryColor: "#38BDF8",
  },
];

/**
 * Next.js index page that serves as the entry point for the home route.
 * This page uses the HomeView component from our presentation layer.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Kudos Wall
          </h1>
          <p className="text-gray-500">
            Celebrate your teammates' achievements and contributions!
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {dummyKudos.map((kudos, idx) => (
            <KudosCard key={idx} {...kudos} />
          ))}
        </div>
      </div>
    </main>
  );
}
