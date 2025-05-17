import axios from "axios";

export interface CreateKudosRequest {
  userId: number;
  createdByUserId: number;
  teamName: string;
  category: string;
  message: string;
}

export class KudosService {
  private static instance: KudosService;

  public static getInstance(): KudosService {
    if (!KudosService.instance) {
      KudosService.instance = new KudosService();
    }
    return KudosService.instance;
  }

  async createKudos(data: CreateKudosRequest): Promise<any> {
    try {
      console.log(
        "Making API call to:",
        `${process.env.NEXT_PUBLIC_API}/kudos`
      );
      console.log("Request data:", data);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/kudos`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("API Response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error(
        "Error creating kudos:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}
