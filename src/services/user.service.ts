import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API}/users`, {
        withCredentials: true,
      });
      console.log("API Response:", response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      // Return mock data for testing if API fails
      return [
        { id: "1", name: "John Doe", email: "john@example.com" },
        { id: "2", name: "Jane Smith", email: "jane@example.com" },
        { id: "3", name: "Bob Johnson", email: "bob@example.com" },
      ];
    }
  }

  //   async searchUsers(query: string): Promise<User[]> {
  //     try {
  //       const response = await axios.get(`${this.baseUrl}/users/search`, {
  //         params: { query },
  //       });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error searching users:", error);
  //       return [];
  //     }
  //   }
}
