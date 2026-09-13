import React from 'react';
import Button from '../Button/index.jsx';
import { ASSETS } from '../../constants/assets.js';
import './index.css';

export default function DriverCard({
  driver,
  safetyPin = '5912',
  onCall,
  onMessage,
  showActions = true,
  showAiNote = true,
  className = ''
}) {
  const defaultDriver = {
    name: 'Rahul Sharma',
    rating: 4.9,
    tripsCount: 1420,
    vehicleName: 'White Hyundai i20',
    vehiclePlate: 'KA 01 MJ 4821',
    avatar: ASSETS.driverAvatar
  };

  const current = driver || defaultDriver;

  return (
    <div className={`rydo-driver-card-wrapper ${className}`}>
      {/* Driver info block */}
      <div className="rydo-driver-card">
        <div className="rydo-driver-top">
          {/* Avatar and Info */}
          <div className="rydo-driver-meta">
            <div className="rydo-driver-avatar-box">
              <img
                src={current.avatar || ASSETS.driverAvatar}
                alt={current.name}
                className="rydo-driver-photo"
              />
              <div className="rydo-driver-verified-badge" title="Verified Driver Partner">
                <span className="material-symbols-outlined fill-icon">verified</span>
              </div>
            </div>

            <div className="rydo-driver-text">
              <h3 className="rydo-driver-name">{current.name}</h3>
              <div className="rydo-driver-rating">
                <span className="material-symbols-outlined fill-icon rydo-star-icon">star</span>
                <span className="rydo-rating-val">{current.rating}</span>
                <span className="rydo-trips-count">({current.tripsCount || 1420} trips)</span>
              </div>
            </div>
          </div>

          {/* Safety PIN */}
          {safetyPin && (
            <div className="rydo-safety-pin-container">
              <span className="rydo-pin-label">Safety PIN</span>
              <div className="rydo-pin-box">
                <span className="rydo-pin-code">{safetyPin}</span>
              </div>
            </div>
          )}
        </div>

        {/* Vehicle row */}
        <div className="rydo-driver-vehicle-row">
          <div className="rydo-vehicle-name">
            <span className="material-symbols-outlined">directions_car</span>
            <span>{current.vehicleName || 'White Hyundai i20'}</span>
          </div>
          <div className="rydo-vehicle-plate">
            {current.vehiclePlate || 'KA 01 MJ 4821'}
          </div>
        </div>
      </div>

      {/* Call & Message Actions */}
      {showActions && (
        <div className="rydo-driver-action-grid">
          <Button
            variant="primary"
            icon="call"
            onClick={onCall || (() => alert(`Calling ${current.name} at +91 98450 31289...`))}
          >
            Call Driver
          </Button>
          <Button
            variant="secondary"
            icon="chat_bubble"
            onClick={onMessage || (() => alert(`Opening encrypted chat with ${current.name}...`))}
          >
            Message
          </Button>
        </div>
      )}

      {/* AI Dispatch note */}
      {showAiNote && (
        <div className="rydo-driver-ai-note">
          <span className="material-symbols-outlined fill-icon rydo-ai-note-icon">insights</span>
          <p className="rydo-ai-note-text">
            <strong>Matched by Rydo AI:</strong> Optimal proximity, 99.2% acceptance rate, and low congestion corridor.
          </p>
        </div>
      )}
    </div>
  );
}
