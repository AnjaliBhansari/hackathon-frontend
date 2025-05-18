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
        {(user?.role === "team-lead" || user?.role === "admin") && (
          <button
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-6 py-2.5 rounded-full shadow-md transition-all duration-200 hover:from-purple-600 hover:to-blue-600 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-purple-400/50 ring-offset-2 tracking-wide text-base"
            onClick={onGiveKudos}
          >
            <span className="mr-1 text-lg align-middle">✨</span> Give Kudos
          </button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="inline-flex items-center gap-2 px-3 h-11 rounded-full bg-gradient-to-r from-purple-100 via-white to-blue-100 shadow-md border border-purple-200 text-gray-800 font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-purple-400/50 ring-offset-2">
              {user?.name && (
                <span className="font-semibold text-gray-900 text-sm max-w-[120px] truncate drop-shadow-sm">
                  {user.name}
                </span>
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
    </nav>
  );
};

export default Navbar;
