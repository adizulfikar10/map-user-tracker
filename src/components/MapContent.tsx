"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import type { User } from "@/types/user";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import components
import MapController from "./MapController";
import FollowController from "./FollowController";
import StatusBar from "./StatusBar";
import SearchBar from "./SearchBar";
import UserMarker from "./UserMarker";
import { useMapState } from "../hooks/useMapState";

interface MapContentProps {
  users: User[];
}

const MapContent = ({ users }: MapContentProps) => {
  const {
    viewport,
    setViewport,
    defaultIcon,
    selectedIcon,
    followedUser,
    isFollowing,
    searchQuery,
    searchResults,
    showSearchResults,
    handleSearch,
    handleSelectUser,
    handleMarkerClick,
    handleStopFollowing,
    handleClearSearch,
  } = useMapState(users);

  if (!defaultIcon || !selectedIcon) {
    return <div>Loading map...</div>;
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Status bar */}
      <StatusBar
        followedUser={followedUser}
        isFollowing={isFollowing}
        onStopFollowing={handleStopFollowing}
      />

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        searchResults={searchResults}
        showSearchResults={showSearchResults}
        onSearch={handleSearch}
        onSelectUser={handleSelectUser}
        onClearSearch={handleClearSearch}
      />

      <div className={`flex-1`}>
        <MapContainer
          center={L.latLng(viewport.latitude, viewport.longitude)}
          zoom={viewport.zoom}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <MapController setViewport={setViewport} isFollowing={isFollowing} />
          <FollowController
            followedUser={followedUser}
            isFollowing={isFollowing}
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {users.map((user) => (
            <UserMarker
              key={user.id}
              user={user}
              isFollowed={followedUser?.id === user.id}
              defaultIcon={defaultIcon}
              selectedIcon={selectedIcon}
              onMarkerClick={handleMarkerClick}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapContent;
