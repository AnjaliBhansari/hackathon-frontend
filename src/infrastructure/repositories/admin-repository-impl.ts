import { AdminRepository } from "@/domain/repositories/admin-repository";

export class AdminRepositoryImpl implements AdminRepository {
  async updateUserRole(memberId: number, role: string): Promise<void> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/members`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ memberId, role }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user role");
    }
  }

  async deleteUser(userId: number): Promise<void> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/members/${userId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }
  }

  async getPendingApprovals(): Promise<any[]> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/team-lead-requests/pending`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch pending approvals");
    }

    return response.json();
  }

  async approveUser(userId: number): Promise<void> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/team-lead-requests/handle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          memberId: userId,
          status: "approved",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to approve user");
    }
  }

  async rejectUser(userId: number): Promise<void> {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/team-lead-requests/handle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          memberId: userId,
          status: "rejected",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to reject user");
    }
  }
}
