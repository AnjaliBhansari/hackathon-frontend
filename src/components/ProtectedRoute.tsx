import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isPending: loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data) {
      router.push("/login");
    }
  }, [data, loading, router]);

  if (loading) return <div>Loading...</div>;

  return data ? <>{children}</> : null;
}
