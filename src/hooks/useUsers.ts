import { useState, useEffect } from "react";
import { User, UserService } from "@/services/user.service";

export function useUsers(isSearchFocused: boolean = false) {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users only when search is focused
  useEffect(() => {
    if (!isSearchFocused) return;

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userService = UserService.getInstance();
        const data = await userService.getUsers();
      
        setAllUsers(data);
        setFilteredUsers(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching users:", err); // Debug log
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isSearchFocused]);

  // Filter users based on search query
  useEffect(() => {
    console.log("Current search query:", searchQuery); // Debug log
    console.log("All users:", allUsers); // Debug log

    if (searchQuery.length < 2) {
      setFilteredUsers(allUsers);
      return;
    }

    const filtered = allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Filtered users:", filtered); // Debug log
    setFilteredUsers(filtered);
  }, [searchQuery, allUsers]);

  return {
    users: filteredUsers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
  };
}
