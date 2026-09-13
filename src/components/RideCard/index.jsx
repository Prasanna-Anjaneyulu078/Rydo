import React from 'react';
import './index.css';

export default function RideCard({
  tier,
  selected = false,
  onSelect,
  variant = 'tier', // 'tier' | 'history'
  rideData
}) {
  if (variant === 'history' && rideData) {
    const isCompleted = rideData.status?.toLowerCase() === 'completed';
    return (
      <div className="rydo-ride-history-card">
        <div className="rydo-rh-header">
          <div className="rydo-rh-meta">
            <span className="rydo-rh-date">{rideData.date}</span>
            <span className="rydo-rh-id">ID: {rideData.id}</span>
          </div>
          <span className={`rydo-rh-status ${isCompleted ? 'status-completed' : 'status-cancelled'}`}>
            {rideData.status}
          </span>
        </div>

        <div className="rydo-rh-route">
          <div className="rydo-rh-route-markers">
            <span className="rydo-dot rydo-dot-green"></span>
            <span className="rydo-rh-line"></span>
            <span className="rydo-dot rydo-dot-blue"></span>
          </div>
          <div className="rydo-rh-route-text">
            <div className="rydo-rh-spot">
              <span className="rydo-rh-spot-label">Pickup</span>
              <span className="rydo-rh-spot-val">{rideData.pickup}</span>
            </div>
            <div className="rydo-rh-spot">
              <span className="rydo-rh-spot-label">Drop-off</span>
              <span className="rydo-rh-spot-val">{rideData.destination}</span>
            </div>
          </div>
        </div>

        <div className="rydo-rh-footer">
          <div className="rydo-rh-tier-info">
            <span className="rydo-rh-tier-name">{rideData.tier || 'Rydo Standard'}</span>
            {rideData.driver && (
              <span className="rydo-rh-driver-name">• {rideData.driver.name}</span>
            )}
          </div>
          <div className="rydo-rh-fare">
            ₹{rideData.fare}
          </div>
        </div>
      </div>
    );
  }

  // Default: Tier selection card
  return (
    <div
      onClick={onSelect}
      className={`rydo-tier-card ${selected ? 'is-selected' : ''}`}
      role="button"
      tabIndex={0}
    >
      <div className="rydo-tier-left">
        <div className="rydo-tier-img-box">
          {tier.image ? (
            <img src={tier.image} alt={tier.name} className="rydo-tier-img" />
          ) : (
            <span className="material-symbols-outlined fill-icon rydo-tier-fallback-icon">
              {tier.icon || 'directions_car'}
            </span>
          )}
        </div>

        <div className="rydo-tier-details">
          <div className="rydo-tier-name-row">
            <span className="rydo-tier-title">{tier.name}</span>
            {tier.tag && (
              <span className={`rydo-tier-tag tag-${tier.tag.toLowerCase().replace(/\s+/g, '-')}`}>
                {tier.tag}
              </span>
            )}
          </div>

          <div className="rydo-tier-meta">
            <span className="rydo-tier-seats">
              <span className="material-symbols-outlined">person</span>
              {tier.seats}
            </span>
            <span className="rydo-tier-sep">•</span>
            <span className="rydo-tier-eta">{tier.eta}</span>
            <span className="rydo-tier-sep">•</span>
            <span className="rydo-tier-desc">{tier.description}</span>
          </div>
        </div>
      </div>

      <div className="rydo-tier-right">
        <div className="rydo-tier-price">₹{tier.price}</div>
        {tier.originalPrice && (
          <div className="rydo-tier-orig-price">₹{tier.originalPrice}</div>
        )}
      </div>
    </div>
  );
}
