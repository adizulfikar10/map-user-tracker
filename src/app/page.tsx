"use client";

import { useEffect } from "react";
import MapComponent from "@/components/Map";
import { useUserStore } from "@/store/userStore";

const NUM_USERS = 100;
const UPDATE_INTERVAL = 1000; // 1 second

export default function Home() {
  const { users, generateUsers, updateUserLocations } = useUserStore();

  useEffect(() => {
    generateUsers(NUM_USERS);

    const interval = setInterval(() => {
      updateUserLocations();
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [generateUsers, updateUserLocations]);

  return <MapComponent users={users} />;
}
