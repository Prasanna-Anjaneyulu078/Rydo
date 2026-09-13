import React, { createContext, useContext, useState, useEffect } from 'react';
import { rideService } from '../services/rideService.js';
import { RIDE_TIERS } from '../constants/mockRides.js';
import { DEFAULT_LOCATIONS } from '../constants/mockLocations.js';

const RideContext = createContext();

export function RideProvider({ children }) {
  const [pickup, setPickup] = useState(DEFAULT_LOCATIONS.pickup.title);
  const [destination, setDestination] = useState(DEFAULT_LOCATIONS.destination.title);
  const [selectedTier, setSelectedTier] = useState(RIDE_TIERS[0]);
  const [activeRide, setActiveRide] = useState(() => rideService.getActiveRide());
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [searchType, setSearchType] = useState('destination'); // 'pickup' | 'destination'

  // Sync active ride changes
  const updateRide = (updates) => {
    const updated = rideService.setActiveRide(updates);
    setActiveRide(updated);
    return updated;
  };

  const requestNewRide = async () => {
    const ride = await rideService.requestRide({
      pickup,
      destination,
      tier: selectedTier,
      fare: selectedTier.price
    });
    setActiveRide(ride);
    return ride;
  };

  const startAIMatching = async () => {
    updateRide({ status: 'MATCHING' });
    const matched = await rideService.simulateDriverMatch();
    setActiveRide(matched);
    return matched;
  };

  const cancelActiveRide = (reason) => {
    const record = rideService.cancelRide(reason);
    setActiveRide({ ...activeRide, status: 'CANCELLED' });
    return record;
  };

  const completeActiveRide = (rating, feedback) => {
    const record = rideService.completeRide(rating, feedback);
    setActiveRide({ ...activeRide, status: 'COMPLETED' });
    return record;
  };

  const resetRide = () => {
    const reset = rideService.resetActiveRide();
    setActiveRide(reset);
  };

  return (
    <RideContext.Provider
      value={{
        pickup,
        setPickup,
        destination,
        setDestination,
        selectedTier,
        setSelectedTier,
        activeRide,
        updateRide,
        requestNewRide,
        startAIMatching,
        cancelActiveRide,
        completeActiveRide,
        resetRide,
        isSearchingLocation,
        setIsSearchingLocation,
        searchType,
        setSearchType
      }}
    >
      {children}
    </RideContext.Provider>
  );
}

export function useRide() {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error('useRide must be used within a RideProvider');
  }
  return context;
}
