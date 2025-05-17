"use client";

import { useState, useEffect } from "react";
import {
  AnalyticsService,
  AnalyticsData,
  TimeFrame,
} from "@/services/analytics.service";

export const useAnalytics = (initialTimeFrame: TimeFrame = "currentWeek") => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(initialTimeFrame);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const analyticsService = AnalyticsService.getInstance();
      const result = await analyticsService.getAnalytics();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch analytics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return {
    data,
    loading,
    error,
    timeFrame,
    setTimeFrame,
    refetch: fetchAnalytics,
  };
};
