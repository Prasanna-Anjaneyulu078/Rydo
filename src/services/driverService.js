import { MOCK_DRIVERS } from '../constants/mockDrivers.js';
import { rideService } from './rideService.js';

let driverStatus = {
  isOnline: true,
  currentDriver: { ...MOCK_DRIVERS[0] },
  shiftStats: {
    todayNet: 1840,
    completedTrips: 8,
    acceptanceRate: '98.2%',
    rating: 4.9
  },
  pendingRequest: {
    id: 'REQ-4902',
    rider: {
      name: 'Ananya S.',
      badge: 'Rydo Prime',
      ridesCompleted: '140+ rides completed',
      rating: 4.9,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCL3LzPfvf3eR3uG8oE8U5E6Wp0WlY8_w_P3t2N3Xg8_mQ9tZfC0Z9yBw1uL3V7gK0A5J2E3D4F6G7H8J9K0L'
    },
    fare: 240,
    aiSurge: 35,
    pickup: {
      title: 'Indiranagar 100ft Road',
      subtitle: '1.1 km away • Near CMH Metro Station',
      eta: '3 min ETA'
    },
    dropoff: {
      title: 'Koramangala 5th Block',
      subtitle: '6.4 km total trip distance • Sony World Signal',
      eta: '22 mins trip'
    },
    duration: '22 mins duration',
    paymentType: 'Digital / UPI',
    isVerifiedRider: true,
    expiresInSeconds: 12
  }
};

export const driverService = {
  getDriverProfile: () => driverStatus.currentDriver,
  
  getShiftStats: () => driverStatus.shiftStats,
  
  getOnlineStatus: () => driverStatus.isOnline,
  
  toggleOnlineStatus: () => {
    driverStatus.isOnline = !driverStatus.isOnline;
    return driverStatus.isOnline;
  },

  getIncomingRequest: () => driverStatus.pendingRequest,

  acceptRide: async (requestId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    rideService.setActiveRide({
      status: 'DRIVER_ARRIVING',
      pickup: driverStatus.pendingRequest.pickup.title,
      destination: driverStatus.pendingRequest.dropoff.title,
      fare: driverStatus.pendingRequest.fare,
      driver: driverStatus.currentDriver
    });
    return { success: true };
  },

  declineRide: async (requestId) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  },

  getDriverHistory: () => {
    return rideService.getRideHistory().map(r => ({
      ...r,
      rider: 'Ananya S. / Alex Mercer',
      earnings: Math.round(r.fare * 0.82)
    }));
  }
};
