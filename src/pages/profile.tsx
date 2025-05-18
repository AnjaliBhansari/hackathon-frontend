import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { format } from "date-fns";
import { KudosCard } from "@/presentation/features/kudos/components/kudos-card";
import Layout from "@/components/ui/custom/Layout";
import { getUserInfo } from "@/utils/auth";
import Pagination from "@/components/ui/custom/Pagination";

interface Kudo {
  id: number;
  userId: number;
  createdByUserId: number;
  teamName: string;
  category: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  creatorName: string;
  creatorImageUrl: string | null;
}

interface ProfileData {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  };
  receivedKudos: Kudo[];
  createdKudos: Kudo[];
}

const ProfilePage: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("received");
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [receivedPage, setReceivedPage] = useState(1);
  const [givenPage, setGivenPage] = useState(1);
  const kudosPerPage = 6;

  // Auth check effect
  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      router.replace("/login");
    } else {
      setUser(userInfo);
    }
  }, [router]);

  // Fetch profile data effect
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/profile`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Reset pagination when profile data changes
  useEffect(() => {
    if (profileData) {
      setReceivedPage(1);
      setGivenPage(1);
    }
  }, [profileData]);

  if (!user) return null; // Prevent rendering until auth check

  if (loading) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">No profile data available</p>
        </div>
      </Layout>
    );
  }

  // Pagination logic
  const receivedTotalPages = Math.max(
    1,
    Math.ceil((profileData.receivedKudos?.length || 0) / kudosPerPage)
  );
  const givenTotalPages = Math.max(
    1,
    Math.ceil((profileData.createdKudos?.length || 0) / kudosPerPage)
  );
  const paginatedReceived = (profileData.receivedKudos || []).slice(
    (receivedPage - 1) * kudosPerPage,
    receivedPage * kudosPerPage
  );
  const paginatedGiven = (profileData.createdKudos || []).slice(
    (givenPage - 1) * kudosPerPage,
    givenPage * kudosPerPage
  );

  const formatKudoForCard = (kudo: Kudo) => ({
    category: kudo.category,
    categoryValue: kudo.category.toLowerCase().replace(/\s+/g, "-"),
    recipientName: profileData.user.name,
    teamName: kudo.teamName,
    message: kudo.message,
    creator: {
      id: kudo.createdByUserId,
      name: kudo.creatorName,
      imageUrl: kudo.creatorImageUrl || "",
    },
    date: format(new Date(kudo.createdAt), "MMM d, yyyy"),
  });

  return (
    <Layout user={user}>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto py-10 px-4">
          {/* Profile Header with enhanced design */}
          <div className="relative bg-white rounded-2xl shadow-lg p-8 mb-8 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            {/* Profile content */}
            <div className="relative flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center transform transition-all duration-300 hover:scale-105 hover:rotate-3">
                  <span className="text-3xl font-bold text-white">
                    {profileData.user.name.charAt(0)}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {profileData.user.name}
                </h1>
                <p className="text-gray-600 mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {profileData.user.email}
                </p>
                <div className="flex items-center space-x-3">
                  <span className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    {profileData.user.role}
                  </span>
                  <span className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Member since{" "}
                    {new Date(
                      profileData.user.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Kudos Tabs with enhanced design */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <Tabs
              defaultValue="received"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="mb-8 bg-gray-100 p-1.5 rounded-2xl flex relative h-16">
                <TabsTrigger
                  value="received"
                  className="relative z-10 flex-1 h-full rounded-xl text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-700 data-[state=active]:font-semibold"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span>Received Kudos</span>
                    <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-sm">
                      {profileData.receivedKudos?.length || 0}
                    </span>
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="given"
                  className="relative z-10 flex-1 h-full rounded-xl text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-700 data-[state=active]:font-semibold"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>Given Kudos</span>
                    <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-sm">
                      {profileData.createdKudos?.length || 0}
                    </span>
                  </span>
                </TabsTrigger>
                {/* Decorative bar for thickness */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-12 bg-gray-100 rounded-2xl z-0" />
              </TabsList>

              <TabsContent value="received" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                  {paginatedReceived.map((kudo) => (
                    <KudosCard key={kudo.id} {...formatKudoForCard(kudo)} />
                  ))}
                </div>
                <div className="mt-8">
                  <Pagination
                    currentPage={receivedPage}
                    totalPages={receivedTotalPages}
                    onPageChange={setReceivedPage}
                  />
                </div>
              </TabsContent>

              <TabsContent value="given" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                  {paginatedGiven.map((kudo) => (
                    <KudosCard key={kudo.id} {...formatKudoForCard(kudo)} />
                  ))}
                </div>
                <div className="mt-8">
                  <Pagination
                    currentPage={givenPage}
                    totalPages={givenTotalPages}
                    onPageChange={setGivenPage}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProfilePage;
