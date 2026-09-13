import React from 'react';
import './index.css';

export default function RideStatus({
  status = 'Driver Arriving',
  eta = '3 mins',
  distance = '0.8 km',
  tag = 'ON TIME',
  pickup,
  destination,
  fare,
  paymentStatus = 'UPI Paid'
}) {
  return (
    <div className="rydo-status-container">
      {/* ETA & Distance Status Banner */}
      <div className="rydo-status-banner">
        <div className="rydo-status-info">
          <span className="rydo-status-pulse">
            <span className="rydo-status-ping"></span>
            <span className="rydo-status-dot"></span>
          </span>
          <p className="rydo-status-text">
            {status} in <strong className="rydo-status-highlight">{eta}</strong>{' '}
            <span className="rydo-status-sub">({distance})</span>
          </p>
        </div>
        {tag && <span className="rydo-status-badge">{tag}</span>}
      </div>

      {/* Origin & Destination Summary */}
      {(pickup || destination) && (
        <div className="rydo-status-route-card">
          <div className="rydo-status-route-line">
            <span className="rydo-dot rydo-dot-blue"></span>
            <span className="rydo-route-stem"></span>
            <span className="rydo-dot rydo-dot-dest"></span>
          </div>

          <div className="rydo-status-route-details">
            {pickup && (
              <div className="rydo-status-point">
                <span className="rydo-point-label">Pickup</span>
                <span className="rydo-point-val">{pickup}</span>
              </div>
            )}
            {destination && (
              <div className="rydo-status-point">
                <span className="rydo-point-label">Drop-off</span>
                <span className="rydo-point-val">{destination}</span>
              </div>
            )}
          </div>

          {fare && (
            <div className="rydo-status-fare-badge">
              <span className="rydo-status-fare-amount">₹{fare}</span>
              <span className="rydo-status-paid-tag">
                <span className="material-symbols-outlined">check_circle</span>
                {paymentStatus}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
