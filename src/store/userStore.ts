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
const MIN_SPEED = 20; // Minimum speed in km/h (walking/cycling)
const MAX_SPEED = 60; // Maximum speed in km/h (city driving)

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

// Calculate movement based on desired speed (km/h)
const calculateMovement = (speed: number) => {
  // Convert speed from km/h to km/s
  const speedKmPerSecond = speed / 3600;
  // Calculate approximate degree change for the given speed
  // At the equator, 1 degree is approximately 111 kilometers
  return (speedKmPerSecond / 111) * (UPDATE_INTERVAL / 1000);
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
    const newUsers: User[] = Array.from({ length: count }, () => ({
      id: customFaker.string.uuid(),
      name: customFaker.person.fullName(),
      latitude: generateRandomInRange(SURABAYA_BOUNDS.south, SURABAYA_BOUNDS.north),
      longitude: generateRandomInRange(SURABAYA_BOUNDS.west, SURABAYA_BOUNDS.east),
      speed: customFaker.number.float({ min: MIN_SPEED, max: MAX_SPEED }) // Speed in km/h
    }));

    set({ users: newUsers });
  },

  // simulate user movement from socket
  updateUserLocations: () => {
    set((state) => ({
      users: state.users.map((user) => {
        // Calculate movement based on speed
        const movement = calculateMovement(user.speed);

        // Random direction with smooth turns
        const angle = Math.random() * 2 * Math.PI;
        const latMove = movement * Math.cos(angle);
        const lngMove = movement * Math.sin(angle);

        // Calculate new positions
        let newLat = user.latitude + latMove;
        let newLng = user.longitude + lngMove;

        // Keep within bounds
        newLat = Math.max(SURABAYA_BOUNDS.south, Math.min(SURABAYA_BOUNDS.north, newLat));
        newLng = Math.max(SURABAYA_BOUNDS.west, Math.min(SURABAYA_BOUNDS.east, newLng));

        // Calculate actual speed based on the distance traveled
        const distanceKm = calculateDistance(user.latitude, user.longitude, newLat, newLng);
        const actualSpeedKmH = (distanceKm * 3600) / (UPDATE_INTERVAL / 1000);

        return {
          ...user,
          latitude: newLat,
          longitude: newLng,
          speed: actualSpeedKmH // Update speed to actual calculated speed
        };
      })
    }));
  }
}));