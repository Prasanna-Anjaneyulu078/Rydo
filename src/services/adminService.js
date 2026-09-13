import { MOCK_RIDE_HISTORY } from '../constants/mockRides.js';
import { MOCK_DRIVERS } from '../constants/mockDrivers.js';
import { MOCK_USERS_LIST } from '../constants/mockUsers.js';

// Stateful driver cache so status toggles persist in the admin session
let driversStore = MOCK_DRIVERS.map((d, index) => ({
  ...d,
  status: d.status || (index === 3 ? 'Pending' : 'Active'),
  trips: d.trips || d.tripsCount || 1200,
  tier: d.tier || d.vehicleType || 'Rydo Comfort'
}));

export const adminService = {
  getPlatformMetrics: () => ({
    activeRides: 42,
    activeDrivers: 156,
    todayRevenue: 284500,
    aiMatchRate: '98.4%',
    surgeMultiplier: 1.2,
    totalUsers: 14820,
    totalRiders: 13240,
    totalDrivers: 1580,
    completedToday: 384,
    driverAcceptanceRate: '94.2%',
    avgMatchTimeSeconds: '4.2s',
    modelVersion: 'Rydo-NeuralDispatch-v4.8'
  }),

  getDashboardMetrics: function () {
    return this.getPlatformMetrics();
  },

  getLiveRides: () => [
    {
      id: 'RYD-99412',
      rider: 'Ananya Sharma',
      driver: 'Rahul Sharma',
      pickup: 'Indiranagar 100ft Road',
      destination: 'Koramangala 5th Block',
      fare: 210,
      tier: 'Rydo Comfort',
      status: 'In_Progress'
    },
    {
      id: 'RYD-99388',
      rider: 'Alex Mercer',
      driver: 'Vikram Singh',
      pickup: 'Financial District, Market St',
      destination: 'Mission Bay Hub',
      fare: 140,
      tier: 'Rydo Economy',
      status: 'In_Progress'
    },
    {
      id: 'RYD-99354',
      rider: 'Priya Patel',
      driver: 'Rajesh Patel',
      pickup: 'Koramangala Club',
      destination: 'MG Road Metro Station',
      fare: 85,
      tier: 'Rydo Auto',
      status: 'In_Progress'
    },
    {
      id: 'RYD-99310',
      rider: 'Karthik R.',
      driver: 'Priya Nair',
      pickup: 'Airport Express Terminal',
      destination: 'Whitefield IT Expressway',
      fare: 320,
      tier: 'Rydo Premier',
      status: 'Completed'
    },
    {
      id: 'RYD-99275',
      rider: 'Sneha Roy',
      driver: 'Vikram Singh',
      pickup: 'Domlur Flyover',
      destination: 'Indiranagar Metro',
      fare: 95,
      tier: 'Rydo Auto',
      status: 'Completed'
    }
  ],

  getAllRides: (filter = 'all') => {
    const defaultRiders = ['Alex Mercer', 'Ananya Sharma', 'Rohan Gupta', 'Priya Patel'];
    let list = MOCK_RIDE_HISTORY.map((r, index) => {
      const riderName = r.rider || defaultRiders[index % defaultRiders.length];
      const driverName = typeof r.driver === 'string' ? r.driver : r.driver?.name || 'Unassigned';
      return {
        ...r,
        rider: riderName,
        driver: driverName,
        driverInfo: r.driver
      };
    });

    if (filter !== 'all') {
      list = list.filter(r => r.status.toLowerCase() === filter.toLowerCase());
    }
    return list;
  },

  getAllDrivers: () => {
    return [...driversStore];
  },

  updateDriverStatus: (id, newStatus) => {
    driversStore = driversStore.map(d => 
      d.id === id ? { ...d, status: newStatus } : d
    );
    return { success: true, id, status: newStatus };
  },

  getAllUsers: (roleFilter = 'all') => {
    let list = [...MOCK_USERS_LIST];
    if (roleFilter !== 'all') {
      list = list.filter(u => u.role.toLowerCase() === roleFilter.toLowerCase());
    }
    return list;
  },

  getAIMatchingStats: () => ({
    modelName: 'Rydo Spatial-Temporal Flow Engine v4.8',
    status: 'OPTIMAL',
    currentDispatchCycleMs: 140,
    activeHotspots: [
      { name: 'Indiranagar 100ft Hub', surgeMultiplier: '1.4x', demandIndex: 'High' },
      { name: 'Airport Corridor (KIA T2)', surgeMultiplier: '+₹120 Queued', demandIndex: 'Very High' },
      { name: 'Financial Dist / Market St', surgeMultiplier: '1.2x', demandIndex: 'Moderate' },
      { name: 'Koramangala 5th Block', surgeMultiplier: '1.3x', demandIndex: 'High' }
    ],
    telemetryMetrics: {
      gpsAccuracyAvg: '2.1m',
      satelliteLocks: 14,
      avgEtaAccuracy: '96.8%'
    }
  })
};
