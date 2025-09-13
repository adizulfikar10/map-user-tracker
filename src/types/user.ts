export interface User {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  speed: number; // Speed in kilometers per hour (km/h)
}

export interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}