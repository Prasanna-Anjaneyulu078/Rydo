import { MOCK_RIDE_HISTORY, RIDE_TIERS } from '../constants/mockRides.js';
import { MOCK_DRIVERS } from '../constants/mockDrivers.js';
import { DEFAULT_LOCATIONS } from '../constants/mockLocations.js';

let activeRideState = {
  id: 'RYD-98214',
  pickup: DEFAULT_LOCATIONS.pickup.title,
  destination: DEFAULT_LOCATIONS.destination.title,
  distance: '5.2 km',
  duration: '18 mins',
  tier: RIDE_TIERS[0],
  fare: 140,
  paymentMethod: 'Cash / UPI (•••• 8821)',
  status: 'IDLE', // 'IDLE' | 'MATCHING' | 'DRIVER_ASSIGNED' | 'DRIVER_ARRIVING' | 'RIDE_STARTED' | 'COMPLETED' | 'CANCELLED'
  driver: MOCK_DRIVERS[0],
  etaMinutes: 3,
  safetyPin: '5912',
  routeProgress: 0.15,
  carbonSaved: '1.2 kg CO₂'
};

let rideHistory = [...MOCK_RIDE_HISTORY];

export const rideService = {
  getActiveRide: () => {
    return { ...activeRideState };
  },

  setActiveRide: (updates) => {
    activeRideState = { ...activeRideState, ...updates };
    return { ...activeRideState };
  },

  requestRide: async ({ pickup, destination, tier, fare, paymentMethod }) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    activeRideState = {
      ...activeRideState,
      id: `RYD-${Math.floor(10000 + Math.random() * 90000)}`,
      pickup: pickup || DEFAULT_LOCATIONS.pickup.title,
      destination: destination || DEFAULT_LOCATIONS.destination.title,
      tier: tier || RIDE_TIERS[0],
      fare: fare || tier?.price || 140,
      paymentMethod: paymentMethod || 'Cash / UPI (•••• 8821)',
      status: 'MATCHING',
      driver: null,
      routeProgress: 0,
      etaMinutes: tier?.pickupMinutes || 3
    };
    return activeRideState;
  },

  simulateDriverMatch: async () => {
    await new Promise(resolve => setTimeout(resolve, 2400));
    const matchedDriver = MOCK_DRIVERS[0];
    activeRideState = {
      ...activeRideState,
      status: 'DRIVER_ASSIGNED',
      driver: matchedDriver,
      safetyPin: matchedDriver.safetyPin || '5912',
      etaMinutes: 3
    };
    return activeRideState;
  },

  updateRideStatus: (newStatus) => {
    activeRideState.status = newStatus;
    return { ...activeRideState };
  },

  completeRide: (rating = 5, feedback = '') => {
    activeRideState.status = 'COMPLETED';
    const completedRecord = {
      id: activeRideState.id,
      date: 'Just now',
      timestamp: new Date().toISOString(),
      pickup: activeRideState.pickup,
      destination: activeRideState.destination,
      distance: activeRideState.distance,
      duration: activeRideState.duration,
      fare: activeRideState.fare,
      status: 'Completed',
      tier: activeRideState.tier?.name || 'Rydo Economy',
      driver: {
        name: activeRideState.driver?.name || 'Rahul Sharma',
        vehicle: `${activeRideState.driver?.vehicleName} (${activeRideState.driver?.vehiclePlate})`,
        rating: activeRideState.driver?.rating || 4.9,
        avatar: activeRideState.driver?.avatar
      },
      userRating: rating,
      feedback
    };
    rideHistory = [completedRecord, ...rideHistory];
    return completedRecord;
  },

  cancelRide: (reason = 'Changed mind') => {
    activeRideState.status = 'CANCELLED';
    const cancelledRecord = {
      id: activeRideState.id,
      date: 'Just now',
      timestamp: new Date().toISOString(),
      pickup: activeRideState.pickup,
      destination: activeRideState.destination,
      distance: activeRideState.distance,
      duration: activeRideState.duration,
      fare: activeRideState.fare,
      status: 'Cancelled',
      tier: activeRideState.tier?.name || 'Rydo Economy',
      driver: activeRideState.driver,
      userRating: null,
      cancelReason: reason
    };
    rideHistory = [cancelledRecord, ...rideHistory];
    return cancelledRecord;
  },

  getRideHistory: () => {
    return [...rideHistory];
  },

  resetActiveRide: () => {
    activeRideState.status = 'IDLE';
    return { ...activeRideState };
  }
};
