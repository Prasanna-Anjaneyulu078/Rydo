import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import Map from '../../../components/Map/index.jsx';
import Button from '../../../components/Button/index.jsx';
import { driverService } from '../../../services/driverService.js';
import { ASSETS } from '../../../constants/assets.js';
import './index.css';

export default function DriverDashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [driverProfile, setDriverProfile] = useState(() => driverService.getDriverProfile());
  const [shiftStats, setShiftStats] = useState(() => driverService.getShiftStats());
  const [incomingRequest, setIncomingRequest] = useState(() => driverService.getIncomingRequest());
  const [countdown, setCountdown] = useState(12);
  const [activeRideNotification, setActiveRideNotification] = useState(null);

  // Countdown timer for incoming request
  useEffect(() => {
    if (!incomingRequest || !isOnline) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Expire and hide or restart demo request
          setIncomingRequest(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [incomingRequest, isOnline]);

  const toggleOnline = () => {
    const next = !isOnline;
    setIsOnline(next);
    if (!next) {
      setIncomingRequest(null);
    } else {
      setCountdown(12);
      setIncomingRequest(driverService.getIncomingRequest());
    }
  };

  const handleAccept = async () => {
    if (!incomingRequest) return;
    await driverService.acceptRide(incomingRequest.id);
    setActiveRideNotification(`Ride accepted! Navigate to ${incomingRequest.pickup.title}`);
    setIncomingRequest(null);
  };

  const handleDecline = async () => {
    if (!incomingRequest) return;
    await driverService.declineRide(incomingRequest.id);
    setIncomingRequest(null);
  };

  return (
    <div className="rydo-driver-cockpit-page">
      <Header title="Driver Cockpit" />

      <main className="rydo-driver-cockpit-content">
        {/* Top Shift Metrics & Online Toggle Bar */}
        <div className="rydo-driver-top-bar">
          <div className="rydo-driver-top-container">
            {/* Online Status Toggle */}
            <div className="rydo-driver-status-toggle">
              <button
                type="button"
                className={`rydo-online-btn ${isOnline ? 'online' : 'offline'}`}
                onClick={toggleOnline}
              >
                <span className="rydo-driver-pulse-dot"></span>
                <span>{isOnline ? 'YOU ARE ONLINE' : 'YOU ARE OFFLINE'}</span>
              </button>
              <span className="rydo-driver-vehicle-tag">
                {driverProfile.vehiclePlate} • {driverProfile.fuelLevel}
              </span>
            </div>

            {/* Shift Metrics Grid */}
            <div className="rydo-driver-stats-strip">
              <div className="rydo-driver-stat-pill">
                <span className="rydo-stat-label">Today's Net</span>
                <span className="rydo-stat-val">₹{shiftStats.todayNet}</span>
              </div>
              <div className="rydo-driver-stat-pill">
                <span className="rydo-stat-label">Completed</span>
                <span className="rydo-stat-val">{shiftStats.completedTrips} trips</span>
              </div>
              <div className="rydo-driver-stat-pill">
                <span className="rydo-stat-label">Acceptance</span>
                <span className="rydo-stat-val">{shiftStats.acceptanceRate}</span>
              </div>
              <div className="rydo-driver-stat-pill">
                <span className="rydo-stat-label">Rating</span>
                <span className="rydo-stat-val">★ {shiftStats.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Viewport */}
        <div className="rydo-driver-map-wrapper">
          <Map
            mode="driver"
            pickupText="1.1 km to Pickup (Indiranagar 100ft Rd)"
            destinationText="Drop-off: Koramangala 5th Block"
            etaText="3 min pickup ETA"
            showRoute={true}
          />

          {/* Surge Hotspots Overlay Card */}
          <div className="rydo-driver-hotspots-card">
            <div className="rydo-hotspots-header">
              <span className="material-symbols-outlined fill-icon">local_fire_department</span>
              <span>High Demand Hotspots</span>
            </div>
            <div className="rydo-hotspots-list">
              <div className="rydo-hotspot-item">
                <span className="rydo-hotspot-name">Indiranagar 100ft Hub</span>
                <span className="rydo-hotspot-surge">1.4x Surge</span>
              </div>
              <div className="rydo-hotspot-item">
                <span className="rydo-hotspot-name">Koramangala Sony Signal</span>
                <span className="rydo-hotspot-surge">1.3x Surge</span>
              </div>
              <div className="rydo-hotspot-item">
                <span className="rydo-hotspot-name">Airport Corridor Express</span>
                <span className="rydo-hotspot-surge">+₹120 Queued</span>
              </div>
            </div>
          </div>

          {/* Accepted Notification Alert */}
          {activeRideNotification && (
            <div className="rydo-driver-accepted-banner">
              <span className="material-symbols-outlined">navigation</span>
              <span>{activeRideNotification}</span>
              <button 
                type="button" 
                className="rydo-banner-close"
                onClick={() => setActiveRideNotification(null)}
              >
                ✕
              </button>
            </div>
          )}

          {/* Incoming Ride Request Modal Overlay (As shown in Stitch Image 3.png) */}
          {incomingRequest && isOnline && (
            <div className="rydo-driver-request-overlay">
              <div className="rydo-driver-request-modal">
                {/* Header with Countdown */}
                <div className="rydo-request-modal-header">
                  <div className="rydo-request-badge">
                    <span className="rydo-beacon-pulse">
                      <span className="rydo-beacon-ping"></span>
                      <span className="rydo-beacon-dot"></span>
                    </span>
                    <span>NEW RIDE REQUEST</span>
                  </div>

                  <div className="rydo-request-countdown-badge">
                    <span>{countdown}s</span>
                  </div>
                </div>

                {/* Rider Info Row */}
                <div className="rydo-request-rider-row">
                  <div className="rydo-request-rider-avatar-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                      alt={incomingRequest.rider.name}
                      className="rydo-request-rider-avatar"
                    />
                    <span className="rydo-rider-verified-tick">✓</span>
                  </div>

                  <div className="rydo-request-rider-text">
                    <div className="rydo-request-name-line">
                      <span className="rydo-request-rider-name">{incomingRequest.rider.name}</span>
                      <span className="rydo-request-prime-badge">{incomingRequest.rider.badge}</span>
                    </div>
                    <div className="rydo-request-rider-meta">
                      <span>★ {incomingRequest.rider.rating}</span>
                      <span>•</span>
                      <span>{incomingRequest.rider.ridesCompleted}</span>
                    </div>
                  </div>
                </div>

                {/* Fare Highlight */}
                <div className="rydo-request-fare-block">
                  <div className="rydo-request-fare-left">
                    <span className="rydo-request-fare-label">Guaranteed Payout</span>
                    <span className="rydo-request-fare-value">₹{incomingRequest.fare}</span>
                  </div>
                  <div className="rydo-request-surge-tag">
                    <span className="material-symbols-outlined">bolt</span>
                    <span>+₹{incomingRequest.aiSurge} Surge</span>
                  </div>
                </div>

                {/* Route Details */}
                <div className="rydo-request-route-container">
                  <div className="rydo-request-route-line">
                    <span className="rydo-dot rydo-dot-green"></span>
                    <span className="rydo-route-stem"></span>
                    <span className="rydo-dot rydo-dot-blue"></span>
                  </div>

                  <div className="rydo-request-route-info">
                    <div className="rydo-request-spot">
                      <div className="rydo-request-spot-header">
                        <span className="rydo-request-spot-title">{incomingRequest.pickup.title}</span>
                        <span className="rydo-request-eta-tag">{incomingRequest.pickup.eta}</span>
                      </div>
                      <span className="rydo-request-spot-sub">{incomingRequest.pickup.subtitle}</span>
                    </div>

                    <div className="rydo-request-route-sep"></div>

                    <div className="rydo-request-spot">
                      <div className="rydo-request-spot-header">
                        <span className="rydo-request-spot-title">{incomingRequest.dropoff.title}</span>
                        <span className="rydo-request-eta-tag">{incomingRequest.dropoff.eta}</span>
                      </div>
                      <span className="rydo-request-spot-sub">{incomingRequest.dropoff.subtitle}</span>
                    </div>
                  </div>
                </div>

                {/* Countdown progress line */}
                <div className="rydo-countdown-track">
                  <div
                    className="rydo-countdown-fill"
                    style={{ width: `${(countdown / 12) * 100}%` }}
                  ></div>
                </div>

                {/* Decline & Accept Buttons */}
                <div className="rydo-request-actions-grid">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleDecline}
                  >
                    Decline
                  </Button>

                  <Button
                    variant="ai"
                    size="lg"
                    onClick={handleAccept}
                    icon="check"
                  >
                    Accept Ride (₹{incomingRequest.fare})
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Trigger Demo Request Button if expired */}
          {!incomingRequest && isOnline && (
            <button
              type="button"
              className="rydo-trigger-demo-request-btn"
              onClick={() => {
                setCountdown(12);
                setIncomingRequest(driverService.getIncomingRequest());
              }}
            >
              <span className="material-symbols-outlined">refresh</span>
              <span>Simulate New Ride Dispatch</span>
            </button>
          )}
        </div>
      </main>

      <BottomNavigation role="driver" />
    </div>
  );
}
