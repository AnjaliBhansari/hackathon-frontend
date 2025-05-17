import React from 'react';
import Dropdown from './Dropdown';

interface KudosFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  department: string;
  setDepartment: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
  TEAM_OPTIONS: { label: string }[];
  CATEGORY_OPTIONS: { label: string }[];
}

const KudosFilterBar: React.FC<KudosFilterBarProps> = ({
  search,
  setSearch,
  department,
  setDepartment,
  category,
  setCategory,
  sort,
  setSort,
  TEAM_OPTIONS,
  CATEGORY_OPTIONS,
}) => {
  const handleClearAll = () => {
    setSearch('');
    setDepartment('All');
    setCategory('All');
    setSort('Most Recent');
  };

  return (
    <div className="mb-8">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-4 w-full sm:w-auto flex-wrap">
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/><path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </span>
            <input
              type="text"
              placeholder="Search kudos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-lg pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
            />
          </div>
          <Dropdown
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            options={TEAM_OPTIONS}
            placeholder="All Departments"
            className="w-full sm:w-48"
          />
          <Dropdown
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={CATEGORY_OPTIONS}
            placeholder="All Categories"
            className="w-full sm:w-48"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">Sort by:</span>
          <Dropdown
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            options={[
              { label: 'Most Recent' },
              { label: 'Oldest' }
            ]}
            placeholder="Sort"
            className="w-40"
          />
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default KudosFilterBar; 