import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
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
    <nav className="w-full bg-white border-b py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 w-full flex items-center justify-between">
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
        </div>
        {/* Right: Button and Avatar */}
        <div className="flex items-center space-x-4">
          <button
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 font-semibold shadow-sm hover:from-blue-200 hover:to-purple-200 hover:scale-105 hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-purple-300/50 ring-offset-2"
            onClick={() => router.push("/analytics")}
          >
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11v6M12 7v10M17 13v4" />
            </svg>
            Analytics
          </button>
          {(user?.role === "team-lead" || user?.role === "admin") && (
            <button
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 font-semibold shadow-sm hover:from-blue-200 hover:to-purple-200 hover:scale-105 hover:shadow-md transition-all duration-200 focus:ring-2 focus:ring-purple-300/50 ring-offset-2"
              onClick={onGiveKudos}
            >
              <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              Give Kudos
            </button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="inline-flex items-center gap-2 px-3 h-11 rounded-full bg-gradient-to-r from-purple-100 via-white to-blue-100 shadow-md border border-purple-200 text-gray-800 font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-purple-400/50 ring-offset-2">
                {user?.name && (
                  <span className="font-semibold text-gray-900 text-sm max-w-[120px] truncate drop-shadow-sm">{user.name}</span>
                )}
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-300 to-blue-200 text-purple-800 font-bold shadow-inner border-2 border-white">
                  {initials || (
                    <svg
                      className="w-7 h-7 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    </svg>
                  )}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={handleProfileClick}
                className="cursor-pointer"
              >
                Profile
              </DropdownMenuItem>
              {user?.role === "admin" && (
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard")}
                  className="cursor-pointer"
                >
                  Dashboard
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
