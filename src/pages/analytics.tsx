import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Layout from "@/components/ui/custom/Layout";
import { useRouter } from "next/router";
import { getUserInfo } from "@/utils/auth";

type TimeFrame =
  | "currentWeek"
  | "currentMonth"
  | "currentQuarter"
  | "currentYear"
  | "allTime";

interface AnalyticsData {
  topPerformingMembers: {
    [key in TimeFrame]: Array<{
      id: number;
      name: string;
      imageUrl: string | null;
      kudosCount: number;
    }>;
  };
  topPerformingTeams: {
    [key in TimeFrame]: Array<{
      teamName: string;
      kudosCount: number;
    }>;
  };
  trendingCategories: {
    [key in TimeFrame]: Array<{
      category: string;
      kudosCount: number;
    }>;
  };
}

export default function AnalyticsPage() {
  const [membersTimeFrame, setMembersTimeFrame] =
    useState<TimeFrame>("currentWeek");
  const [teamsTimeFrame, setTeamsTimeFrame] =
    useState<TimeFrame>("currentWeek");
  const [categoriesTimeFrame, setCategoriesTimeFrame] =
    useState<TimeFrame>("currentWeek");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      router.replace("/login");
    } else {
      setUser(userInfo);
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/analytics`,
          {
            credentials: "include",
          }
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const timeFrameOptions = [
    { value: "currentWeek", label: "This Week" },
    { value: "currentMonth", label: "This Month" },
    { value: "currentQuarter", label: "This Quarter" },
    { value: "currentYear", label: "This Year" },
    { value: "allTime", label: "All Time" },
  ];

  const COLORS = {
    members: ["#8B5CF6", "#7C3AED", "#6D28D9", "#5B21B6", "#4C1D95"],
    teams: ["#10B981", "#059669", "#047857", "#065F46", "#064E3B"],
    categories: ["#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F"],
  };

  if (!user) return null;

  if (loading) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-lg text-gray-600">No data available</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto py-10 px-4 max-w-7xl">
          <div className="text-center mb-12 relative">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 relative">
              Analytics Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto relative">
              Track performance metrics and trends across your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-transparent">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Top Performing Members
                </CardTitle>
                <Select
                  value={membersTimeFrame}
                  onValueChange={(value: TimeFrame) =>
                    setMembersTimeFrame(value)
                  }
                >
                  <SelectTrigger className="w-[140px] bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFrameOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.topPerformingMembers[membersTimeFrame]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="kudosCount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-emerald-50 to-transparent">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Top Performing Teams
                </CardTitle>
                <Select
                  value={teamsTimeFrame}
                  onValueChange={(value: TimeFrame) => setTeamsTimeFrame(value)}
                >
                  <SelectTrigger className="w-[140px] bg-white/80 backdrop-blur-sm">
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeFrameOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.topPerformingTeams[teamsTimeFrame]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="teamName" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="kudosCount" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-transparent">
              <CardTitle className="text-xl font-semibold text-gray-900">
                Trending Categories
              </CardTitle>
              <Select
                value={categoriesTimeFrame}
                onValueChange={(value: TimeFrame) =>
                  setCategoriesTimeFrame(value)
                }
              >
                <SelectTrigger className="w-[140px] bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Select time frame" />
                </SelectTrigger>
                <SelectContent>
                  {timeFrameOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.trendingCategories[categoriesTimeFrame]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="kudosCount" fill="#ffc658" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </Layout>
  );
}
