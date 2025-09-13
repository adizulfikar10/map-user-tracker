"use client";

import type { User } from "@/types/user";

interface SearchBarProps {
  searchQuery: string;
  searchResults: User[];
  showSearchResults: boolean;
  onSearch: (query: string) => void;
  onSelectUser: (user: User) => void;
  onClearSearch: () => void;
}

const SearchBar = ({
  searchQuery,
  searchResults,
  showSearchResults,
  onSearch,
  onSelectUser,
  onClearSearch,
}: SearchBarProps) => {
  return (
    <div className="bg-white border-b border-gray-200 p-2">
      <div className="relative search-container">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 pr-10 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        {showSearchResults && searchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-[9999] max-h-60 overflow-y-auto">
            {searchResults.map((user) => (
              <div
                key={user.id}
                onClick={() => onSelectUser(user)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              >
                <div className="font-semibold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-600">
                  Speed: {user.speed.toFixed(2)} km/h
                </div>
                <div className="text-xs text-gray-500">
                  ID: {user.id.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
        {showSearchResults &&
          searchResults.length === 0 &&
          searchQuery.trim() !== "" && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
              No users found matching &quot;{searchQuery}&quot;
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchBar;
