export interface AdminRepository {
  updateUserRole(memberId: number, role: string): Promise<void>;
  deleteUser(userId: number): Promise<void>;
  getPendingApprovals(): Promise<any[]>;
  approveUser(userId: number): Promise<void>;
  rejectUser(userId: number): Promise<void>;
}
