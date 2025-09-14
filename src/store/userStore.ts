import { create } from 'zustand';
import { Faker, id_ID } from '@faker-js/faker';
import type { User } from '@/types/user';

interface UserStore {
  users: User[];
  generateUsers: (count: number) => void;
  updateUserLocations: () => void;
}

// Surabaya boundaries (approximate)
const SURABAYA_BOUNDS = {
  north: -7.2275, // North latitude
  south: -7.3475, // South latitude
  east: 112.8021, // East longitude
  west: 112.7021, // West longitude
};

// Constants for speed calculation
const UPDATE_INTERVAL = 1000; // milliseconds
const EARTH_RADIUS = 6371; // Earth's radius in kilometers
const MIN_SPEED = 0; // Minimum speed in km/h
const MAX_SPEED = 80; // Maximum speed in km/h

// Path following constants
const PATH_SMOOTHNESS = 0.00001;

// Function to calculate distance between two points using Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRad = (deg: number) => deg * (Math.PI / 180);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS * c; // Distance in kilometers
};


// Generate a random destination within bounds
const generateRandomDestination = () => {
  const destLat = generateRandomInRange(SURABAYA_BOUNDS.south, SURABAYA_BOUNDS.north);
  const destLng = generateRandomInRange(SURABAYA_BOUNDS.west, SURABAYA_BOUNDS.east);

  return { destLat, destLng };
};

// Generate a simple path with
const generatePath = (startLat: number, startLng: number, endLat: number, endLng: number) => {
  // Create 1 random waypoint between start and end
  const t = 0.5; // Middle point
  const lat = startLat + (endLat - startLat) * t;
  const lng = startLng + (endLng - startLng) * t;

  // Add random variation
  const randomLat = lat + (Math.random() - 0.5) * PATH_SMOOTHNESS;
  const randomLng = lng + (Math.random() - 0.5) * PATH_SMOOTHNESS;

  return [
    { lat: startLat, lng: startLng },
    {
      lat: Math.max(SURABAYA_BOUNDS.south, Math.min(SURABAYA_BOUNDS.north, randomLat)),
      lng: Math.max(SURABAYA_BOUNDS.west, Math.min(SURABAYA_BOUNDS.east, randomLng))
    },
  ];
};

// Interpolate position along path
const interpolateAlongPath = (waypoints: Array<{ lat: number, lng: number }>, progress: number) => {
  const current = waypoints[0];
  const next = waypoints[1];

  // interpolation between waypoints
  const lat = current.lat + (next.lat - current.lat) * progress;
  const lng = current.lng + (next.lng - current.lng) * progress;

  return { lat, lng };
};

export const customFaker = new Faker({
  locale: [id_ID],
});

const generateRandomInRange = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],

  generateUsers: (count) => {
    const newUsers: User[] = Array.from({ length: count }, () => {
      // Generate starting position
      const startLat = generateRandomInRange(SURABAYA_BOUNDS.south, SURABAYA_BOUNDS.north);
      const startLng = generateRandomInRange(SURABAYA_BOUNDS.west, SURABAYA_BOUNDS.east);

      // Generate destination
      const { destLat, destLng } = generateRandomDestination();

      return {
        id: customFaker.string.uuid(),
        name: customFaker.person.fullName(),
        latitude: startLat,
        longitude: startLng,
        speed: customFaker.number.float({ min: MIN_SPEED, max: MAX_SPEED }),
        startLatitude: startLat,
        startLongitude: startLng,
        endLatitude: destLat,
        endLongitude: destLng,
        pathProgress: 0,
      };
    });

    set({ users: newUsers });
  },

  // simulate user movement from socket.io
  updateUserLocations: () => {
    set((state) => ({
      users: state.users.map((user) => {
        // If reached destination, generate new path
        if (user.pathProgress >= 1) {
          const { destLat, destLng } = generateRandomDestination();
          return {
            ...user,
            startLatitude: user.latitude,
            startLongitude: user.longitude,
            endLatitude: destLat,
            endLongitude: destLng,
            pathProgress: 0,
          };
        }

        // Random Speed
        const speed = Math.floor(Math.random() * (MAX_SPEED - MIN_SPEED + 1) + MIN_SPEED);

        // Calculate movement
        const totalDistance = calculateDistance(user.startLatitude, user.startLongitude, user.endLatitude, user.endLongitude);
        const progressIncrement = (speed / 3600) * (UPDATE_INTERVAL / 1000) / totalDistance;
        const newProgress = Math.min(1, user.pathProgress + progressIncrement);

        // Get new position
        const waypoints = generatePath(user.startLatitude, user.startLongitude, user.endLatitude, user.endLongitude);
        const newPosition = interpolateAlongPath(waypoints, newProgress);

        return {
          ...user,
          speed: speed,
          latitude: newPosition.lat,
          longitude: newPosition.lng,
          pathProgress: newProgress,
        };
      })
    }));
  }
}));