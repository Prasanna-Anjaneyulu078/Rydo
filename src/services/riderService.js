import { rideService } from './rideService.js';
import { RIDE_TIERS } from '../constants/mockRides.js';
import { QUICK_PLACES, MOCK_SEARCH_RESULTS } from '../constants/mockLocations.js';

export const riderService = {
  getTiers: () => RIDE_TIERS,
  getQuickPlaces: () => QUICK_PLACES,
  searchDestinations: (query = '') => {
    if (!query) return MOCK_SEARCH_RESULTS;
    return MOCK_SEARCH_RESULTS.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
    );
  },
  getActiveRide: rideService.getActiveRide,
  requestRide: rideService.requestRide,
  cancelRide: rideService.cancelRide,
  getRideHistory: rideService.getRideHistory
};
