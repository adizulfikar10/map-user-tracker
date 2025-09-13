"use client";

import { useState, useEffect } from "react";
import L from "leaflet";
import type { User, Viewport } from "@/types/user";

const SURABAYA_CENTER = {
  latitude: -7.2575,
  longitude: 112.7521,
  zoom: 12, // City level zoom
};

export const useMapState = (users: User[]) => {
  const [viewport, setViewport] = useState<Viewport>(SURABAYA_CENTER);
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null);
  const [followedUser, setFollowedUser] = useState<User | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<L.Icon | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Initialize icons
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Set up the default icon
      const icon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Set up the selected icon (red marker)
      const selectedIcon = L.icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
        iconRetinaUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      setDefaultIcon(icon);
      setSelectedIcon(selectedIcon);
    }
  }, []);

  // Handle search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  // Handle selecting a user from search results
  const handleSelectUser = (user: User) => {
    setFollowedUser(user);
    setIsFollowing(true);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  // Handle marker click to follow/unfollow user
  const handleMarkerClick = (user: User) => {
    if (followedUser?.id === user.id) {
      // If clicking the same user, stop following
      setFollowedUser(null);
      setIsFollowing(false);
    } else {
      // Follow the clicked user
      setFollowedUser(user);
      setIsFollowing(true);
    }
  };

  // Handle stopping following
  const handleStopFollowing = () => {
    setFollowedUser(null);
    setIsFollowing(false);
  };

  // Handle clearing search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  return {
    // State
    viewport,
    setViewport,
    defaultIcon,
    selectedIcon,
    followedUser,
    isFollowing,
    searchQuery,
    searchResults,
    showSearchResults,
    // Actions
    handleSearch,
    handleSelectUser,
    handleMarkerClick,
    handleStopFollowing,
    handleClearSearch,
  };
};