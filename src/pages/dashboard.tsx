import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/ui/custom/Layout";
import { getUserInfo } from "@/utils/auth";
import { UserService } from "@/services/user.service";
import { User } from "@/domain/entities/user";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import { Check, X, Pencil, Trash2 } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn/tabs";
import { AdminRepositoryImpl } from "@/infrastructure/repositories/admin-repository-impl";
import { UpdateUserRoleUseCase } from "@/application/use-cases/admin/update-user-role";
import { DeleteUserUseCase } from "@/application/use-cases/admin/delete-user";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface PendingApproval {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "pending";
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<PendingApproval[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const userService = UserService.getInstance();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [tempRole, setTempRole] = useState<string>("");
  const adminRepository = new AdminRepositoryImpl();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo || userInfo.role !== "admin") {
      router.replace("/");
    } else {
      setUser(userInfo);
      fetchUsers();
    }
  }, [router]);

  useEffect(() => {
    if (activeTab === "pending-approvals") {
      fetchPendingApprovals();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await userService.getUsers();
      // Map service layer User to domain layer User and filter out admin users
      const domainUsers: User[] = fetchedUsers
        .filter((user) => user.role !== "admin")
        .map((user) => ({
          id: parseInt(user.id),
          name: user.name,
          email: user.email,
          role: user.role || "team-member",
        }));
      setUsers(domainUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingApprovals = async () => {
    try {
      const data = await adminRepository.getPendingApprovals();
      setPendingApprovals(data);
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
    }
  };

  const handleEditClick = (userId: number, currentRole: string) => {
    setEditingUserId(userId);
    setTempRole(currentRole);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setTempRole("");
  };

  const handleSaveEdit = async (userId: number) => {
    try {
      const updateUserRoleUseCase = new UpdateUserRoleUseCase(adminRepository);
      await updateUserRoleUseCase.execute(userId, tempRole);

      // Update local state
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, role: tempRole } : user
        )
      );

      setEditingUserId(null);
      setTempRole("");
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleRoleChange = (value: string) => {
    setTempRole(value);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      const deleteUserUseCase = new DeleteUserUseCase(adminRepository);
      await deleteUserUseCase.execute(userToDelete.id);

      // Update local state
      setUsers(users.filter((user) => user.id !== userToDelete.id));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleApproveUser = async (userId: number) => {
    try {
      await adminRepository.approveUser(userId);
      // Remove from pending approvals
      setPendingApprovals(
        pendingApprovals.filter((approval) => approval.id !== userId)
      );
      // Refresh users list
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleRejectUser = async (userId: number) => {
    try {
      await adminRepository.rejectUser(userId);
      // Remove from pending approvals
      setPendingApprovals(
        pendingApprovals.filter((approval) => approval.id !== userId)
      );
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  if (!user) return null;

  if (loading) {
    return (
      <Layout user={user}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
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
              Admin Dashboard
            </h1>
            <p className="text-gray-500">
              Manage users and their roles across the organization
            </p>
          </div>

          <Tabs
            defaultValue="users"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="mb-8">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="pending-approvals">
                Pending Approvals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S.No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-left">{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Select
                            value={
                              editingUserId === user.id
                                ? tempRole
                                : user.role || "team-member"
                            }
                            onValueChange={handleRoleChange}
                            disabled={editingUserId !== user.id}
                          >
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="team-member">
                                Team Member
                              </SelectItem>
                              <SelectItem value="team-lead">
                                Team Lead
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {editingUserId === user.id ? (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleSaveEdit(user.id)}
                                className="text-green-600 hover:text-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleCancelEdit}
                                className="text-red-600 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  handleEditClick(
                                    user.id,
                                    user.role || "team-member"
                                  )
                                }
                                className="text-blue-600 hover:text-blue-700"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteClick(user)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pending-approvals">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>S.No</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((approval, index) => (
                      <TableRow key={approval.id}>
                        <TableCell className="text-left">{index + 1}</TableCell>
                        <TableCell className="font-medium">
                          {approval.name}
                        </TableCell>
                        <TableCell>{approval.email}</TableCell>
                        <TableCell>{approval.role}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApproveUser(approval.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRejectUser(approval.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingApprovals.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No pending approvals
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete User"
        description={`Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </Layout>
  );
};

export default AdminDashboard;
