import axios from "axios";

export interface Member {
  id: number;
  name: string;
  imageUrl: string | null;
  kudosCount: number;
}

export interface Team {
  teamName: string;
  kudosCount: number;
}

export interface Category {
  category: string;
  kudosCount: number;
}

export interface TimeFrameData {
  currentWeek: any[];
  currentMonth: any[];
  currentQuarter: any[];
  currentYear: any[];
  allTime: any[];
}

export interface AnalyticsData {
  topPerformingMembers: TimeFrameData;
  topPerformingTeams: TimeFrameData;
  trendingCategories: TimeFrameData;
}

export type TimeFrame =
  | "currentWeek"
  | "currentMonth"
  | "currentQuarter"
  | "currentYear"
  | "allTime";

export class AnalyticsService {
  private static instance: AnalyticsService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  async getAnalytics(): Promise<AnalyticsData> {
    try {
      const response = await axios.get(`${this.baseUrl}/analytics`);
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  }
}
