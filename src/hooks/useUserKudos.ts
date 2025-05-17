import { useEffect, useState } from "react";

interface Kudos {
  id: string;
  category: string;
  categoryValue: string;
  receiver: { name: string };
  teamName: string;
  message: string;
  creator: { name: string; id: string };
  createdAt: string;
}

export function useUserKudos(id: string | string[] | undefined) {
  const [kudos, setKudos] = useState<Kudos[]>([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API}/kudos/${id}`, {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch kudos");
        const data = await res.json();
        if (Array.isArray(data)) {
          setKudos(data);
          setUserName(data[0]?.receiver?.name || "User");
        } else {
          setKudos(data.kudos || []);
          setUserName(data.userName || "User");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching kudos");
        setLoading(false);
      });
  }, [id]);

  return { kudos, userName, loading, error };
}
