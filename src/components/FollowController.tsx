"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import type { User } from "@/types/user";

interface FollowControllerProps {
  followedUser: User | null;
  isFollowing: boolean;
}

const FollowController = ({
  followedUser,
  isFollowing,
}: FollowControllerProps) => {
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

  return null;
};

export default FollowController;
