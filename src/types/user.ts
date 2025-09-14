export interface User {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  speed: number; // Speed in kilometers per hour (km/h)
  // Path following properties
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
  pathProgress: number; // Progress along path (0 to 1)
}

export interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}