import React from "react";
import { ProfileForm } from "./profile-form";
import Layout from "@/components/ui/custom/Layout";
import { getUserInfo } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Auth check effect
  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      router.replace("/login");
    } else {
      setUser(userInfo);
    }
  }, [router]);

  if (!user) return null; // Prevent rendering until auth check

  return (
    <Layout user={user}>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto py-10 px-4">
          <ProfileForm />
        </div>
      </main>
    </Layout>
  );
}
