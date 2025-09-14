"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { Viewport } from "@/types/user";

interface UseMapControllerProps {
  setViewport: (v: Viewport) => void;
  isFollowing: boolean;
}

export const useMapController = ({ setViewport, isFollowing }: UseMapControllerProps) => {
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      if (isFollowing) {
        return;
      }

      const center = map.getCenter();
      const zoom = map.getZoom();
      setViewport({
        latitude: center.lat,
        longitude: center.lng,
        zoom: zoom || 2,
      });
    };

    map.on("moveend", handleMoveEnd);
    return () => {
      map.off("moveend", handleMoveEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, isFollowing]);
};