import React from "react";
import { useRouter } from "next/router";
import UserProfileKudosList from "@/presentation/features/kudos/components/UserProfileKudosList";

const UserProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== "string") return null;

  return <UserProfileKudosList userId={id} />;
};

export default UserProfilePage;
