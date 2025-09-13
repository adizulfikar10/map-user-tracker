# 🗺️ Transnovation - Real-time User Tracking Map

A modern, interactive map application built with Next.js and React Leaflet that displays real-time user locations with advanced features like user following, search functionality, and live tracking simulation.

## ✨ Features

### 🎯 **Core Functionality**

- **Real-time User Tracking**: Live simulation of 100 users moving around Surabaya
- **Interactive Map**: Built with React Leaflet and OpenStreetMap tiles
- **User Following**: Click any user marker to follow their movement in real-time
- **Search & Filter**: Search users by name with instant results
- **Live Updates**: Users move with realistic speeds and smooth animations

### 🏗️ **Architecture**

- **Clean Component Structure**: Modular, reusable components
- **Custom Hooks**: Centralized state management with `useMapState`
- **TypeScript**: Full type safety throughout the application
- **Zustand Store**: Efficient state management for user data
- **Responsive Design**: Works seamlessly on desktop and mobile

### 🎨 **UI/UX Features**

- **Status Bar**: Shows currently followed user with speed information
- **Search Interface**: Real-time search with dropdown results
- **Marker System**: Different icons for followed vs. regular users
- **Smooth Animations**: Fluid map movements and transitions
- **Modern Design**: Clean, professional interface with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone git@github.com:adizulfikar10/map-user-tracker.git
   cd map-user-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
transnovation/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx              # Main app entry point
│   ├── components/
│   │   ├── Map.tsx              # Dynamic map wrapper
│   │   ├── MapContent.tsx       # Main map component
│   │   ├── MapController.tsx    # Map viewport controller
│   │   ├── FollowController.tsx # User following logic
│   │   ├── StatusBar.tsx        # Following status display
│   │   ├── SearchBar.tsx        # User search interface
│   │   └── UserMarker.tsx       # Individual user markers
│   ├── hooks/
│   │   └── useMapState.ts       # Centralized state management
│   ├── store/
│   │   └── userStore.ts         # Zustand store for user data
│   └── types/
│       └── user.ts              # TypeScript type definitions
├── public/                      # Static assets
├── package.json
├── next.config.ts
├── tailwind.config.js
└── README.md
```

## 🛠️ Technology Stack

### **Frontend**

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework

### **Maps & Visualization**

- **React Leaflet** - React wrapper for Leaflet maps
- **Leaflet** - Interactive map library
- **OpenStreetMap** - Free map tiles

### **State Management**

- **Zustand** - Lightweight state management
- **Custom Hooks** - Component-specific state logic

### **Data & Simulation**

- **Faker.js** - Generate realistic user data
- **Haversine Formula** - Calculate real distances and speeds

## 🎮 How to Use

### **Basic Navigation**

1. **Pan the Map**: Click and drag to move around
2. **Zoom**: Use mouse wheel or zoom controls
3. **View Users**: See all 100 simulated users as blue markers

### **Following Users**

1. **Click a Marker**: Click any user marker to start following
2. **Status Bar**: Red status bar appears showing user details
3. **Auto-Center**: Map automatically centers on followed user
4. **Stop Following**: Click "Stop Following" button or click the same marker again

### **Searching Users**

1. **Search Box**: Type a user's name in the search bar
2. **Live Results**: See matching users in dropdown
3. **Select User**: Click any result to follow that user
4. **Clear Search**: Click the X button to clear

### **Real-time Features**

- **Live Movement**: Users move continuously with realistic speeds
- **Speed Calculation**: Actual speed calculated based on distance traveled
- **Smooth Updates**: 1-second update intervals for smooth animation
- **Boundary Constraints**: Users stay within Surabaya city limits

## ⚙️ Configuration

### **User Simulation Settings**

Edit `src/app/page.tsx` to modify:

```typescript
const NUM_USERS = 100; // Number of simulated users
const UPDATE_INTERVAL = 1000; // Update frequency in milliseconds
```

### **Map Settings**

Edit `src/hooks/useMapState.ts` to change:

```typescript
const SURABAYA_CENTER = {
  latitude: -7.2575, // Default map center
  longitude: 112.7521,
  zoom: 12, // Initial zoom level
};
```

### **User Movement Settings**

Edit `src/store/userStore.ts` to adjust:

```typescript
const MIN_SPEED = 20; // Minimum user speed (km/h)
const MAX_SPEED = 60; // Maximum user speed (km/h)
```

## 🧪 Development

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### **Adding New Features**

1. **New Components**: Add to `src/components/`
2. **State Logic**: Add to `src/hooks/useMapState.ts`
3. **Types**: Update `src/types/user.ts`
4. **Store Logic**: Modify `src/store/userStore.ts`

### **Code Style**

- **ESLint**: Configured for Next.js and React
- **TypeScript**: Strict type checking enabled
- **Prettier**: Code formatting (if configured)

## 🌍 Map Configuration

### **Current Setup**

- **Location**: Surabaya, Indonesia
- **Tiles**: OpenStreetMap (free)
- **Bounds**: Constrained to city limits
- **Zoom**: 2-18 levels supported

### **Customizing Location**

To change the map location:

1. **Update Center** in `useMapState.ts`
2. **Update Bounds** in `userStore.ts`
3. **Adjust Initial View** in `MapContent.tsx`

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Leaflet** - Amazing open-source mapping library
- **OpenStreetMap** - Free, open-source map data
- **Next.js Team** - Excellent React framework
- **Faker.js** - Great data generation library

## 📞 Support

If you have any questions or run into issues:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include browser console errors if applicable

---

**Happy Mapping! 🗺️✨**
