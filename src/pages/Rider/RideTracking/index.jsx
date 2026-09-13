import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import BottomSheet from '../../../components/BottomSheet/index.jsx';
import Map from '../../../components/Map/index.jsx';
import RideStatus from '../../../components/RideStatus/index.jsx';
import DriverCard from '../../../components/DriverCard/index.jsx';
import Button from '../../../components/Button/index.jsx';
import Modal from '../../../components/Modal/index.jsx';
import { useRide } from '../../../context/RideContext.jsx';
import './index.css';

export default function RideTracking() {
  const navigate = useNavigate();
  const { activeRide, updateRide, cancelActiveRide } = useRide();
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const [tripStage, setTripStage] = useState('arriving'); // 'arriving' | 'arrived' | 'in_trip'

  const handleSimulateArrived = () => {
    setTripStage('arrived');
    updateRide({ status: 'DRIVER_ARRIVING', etaMinutes: 0 });
  };

  const handleSimulateStartTrip = () => {
    setTripStage('in_trip');
    updateRide({ status: 'RIDE_STARTED' });
  };

  const handleSimulateComplete = () => {
    navigate('/rider/completed');
  };

  const handleConfirmCancel = () => {
    cancelActiveRide('User cancelled ride');
    setCancelModalOpen(false);
    navigate('/rider');
  };

  const statusText = tripStage === 'arriving' 
    ? 'Driver Arriving'
    : tripStage === 'arrived'
    ? 'Driver Arrived at Pickup'
    : 'Trip in Progress to Destination';

  const etaDisplay = tripStage === 'arriving'
    ? '3 mins'
    : tripStage === 'arrived'
    ? 'Now'
    : '14 mins';

  const distanceDisplay = tripStage === 'arriving'
    ? '0.8 km'
    : tripStage === 'arrived'
    ? '0.0 km'
    : '4.2 km remaining';

  return (
    <div className="rydo-tracking-page">
      <Header title="Live Tracking" showBack={true} onBack={() => navigate('/rider')} />

      <main className="rydo-tracking-content">
        {/* Left Side Active Ride Control Column (Desktop) */}
        <aside className="rydo-tracking-sidebar">
          <div className="rydo-tracking-sidebar-inner">
            {/* Status Banner */}
            <RideStatus
              status={statusText}
              eta={etaDisplay}
              distance={distanceDisplay}
              tag={tripStage === 'arrived' ? 'AT PICKUP' : 'ON TIME'}
              pickup={activeRide.pickup}
              destination={activeRide.destination}
              fare={activeRide.fare}
            />

            {/* Driver Information Card */}
            <DriverCard
              driver={activeRide.driver}
              safetyPin={activeRide.safetyPin || '5912'}
              showActions={true}
              showAiNote={true}
            />

            {/* Safety & Trip Actions */}
            <div className="rydo-safety-actions-row">
              <button 
                type="button" 
                className="rydo-safety-pill"
                onClick={() => setShareModalOpen(true)}
              >
                <span className="material-symbols-outlined">share_location</span>
                <span>Share Trip</span>
              </button>

              <button 
                type="button" 
                className="rydo-safety-pill rydo-sos-pill"
                onClick={() => setSosModalOpen(true)}
              >
                <span className="material-symbols-outlined">emergency</span>
                <span>Safety SOS</span>
              </button>

              <button 
                type="button" 
                className="rydo-safety-pill"
                onClick={() => setCancelModalOpen(true)}
              >
                <span className="material-symbols-outlined">cancel</span>
                <span>Cancel</span>
              </button>
            </div>

            {/* Dev / Interactive Simulation Rail */}
            <div className="rydo-sim-controller">
              <div className="rydo-sim-header">
                <span className="material-symbols-outlined">sync</span>
                <span className="rydo-sim-title">Real-Time Simulation Controls</span>
              </div>
              <div className="rydo-sim-buttons">
                <Button
                  variant={tripStage === 'arriving' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTripStage('arriving')}
                >
                  1. Arriving
                </Button>
                <Button
                  variant={tripStage === 'arrived' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={handleSimulateArrived}
                >
                  2. Driver Arrived
                </Button>
                <Button
                  variant={tripStage === 'in_trip' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={handleSimulateStartTrip}
                >
                  3. In Trip
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  icon="check"
                  onClick={handleSimulateComplete}
                >
                  4. Complete Trip
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Dynamic Live Map */}
        <section className="rydo-tracking-map-col">
          <Map
            mode="tracking"
            pickupText={activeRide.pickup?.split(',')[0]}
            destinationText={activeRide.destination?.split(',')[0]}
            etaText={`${etaDisplay} • ${distanceDisplay}`}
            showRoute={true}
            driverMoving={true}
            driverPlate={activeRide.driver?.vehiclePlate || 'KA 01 MJ 4821'}
          />
        </section>
      </main>

      {/* Mobile Bottom Sheet Layout */}
      <div className="rydo-mobile-tracking-sheet">
        <BottomSheet>
          <RideStatus
            status={statusText}
            eta={etaDisplay}
            distance={distanceDisplay}
            tag="ON TIME"
          />

          <DriverCard
            driver={activeRide.driver}
            safetyPin={activeRide.safetyPin || '5912'}
            showAiNote={false}
          />

          <div className="rydo-mobile-sim-row">
            {tripStage !== 'in_trip' ? (
              <Button
                variant="primary"
                size="md"
                fullWidth
                onClick={handleSimulateStartTrip}
                icon="play_arrow"
              >
                Simulate: Board & Start Ride
              </Button>
            ) : (
              <Button
                variant="success"
                size="md"
                fullWidth
                onClick={handleSimulateComplete}
                icon="check"
              >
                Simulate: Complete Ride
              </Button>
            )}
          </div>
        </BottomSheet>
      </div>

      <BottomNavigation role="rider" />

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel This Ride?"
      >
        <p className="rydo-modal-text">
          Rahul is already en route and 3 minutes away. Cancelling now might incur a ₹25 cancellation fee.
        </p>
        <div className="rydo-modal-actions">
          <Button
            variant="outline"
            onClick={() => setCancelModalOpen(false)}
          >
            Keep Ride
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmCancel}
          >
            Yes, Cancel Ride
          </Button>
        </div>
      </Modal>

      {/* Share Trip Modal */}
      <Modal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Share Live Trip Status"
      >
        <p className="rydo-modal-text">
          Send your live GPS location, driver details, and estimated arrival time to trusted emergency contacts.
        </p>
        <div className="rydo-share-link-box">
          <input 
            type="text" 
            readOnly 
            value="https://rydo.io/track/RYD-98214?token=e91a0" 
            className="rydo-share-input" 
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => alert('Tracking link copied to clipboard!')}
          >
            Copy
          </Button>
        </div>
      </Modal>

      {/* Emergency SOS Modal */}
      <Modal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        title="Rydo Safety Shield SOS"
      >
        <div className="rydo-sos-content">
          <div className="rydo-sos-alert-icon">
            <span className="material-symbols-outlined">shield</span>
          </div>
          <h4 className="rydo-sos-heading">Need Emergency Assistance?</h4>
          <p className="rydo-modal-text">
            Triggering SOS immediately alerts the Rydo 24/7 Safety Command Center and shares your live coordinates with local police authorities.
          </p>
          <Button
            variant="danger"
            size="lg"
            fullWidth
            icon="emergency"
            onClick={() => {
              alert('Emergency dispatch notified. Rydo Safety Team is calling you immediately.');
              setSosModalOpen(false);
            }}
          >
            Call 112 & Rydo Emergency
          </Button>
        </div>
      </Modal>
    </div>
  );
}
