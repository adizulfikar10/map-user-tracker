"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { User } from "@/types/user";

interface UseFollowControllerProps {
  followedUser: User | null;
  isFollowing: boolean;
}

export const useFollowController = ({
  followedUser,
  isFollowing,
}: UseFollowControllerProps) => {
  const map = useMap();

  useEffect(() => {
    if (isFollowing && followedUser) {
      // Zoom in and center on the followed user
      map.setView(
        L.latLng(followedUser.latitude, followedUser.longitude),
        16, // Higher zoom level for following
        { animate: true, duration: 1 }
      );
    }
  }, [map, followedUser, isFollowing]);
};