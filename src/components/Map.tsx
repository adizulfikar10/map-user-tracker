"use client";

import dynamic from "next/dynamic";
import type { User } from "@/types/user";

const Map = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => <div className="h-screen w-screen bg-gray-100" />,
});

interface MapComponentProps {
  users: User[];
}

const MapComponent = ({ users }: MapComponentProps) => {
  return <Map users={users} />;
};

export default MapComponent;
