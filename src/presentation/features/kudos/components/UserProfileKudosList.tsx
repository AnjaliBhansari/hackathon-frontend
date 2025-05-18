import React from "react";
import { useUserKudos } from "@/hooks/useUserKudos";
import { KudosCard } from "@/presentation/features/kudos/components/kudos-card";
import Layout from "@/components/ui/custom/Layout";
import { getUserInfo } from "@/utils/auth";

interface UserProfileKudosListProps {
  userId: string;
}

const UserProfileKudosList: React.FC<UserProfileKudosListProps> = ({
  userId,
}) => {
  const { kudos, userName, loading, error } = useUserKudos(userId);
  const user = getUserInfo();

  // Map the category to its corresponding value
  const categoryMapping: Record<string, string> = {
    "Great Teamwork": "Great Teamwork",
    "Innovation Champion": "Innovation Champion",
    "Amazing Support": "Amazing Support",
    "Leadership Excellence": "Leadership Excellence",
    "Efficiency Expert": "Efficiency Expert",
    "Above and Beyond": "Above and Beyond",
    "Positive Attitude": "Positive Attitude",
    "Well Done": "Well Done",
    "Outstanding Achievement": "Outstanding Achievement",
    "Magical Mindset": "Magical Mindset"
  };

  return (
    <Layout user={user}>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto py-10 px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {userName}'s Kudos
            </h1>
            <p className="text-gray-500">All kudos received by this user</p>
          </div>
          {loading ? (
            <div className="text-center py-10 text-lg text-gray-500">
              Loading kudos...
            </div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {kudos.length === 0 ? (
                <div className="col-span-full text-center text-gray-400">
                  No kudos found for this user.
                </div>
              ) : (
                kudos.map((k) => (
                  <div key={k.id} className="flex justify-center">
                    <KudosCard
                      category={k.category}
                      categoryValue={categoryMapping[k.category] || k.category}
                      recipientName={k.receiver.name}
                      teamName={k.teamName}
                      message={k.message}
                      creator={k.creator}
                      date={k.createdAt}
                    />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default UserProfileKudosList;
