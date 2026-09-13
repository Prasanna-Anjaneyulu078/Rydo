import React from 'react';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import { driverService } from '../../../services/driverService.js';
import './index.css';

export default function DriverRides() {
  const rides = driverService.getDriverHistory();

  return (
    <div className="rydo-driver-history-page">
      <Header title="Driver Shift History" />

      <main className="rydo-driver-history-content">
        <div className="rydo-driver-history-container">
          <div className="rydo-driver-history-header">
            <h1 className="rydo-dh-title">Trips & Earnings</h1>
            <p className="rydo-dh-sub">Summary of your completed dispatches and payouts</p>
          </div>

          {/* Earnings summary card */}
          <div className="rydo-dh-summary-card">
            <div className="rydo-dh-summary-item">
              <span className="rydo-dh-summary-label">Today's Net Payout</span>
              <span className="rydo-dh-summary-val highlight">₹1,840.00</span>
            </div>
            <div className="rydo-dh-summary-divider"></div>
            <div className="rydo-dh-summary-item">
              <span className="rydo-dh-summary-label">Trips Completed</span>
              <span className="rydo-dh-summary-val">8 trips</span>
            </div>
            <div className="rydo-dh-summary-divider"></div>
            <div className="rydo-dh-summary-item">
              <span className="rydo-dh-summary-label">Online Hours</span>
              <span className="rydo-dh-summary-val">5h 42m</span>
            </div>
          </div>

          {/* Trips list */}
          <div className="rydo-dh-list">
            <h2 className="rydo-dh-section-title">Completed Trips</h2>
            {rides.map((ride) => (
              <div key={ride.id} className="rydo-dh-card">
                <div className="rydo-dh-card-top">
                  <div className="rydo-dh-rider-info">
                    <span className="material-symbols-outlined">person</span>
                    <span className="rydo-dh-rider-name">{ride.rider || 'Rider'}</span>
                    <span className="rydo-dh-dot">•</span>
                    <span className="rydo-dh-time">{ride.date}</span>
                  </div>
                  <span className="rydo-dh-earning">+₹{ride.earnings}</span>
                </div>

                <div className="rydo-dh-route-box">
                  <div className="rydo-dh-spot">
                    <span className="rydo-dh-point-tag green">P</span>
                    <span className="rydo-dh-spot-text">{ride.pickup}</span>
                  </div>
                  <div className="rydo-dh-spot">
                    <span className="rydo-dh-point-tag blue">D</span>
                    <span className="rydo-dh-spot-text">{ride.destination}</span>
                  </div>
                </div>

                <div className="rydo-dh-card-footer">
                  <span>Trip Fare: ₹{ride.fare}</span>
                  <span>{ride.distance} • {ride.duration}</span>
                  <span className="rydo-dh-paid-tag">Paid Digital</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNavigation role="driver" />
    </div>
  );
}
