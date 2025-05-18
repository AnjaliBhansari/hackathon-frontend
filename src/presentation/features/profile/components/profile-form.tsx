import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { format } from "date-fns";
import { KudosCard } from "@/presentation/features/kudos/components/kudos-card";
import Pagination from "@/components/ui/custom/Pagination";
import { GetProfileUseCase } from "@/application/use-cases/profile/get-profile";
import { ProfileRepositoryImpl } from "@/infrastructure/repositories/profile-repository-impl";

interface Kudo {
  id: number;
  userId: number;
  creatorName: string;
  creatorImageUrl: string | null;
  receiverName: string;
  receiverImageUrl: string | null;
  createdByUserId: number;
  teamName: string;
  category: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

interface ProfileData {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  receivedKudos: Kudo[];
  createdKudos: Kudo[];
}

export function ProfileForm() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("received");
  const [receivedPage, setReceivedPage] = useState(1);
  const [givenPage, setGivenPage] = useState(1);
  const kudosPerPage = 6;

  // Fetch profile data effect
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileRepository = new ProfileRepositoryImpl();
        const getProfileUseCase = new GetProfileUseCase(profileRepository);
        const data = await getProfileUseCase.execute();
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">Failed to load profile data</p>
      </div>
    );
  }

  // Pagination logic
  const receivedTotalPages = Math.max(
    1,
    Math.ceil(profileData.receivedKudos.length / kudosPerPage)
  );
  const givenTotalPages = Math.max(
    1,
    Math.ceil(profileData.createdKudos.length / kudosPerPage)
  );
  const paginatedReceived = profileData.receivedKudos.slice(
    (receivedPage - 1) * kudosPerPage,
    receivedPage * kudosPerPage
  );
  const paginatedGiven = profileData.createdKudos.slice(
    (givenPage - 1) * kudosPerPage,
    givenPage * kudosPerPage
  );

  const formatKudoForCard = (kudo: Kudo) => {
    // Safely parse and format the date
    let formattedDate = "Invalid Date";
    try {
      if (kudo.createdAt) {
        const date = new Date(kudo.createdAt);
        if (!isNaN(date.getTime())) {
          formattedDate = format(date, "MMM d, yyyy");
        }
      }
    } catch (error) {
      console.error("Error formatting date:", error);
    }

    return {
      category: kudo.category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      categoryValue: kudo.category,
      recipientName: kudo.receiverName,
      teamName: kudo.teamName,
      message: kudo.message,
      creator: {
        id: kudo.createdByUserId,
        name: kudo.creatorName,
        imageUrl: kudo.creatorImageUrl || "",
      },
      date: formattedDate,
    };
  };

  return (
    <>
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-purple-600">
              {profileData.user.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {profileData.user.name}
            </h1>
            <p className="text-gray-600 mb-2">{profileData.user.email}</p>
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {profileData.user.role}
            </span>
          </div>
        </div>
      </div>

      {/* Kudos Tabs */}
      <div className="rounded-lg shadow-sm p-6">
        <Tabs
          defaultValue="received"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6 bg-gray-200 p-1 rounded-full flex relative h-14">
            <TabsTrigger
              value="received"
              className="relative z-10 flex-1 h-full rounded-full text-lg font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-700 data-[state=active]:font-bold data-[state=active]:border-2 data-[state=active]:border-purple-400"
            >
              <span className="flex items-center space-x-2">
                <span>Received Kudos</span>
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-sm">
                  {profileData.receivedKudos.length}
                </span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="given"
              className="relative z-10 flex-1 h-full rounded-full text-lg font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-700 data-[state=active]:font-bold data-[state=active]:border-2 data-[state=active]:border-purple-400"
            >
              <span className="flex items-center space-x-2">
                <span>Given Kudos</span>
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-sm">
                  {profileData.createdKudos.length}
                </span>
              </span>
            </TabsTrigger>
            {/* Decorative bar for thickness */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-10 bg-gray-200 rounded-full z-0" />
          </TabsList>

          <TabsContent value="received">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {paginatedReceived.map((kudo) => (
                <KudosCard key={kudo.id} {...formatKudoForCard(kudo)} />
              ))}
            </div>
            <Pagination
              currentPage={receivedPage}
              totalPages={receivedTotalPages}
              onPageChange={setReceivedPage}
            />
          </TabsContent>

          <TabsContent value="given">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {paginatedGiven.map((kudo) => (
                <KudosCard key={kudo.id} {...formatKudoForCard(kudo)} />
              ))}
            </div>
            <Pagination
              currentPage={givenPage}
              totalPages={givenTotalPages}
              onPageChange={setGivenPage}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
