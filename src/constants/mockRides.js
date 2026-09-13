import { ASSETS } from './assets.js';

export const RIDE_TIERS = [
  {
    id: 'economy',
    name: 'Rydo Economy',
    tag: 'Popular',
    seats: 4,
    eta: '4 min away',
    pickupMinutes: 4,
    description: 'Standard Sedan',
    price: 140,
    originalPrice: 165,
    image: ASSETS.carEconomy,
    icon: 'directions_car',
    features: ['Affordable', 'Verified Drivers']
  },
  {
    id: 'comfort',
    name: 'Rydo Comfort',
    tag: 'Top Rated',
    seats: 4,
    eta: '3 min away',
    pickupMinutes: 3,
    description: 'Extra Legroom • Guaranteed AC',
    price: 210,
    originalPrice: null,
    image: ASSETS.carComfort,
    icon: 'minor_crash',
    features: ['Spacious sedans', 'Guaranteed AC']
  },
  {
    id: 'premier',
    name: 'Rydo Premier',
    tag: 'Quiet EV',
    seats: 4,
    eta: '6 min away',
    pickupMinutes: 6,
    description: 'Luxury Interior • Zero Emission',
    price: 320,
    originalPrice: null,
    image: ASSETS.carComfort,
    icon: 'electric_car',
    features: ['High-end EV', 'Chauffeur Trained']
  },
  {
    id: 'auto',
    name: 'Rydo Auto',
    tag: 'Quickest',
    seats: 3,
    eta: '2 min away',
    pickupMinutes: 2,
    description: 'Pocket friendly • Beats rush traffic',
    price: 85,
    originalPrice: 95,
    image: ASSETS.carAuto,
    icon: 'electric_rickshaw',
    features: ['Pocket friendly', 'Speedy commute']
  }
];

export const MOCK_RIDE_HISTORY = [
  {
    id: 'RYD-98214',
    date: 'Today, 2:45 PM',
    timestamp: '2026-09-13T14:45:00',
    pickup: '452 Market St, Financial Dist',
    destination: 'Mission Bay Innovation Hub, 4th St',
    distance: '5.2 km',
    duration: '18 mins',
    fare: 140,
    status: 'Completed',
    tier: 'Rydo Economy',
    driver: {
      name: 'Rahul Sharma',
      vehicle: 'White Hyundai i20 (KA 01 MJ 4821)',
      rating: 4.9,
      avatar: ASSETS.driverAvatar
    },
    userRating: 5
  },
  {
    id: 'RYD-97812',
    date: 'Yesterday, 6:15 PM',
    timestamp: '2026-09-12T18:15:00',
    pickup: 'Indiranagar 100ft Road',
    destination: 'Koramangala 5th Block, Sony Signal',
    distance: '6.4 km',
    duration: '24 mins',
    fare: 180,
    status: 'Completed',
    tier: 'Rydo Comfort',
    driver: {
      name: 'Vikram Singh',
      vehicle: 'Toyota Innova (MH 12 RT 8843)',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    userRating: 5
  },
  {
    id: 'RYD-96541',
    date: '10 Sep 2026, 9:20 AM',
    timestamp: '2026-09-10T09:20:00',
    pickup: 'City Railway Central Station',
    destination: 'Cyber Gateway IT Park',
    distance: '11.8 km',
    duration: '35 mins',
    fare: 260,
    status: 'Completed',
    tier: 'Rydo Premier',
    driver: {
      name: 'Priya Nair',
      vehicle: 'Honda City Hybrid (KA 05 EQ 1120)',
      rating: 4.92,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    userRating: 4
  },
  {
    id: 'RYD-95402',
    date: '08 Sep 2026, 7:50 PM',
    timestamp: '2026-09-08T19:50:00',
    pickup: 'Domlur Flyover Junction',
    destination: 'Koramangala Club',
    distance: '3.8 km',
    duration: '12 mins',
    fare: 85,
    status: 'Cancelled',
    tier: 'Rydo Auto',
    driver: null,
    userRating: null
  }
];
