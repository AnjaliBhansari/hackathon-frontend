import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Layout from "@/components/ui/Layout";
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

  if (!user) return null; // Prevent rendering until auth check

  if (loading) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="text-lg">No data available</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout user={user}>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto py-10 px-4 max-w-7xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-500">
              Track performance metrics and trends across your organization
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Top Performing Members</CardTitle>
                <Select
                  value={membersTimeFrame}
                  onValueChange={(value: TimeFrame) =>
                    setMembersTimeFrame(value)
                  }
                >
                  <SelectTrigger className="w-[140px]">
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

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Top Performing Teams</CardTitle>
                <Select
                  value={teamsTimeFrame}
                  onValueChange={(value: TimeFrame) => setTeamsTimeFrame(value)}
                >
                  <SelectTrigger className="w-[140px]">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Trending Categories</CardTitle>
              <Select
                value={categoriesTimeFrame}
                onValueChange={(value: TimeFrame) =>
                  setCategoriesTimeFrame(value)
                }
              >
                <SelectTrigger className="w-[140px]">
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
