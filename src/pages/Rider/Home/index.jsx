import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import BottomSheet from '../../../components/BottomSheet/index.jsx';
import Map from '../../../components/Map/index.jsx';
import RideCard from '../../../components/RideCard/index.jsx';
import Button from '../../../components/Button/index.jsx';
import Modal from '../../../components/Modal/index.jsx';
import LocationSearch from '../../../components/LocationSearch/index.jsx';
import { useRide } from '../../../context/RideContext.jsx';
import { RIDE_TIERS } from '../../../constants/mockRides.js';
import './index.css';

export default function RiderHome() {
  const navigate = useNavigate();
  const {
    pickup,
    setPickup,
    destination,
    setDestination,
    selectedTier,
    setSelectedTier,
    requestNewRide
  } = useRide();

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [promoApplied, setPromoApplied] = useState(true);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Cash / UPI (•••• 8821)');

  const handleBookRide = async () => {
    await requestNewRide();
    navigate('/rider/matching');
  };

  const finalPrice = promoApplied && selectedTier.price > 100 
    ? Math.round(selectedTier.price * 0.85) 
    : selectedTier.price;

  return (
    <div className="rydo-rider-home-page">
      <Header />

      <main className="rydo-rider-home-content">
        {/* Left Ride Selection Rail */}
        <aside className="rydo-ride-panel">
          <div className="rydo-ride-panel-inner">
            {/* Header & Subtitle */}
            <div className="rydo-panel-header">
              <h1 className="rydo-panel-title">Choose your ride</h1>
              <p className="rydo-panel-sub">AI-optimized routes & driver matching</p>
            </div>

            {/* Route Summary Box with Quick Edit */}
            <div 
              className="rydo-route-selector-box"
              onClick={() => setSearchModalOpen(true)}
              role="button"
              tabIndex={0}
            >
              <div className="rydo-route-selector-line">
                <span className="rydo-dot rydo-dot-green"></span>
                <span className="rydo-route-stem"></span>
                <span className="rydo-dot rydo-dot-blue"></span>
              </div>

              <div className="rydo-route-selector-inputs">
                <div className="rydo-route-spot">
                  <span className="rydo-spot-label">PICKUP</span>
                  <span className="rydo-spot-text">{pickup}</span>
                </div>
                <div className="rydo-route-divider"></div>
                <div className="rydo-route-spot">
                  <span className="rydo-spot-label">DROP-OFF</span>
                  <span className="rydo-spot-text">{destination}</span>
                </div>
              </div>

              <button 
                type="button" 
                className="rydo-route-edit-btn"
                onClick={(e) => { e.stopPropagation(); setSearchModalOpen(true); }}
                title="Change pickup or drop-off"
              >
                <span className="material-symbols-outlined">edit_location_alt</span>
              </button>
            </div>

            {/* Available Vehicle Tiers */}
            <div className="rydo-tiers-list-container">
              <div className="rydo-tiers-list-header">
                <span className="rydo-tiers-count">Available Rydo Options</span>
                <span className="rydo-tiers-badge">Real-Time Dispatch</span>
              </div>

              <div className="rydo-tiers-list">
                {RIDE_TIERS.map((tier) => (
                  <RideCard
                    key={tier.id}
                    tier={tier}
                    selected={selectedTier.id === tier.id}
                    onSelect={() => setSelectedTier(tier)}
                  />
                ))}
              </div>
            </div>

            {/* Promo & Discounts */}
            <div className="rydo-promo-strip">
              <div className="rydo-promo-left">
                <span className="material-symbols-outlined rydo-promo-icon">local_offer</span>
                <div className="rydo-promo-text">
                  <span className="rydo-promo-code">SAVE20</span>
                  <span className="rydo-promo-desc">
                    {promoApplied ? '• 15% Smart Surge Discount applied' : 'Coupon available'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="rydo-promo-toggle"
                onClick={() => setPromoApplied(!promoApplied)}
              >
                {promoApplied ? 'Remove' : 'Apply'}
              </button>
            </div>

            {/* Payment & Primary CTA */}
            <div className="rydo-booking-footer">
              <div className="rydo-payment-selector" onClick={() => setPaymentModalOpen(true)}>
                <div className="rydo-payment-info">
                  <span className="material-symbols-outlined rydo-payment-icon">account_balance_wallet</span>
                  <span className="rydo-payment-text">{selectedPayment}</span>
                </div>
                <button type="button" className="rydo-payment-change-btn">
                  Change
                </button>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={selectedTier.icon || 'directions_car'}
                onClick={handleBookRide}
                className="rydo-book-cta-btn"
              >
                Book {selectedTier.name} • ₹{finalPrice}
              </Button>
            </div>
          </div>
        </aside>

        {/* Right Interactive Map Viewport */}
        <section className="rydo-map-panel">
          <Map
            mode="rider"
            pickupText={`Pickup: ${pickup.split(',')[0]}`}
            destinationText={destination.split(',')[0]}
            etaText="18 min • 5.2 km"
            showRoute={true}
          />
        </section>
      </main>

      {/* Mobile Bottom Sheet (Appears on small screens) */}
      <div className="rydo-mobile-sheet-wrapper">
        <BottomSheet title="Choose your ride" subtitle="AI-optimized dispatch ready">
          <div 
            className="rydo-mobile-route-pill" 
            onClick={() => setSearchModalOpen(true)}
          >
            <div className="rydo-mobile-route-text">
              <span className="material-symbols-outlined">navigation</span>
              <span className="rydo-mobile-dest-text">{destination}</span>
            </div>
            <span className="rydo-mobile-route-edit">Edit</span>
          </div>

          <div className="rydo-mobile-tiers">
            {RIDE_TIERS.map((tier) => (
              <RideCard
                key={tier.id}
                tier={tier}
                selected={selectedTier.id === tier.id}
                onSelect={() => setSelectedTier(tier)}
              />
            ))}
          </div>

          <div className="rydo-mobile-booking-bar">
            <div className="rydo-mobile-payment-pill" onClick={() => setPaymentModalOpen(true)}>
              <span className="material-symbols-outlined">payments</span>
              <span>UPI / Cash</span>
            </div>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleBookRide}
            >
              Book {selectedTier.name} • ₹{finalPrice}
            </Button>
          </div>
        </BottomSheet>
      </div>

      <BottomNavigation role="rider" />

      {/* Location Search Modal */}
      <Modal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        title="Edit Route"
        maxWidth="520px"
      >
        <LocationSearch
          pickup={pickup}
          destination={destination}
          onPickupChange={setPickup}
          onDestinationChange={setDestination}
          onSelectLocation={(loc) => {
            setDestination(loc);
            setSearchModalOpen(false);
          }}
          onClose={() => setSearchModalOpen(false)}
        />
      </Modal>

      {/* Payment Selection Modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Select Payment Method"
        maxWidth="440px"
      >
        <div className="rydo-payment-options-list">
          {[
            { id: 'upi', name: 'Cash / UPI (•••• 8821)', icon: 'account_balance', sub: 'Instant payment via GPay/PhonePe' },
            { id: 'card', name: 'Credit / Debit Card (Visa •••• 4242)', icon: 'credit_card', sub: 'Auto-charged upon trip completion' },
            { id: 'cash', name: 'Direct Cash to Driver', icon: 'payments', sub: 'Pay exact fare after destination arrival' },
            { id: 'wallet', name: 'Rydo Mobility Wallet (₹480)', icon: 'wallet', sub: '1-click seamless checkout' }
          ].map((method) => (
            <div
              key={method.id}
              className={`rydo-payment-option-card ${selectedPayment.includes(method.id) ? 'selected' : ''}`}
              onClick={() => {
                setSelectedPayment(method.name);
                setPaymentModalOpen(false);
              }}
            >
              <div className="rydo-payment-opt-icon">
                <span className="material-symbols-outlined">{method.icon}</span>
              </div>
              <div className="rydo-payment-opt-info">
                <span className="rydo-payment-opt-name">{method.name}</span>
                <span className="rydo-payment-opt-sub">{method.sub}</span>
              </div>
              <span className="material-symbols-outlined rydo-payment-radio">
                {selectedPayment === method.name ? 'radio_button_checked' : 'radio_button_unchecked'}
              </span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}
