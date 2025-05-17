"use client";

import { useAnalytics } from "@/hooks/useAnalytics";
import { AnalyticsCard } from "./AnalyticsCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TimeFrame } from "@/services/analytics.service";

export function AnalyticsDashboard() {
  const { data, loading, timeFrame, setTimeFrame } = useAnalytics();

  const timeFrameOptions: { value: TimeFrame; label: string }[] = [
    { value: "currentWeek", label: "This Week" },
    { value: "currentMonth", label: "This Month" },
    { value: "currentQuarter", label: "This Quarter" },
    { value: "currentYear", label: "This Year" },
    { value: "allTime", label: "All Time" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <Select
          value={timeFrame}
          onValueChange={(value: TimeFrame) => setTimeFrame(value)}
        >
          <SelectTrigger className="w-[180px]">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard title="Top Performing Members" loading={loading}>
          <div className="space-y-4">
            {data?.topPerformingMembers[timeFrame].map((member) => (
              <div key={member.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.imageUrl || undefined} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Kudos: {member.kudosCount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="Top Performing Teams" loading={loading}>
          <div className="space-y-4">
            {data?.topPerformingTeams[timeFrame].map((team, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{team.teamName}</p>
                </div>
                <p className="text-sm font-medium">Kudos: {team.kudosCount}</p>
              </div>
            ))}
          </div>
        </AnalyticsCard>

        <AnalyticsCard title="Trending Categories" loading={loading}>
          <div className="space-y-4">
            {data?.trendingCategories[timeFrame].map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{category.category}</p>
                </div>
                <p className="text-sm font-medium">
                  Kudos: {category.kudosCount}
                </p>
              </div>
            ))}
          </div>
        </AnalyticsCard>
      </div>
    </div>
  );
}
