"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { User } from "@/types/user";

interface UserMarkerProps {
  user: User;
  isFollowed: boolean;
  defaultIcon: L.Icon;
  selectedIcon: L.Icon;
  onMarkerClick: (user: User) => void;
}

const UserMarker = ({
  user,
  isFollowed,
  defaultIcon,
  selectedIcon,
  onMarkerClick,
}: UserMarkerProps) => {
  return (
    <Marker
      key={user.id}
      position={L.latLng(user.latitude, user.longitude)}
      icon={isFollowed ? selectedIcon : defaultIcon}
      eventHandlers={{
        click: () => onMarkerClick(user),
      }}
    >
      <Popup>
        <div className="p-2 min-w-[200px]">
          <h3 className="font-bold text-lg mb-2">{user.name}</h3>
          <div className="text-sm space-y-1">
            <p>
              <span className="font-semibold">ID:</span> {user.id.slice(0, 8)}
              ...
            </p>
            <p>
              <span className="font-semibold">Location:</span>
              <br />
              Lat: {user.latitude.toFixed(4)}
              <br />
              Lng: {user.longitude.toFixed(4)}
            </p>
            <p>
              <span className="font-semibold">Speed:</span>{" "}
              {user.speed.toFixed(2)} km/h
            </p>
            {isFollowed && (
              <p className="text-red-600 font-semibold">
                🎯 Following this user
              </p>
            )}
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default UserMarker;
