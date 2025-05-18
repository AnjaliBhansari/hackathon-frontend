import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth-repository-impl";
import { useRouter } from "next/router";
import Link from "next/link";

interface NavbarProps {
  user?: { name?: string; role?: string };
  onGiveKudos?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onGiveKudos }) => {
  const router = useRouter();
  const authRepository = new AuthRepositoryImpl();

  // Get initials from user name
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const handleLogout = async () => {
    try {
      await authRepository.logout();
      // Redirect to login page after successful logout
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // You might want to show an error toast here
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <nav className="w-full bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo and Title */}
      <div className="flex items-center space-x-3">
        <span className="text-purple-600 text-2xl">
          <svg
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#7C3AED" />
            <path
              d="M12 7v5l3 3"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span>
          <Link
            href="/"
            className="font-bold text-xl text-gray-900 hover:text-purple-600 transition-colors"
          >
            Avesta Kudos
          </Link>
        </span>
        <button
          className="text-gray-700 font-bold px-16 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => router.push("/analytics")}
        >
          Analytics
        </button>
      </div>
      {/* Right: Button and Avatar */}
      <div className="flex items-center space-x-4">
        {user?.role === "team-lead" && (
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
            onClick={onGiveKudos}
          >
            + Give Kudos
          </button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200 text-gray-700 font-bold cursor-pointer hover:bg-gray-200 transition-colors">
              {initials || (
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                </svg>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              onClick={handleProfileClick}
              className="cursor-pointer"
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
