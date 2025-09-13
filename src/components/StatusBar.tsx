"use client";

import type { User } from "@/types/user";

interface StatusBarProps {
  followedUser: User | null;
  isFollowing: boolean;
  onStopFollowing: () => void;
}

const StatusBar = ({
  followedUser,
  isFollowing,
  onStopFollowing,
}: StatusBarProps) => {
  if (!isFollowing || !followedUser) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white p-3 text-center font-semibold">
      🎯 Following: {followedUser.name} | Speed: {followedUser.speed.toFixed(2)}{" "}
      km/h
      <button
        onClick={onStopFollowing}
        className="ml-4 bg-red-800 hover:bg-red-900 px-3 py-1 rounded text-sm"
      >
        Stop Following
      </button>
    </div>
  );
};

export default StatusBar;
