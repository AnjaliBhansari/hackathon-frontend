import React, { useState, useEffect } from "react";
import { KudosCard } from "@/presentation/features/kudos/components/kudos-card";
import {
  TEAM_OPTIONS,
  CATEGORY_OPTIONS,
} from "@/presentation/features/kudos/constants/options";
import Layout from "@/components/ui/Layout";
import Pagination from "@/components/ui/Pagination";
import KudosFilterBar from "@/components/ui/KudosFilterBar";
import { useKudos } from "@/hooks/useKudos";

import { useRouter } from "next/router";
import { getUserInfo } from "@/utils/auth";

/**
 * Next.js index page that serves as the entry point for the home route.
 * This page uses the HomeView component from our presentation layer.
 */
export default function Home() {
  const { kudos, loading, error } = useKudos();
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = getUserInfo();
    if (!userInfo) {
      router.replace("/login");
    } else {
      setUser(userInfo);
    }
  }, [router]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Most Recent");
  const kudosPerPage = 6;

  // Filtering
  let filteredKudos = kudos.filter((kudos) => {
    const matchesSearch =
      (kudos.message?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (kudos.category?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (kudos.receiver?.name?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesDepartment =
      department === "All" || kudos.teamName === department;
    const matchesCategory =
      category === "All" || kudos.category === category;
    return matchesSearch && matchesDepartment && matchesCategory;
  });

  // Sorting
  filteredKudos = filteredKudos.sort((a, b) => {
    if (sort === "Most Recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sort === "Oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  const totalPages = Math.ceil(filteredKudos.length / kudosPerPage);
  const paginatedKudos = filteredKudos.slice(
    (currentPage - 1) * kudosPerPage,
    currentPage * kudosPerPage
  );

  // Reset to first page on filter/sort/category change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, department, category, sort]);

  if (!user) return null; // Prevent rendering until auth check

  return (
    <Layout user={user}>
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto py-10 px-4">
          <KudosFilterBar
            search={search}
            setSearch={setSearch}
            department={department}
            setDepartment={setDepartment}
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
            TEAM_OPTIONS={[...TEAM_OPTIONS]}
            CATEGORY_OPTIONS={[...CATEGORY_OPTIONS]}
          />
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Kudos Wall
            </h1>
            <p className="text-gray-500">
              Celebrate your teammates' achievements and contributions!
            </p>
          </div>
          {loading ? (
            <div className="text-center py-10 text-lg text-gray-500">Loading kudos...</div>
          ) : error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {paginatedKudos.map((kudos, idx) => (
                  <KudosCard 
                    key={kudos.id || idx} 
                    {...kudos}

                    recipientName={kudos.receiver.name}
                    categoryValue={kudos.category} 
                    creator={kudos.creator} 
                    date={new Date(kudos.createdAt).toISOString()} 
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </div>
      </main>
    </Layout>
  );
}

