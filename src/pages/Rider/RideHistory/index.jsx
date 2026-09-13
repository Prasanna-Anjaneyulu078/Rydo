import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import RideCard from '../../../components/RideCard/index.jsx';
import Button from '../../../components/Button/index.jsx';
import Modal from '../../../components/Modal/index.jsx';
import { riderService } from '../../../services/riderService.js';
import './index.css';

export default function RideHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'completed' | 'cancelled'
  const [rides, setRides] = useState(() => riderService.getRideHistory());
  const [selectedRide, setSelectedRide] = useState(null);

  const filteredRides = rides.filter(ride => {
    if (filter === 'all') return true;
    return ride.status?.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="rydo-history-page">
      <Header title="Your Rides" />

      <main className="rydo-history-content">
        <div className="rydo-history-container">
          <div className="rydo-history-header-row">
            <div>
              <h1 className="rydo-history-title">Ride History</h1>
              <p className="rydo-history-sub">Track all your past rides, receipts & invoices</p>
            </div>
            <Button
              variant="primary"
              icon="add"
              onClick={() => navigate('/rider')}
            >
              Book New Ride
            </Button>
          </div>

          {/* Filter Bar */}
          <div className="rydo-history-filter-bar">
            {['all', 'completed', 'cancelled'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`rydo-history-filter-pill ${filter === tab ? 'active' : ''}`}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* List of Rides */}
          <div className="rydo-history-list">
            {filteredRides.length > 0 ? (
              filteredRides.map((ride) => (
                <div 
                  key={ride.id} 
                  className="rydo-history-item-wrapper"
                  onClick={() => setSelectedRide(ride)}
                >
                  <RideCard
                    variant="history"
                    rideData={ride}
                  />
                </div>
              ))
            ) : (
              <div className="rydo-history-empty">
                <span className="material-symbols-outlined rydo-empty-icon">history</span>
                <h3>No rides found</h3>
                <p>You have not taken any rides matching this filter.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNavigation role="rider" />

      {/* Ride Receipt Modal */}
      <Modal
        isOpen={!!selectedRide}
        onClose={() => setSelectedRide(null)}
        title="Ride Receipt Details"
        maxWidth="480px"
      >
        {selectedRide && (
          <div className="rydo-receipt-modal-content">
            <div className="rydo-receipt-top">
              <span className="rydo-receipt-id">Trip ID: {selectedRide.id}</span>
              <span className="rydo-receipt-date">{selectedRide.date}</span>
            </div>

            <div className="rydo-receipt-fare-banner">
              <span className="rydo-receipt-fare-title">Fare Total</span>
              <span className="rydo-receipt-fare-val">₹{selectedRide.fare}.00</span>
            </div>

            <div className="rydo-receipt-details-list">
              <div className="rydo-receipt-row">
                <span className="rydo-receipt-label">Pickup Spot</span>
                <span className="rydo-receipt-val">{selectedRide.pickup}</span>
              </div>
              <div className="rydo-receipt-row">
                <span className="rydo-receipt-label">Drop-off Destination</span>
                <span className="rydo-receipt-val">{selectedRide.destination}</span>
              </div>
              <div className="rydo-receipt-row">
                <span className="rydo-receipt-label">Vehicle & Tier</span>
                <span className="rydo-receipt-val">{selectedRide.tier || 'Rydo Economy'}</span>
              </div>
              {selectedRide.driver && (
                <div className="rydo-receipt-row">
                  <span className="rydo-receipt-label">Driver Partner</span>
                  <span className="rydo-receipt-val">{selectedRide.driver.name}</span>
                </div>
              )}
              <div className="rydo-receipt-row">
                <span className="rydo-receipt-label">Trip Distance & Duration</span>
                <span className="rydo-receipt-val">{selectedRide.distance || '5.2 km'} • {selectedRide.duration || '18 mins'}</span>
              </div>
              <div className="rydo-receipt-row">
                <span className="rydo-receipt-label">Payment Status</span>
                <span className="rydo-receipt-val paid">Paid via UPI Auto-Debit</span>
              </div>
            </div>

            <div className="rydo-receipt-actions">
              <Button
                variant="outline"
                fullWidth
                icon="download"
                onClick={() => alert('Tax invoice PDF downloaded.')}
              >
                Download Invoice
              </Button>
              <Button
                variant="primary"
                fullWidth
                icon="refresh"
                onClick={() => {
                  setSelectedRide(null);
                  navigate('/rider');
                }}
              >
                Re-book Route
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
