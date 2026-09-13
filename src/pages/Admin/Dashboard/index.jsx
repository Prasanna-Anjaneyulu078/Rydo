import React, { useState } from 'react';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import Map from '../../../components/Map/index.jsx';
import Button from '../../../components/Button/index.jsx';
import { adminService } from '../../../services/adminService.js';
import './index.css';

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(() => adminService.getPlatformMetrics());
  const [liveRides, setLiveRides] = useState(() => adminService.getLiveRides());
  const [surgeMultiplier, setSurgeMultiplier] = useState(metrics.surgeMultiplier);

  const handleUpdateSurge = (delta) => {
    const next = Math.max(1.0, +(surgeMultiplier + delta).toFixed(1));
    setSurgeMultiplier(next);
  };

  return (
    <div className="rydo-admin-dashboard-page">
      <Header title="Rydo Admin Intelligence" />

      <main className="rydo-admin-content">
        <div className="rydo-admin-container">
          {/* Header Row */}
          <div className="rydo-admin-title-row">
            <div>
              <h1 className="rydo-admin-title">Fleet & Dispatch Command</h1>
              <p className="rydo-admin-sub">Real-time telemetry, AI dynamic pricing & active network operations</p>
            </div>

            <div className="rydo-admin-surge-control">
              <span className="rydo-surge-label">Network Surge Level:</span>
              <div className="rydo-surge-stepper">
                <button type="button" onClick={() => handleUpdateSurge(-0.1)}>-</button>
                <span className="rydo-surge-value">{surgeMultiplier}x</span>
                <button type="button" onClick={() => handleUpdateSurge(0.1)}>+</button>
              </div>
            </div>
          </div>

          {/* Metric KPI Cards Grid */}
          <div className="rydo-admin-kpi-grid">
            <div className="rydo-kpi-card">
              <div className="rydo-kpi-top">
                <span className="rydo-kpi-title">Active Rides Now</span>
                <span className="material-symbols-outlined rydo-kpi-icon blue">directions_car</span>
              </div>
              <span className="rydo-kpi-number">{metrics.activeRides}</span>
              <div className="rydo-kpi-footer">
                <span className="rydo-kpi-trend positive">↑ 14%</span>
                <span className="rydo-kpi-meta">vs last hour</span>
              </div>
            </div>

            <div className="rydo-kpi-card">
              <div className="rydo-kpi-top">
                <span className="rydo-kpi-title">Active Online Drivers</span>
                <span className="material-symbols-outlined rydo-kpi-icon teal">local_taxi</span>
              </div>
              <span className="rydo-kpi-number">{metrics.activeDrivers}</span>
              <div className="rydo-kpi-footer">
                <span className="rydo-kpi-meta">Across 4 metro zones</span>
              </div>
            </div>

            <div className="rydo-kpi-card">
              <div className="rydo-kpi-top">
                <span className="rydo-kpi-title">Today's Gross Booking</span>
                <span className="material-symbols-outlined rydo-kpi-icon green">payments</span>
              </div>
              <span className="rydo-kpi-number">₹{metrics.todayRevenue.toLocaleString()}</span>
              <div className="rydo-kpi-footer">
                <span className="rydo-kpi-trend positive">↑ 18.2%</span>
                <span className="rydo-kpi-meta">Daily Target: ₹5L</span>
              </div>
            </div>

            <div className="rydo-kpi-card">
              <div className="rydo-kpi-top">
                <span className="rydo-kpi-title">AI Match Acceptance</span>
                <span className="material-symbols-outlined rydo-kpi-icon purple">auto_awesome</span>
              </div>
              <span className="rydo-kpi-number">{metrics.aiMatchRate}</span>
              <div className="rydo-kpi-footer">
                <span className="rydo-kpi-meta">Avg dispatch: 1.8s</span>
              </div>
            </div>
          </div>

          {/* Network Map & Live Telemetry Layout */}
          <div className="rydo-admin-split-grid">
            {/* Live Map Panel */}
            <div className="rydo-admin-map-card">
              <div className="rydo-admin-card-header">
                <div className="rydo-admin-header-text">
                  <h3 className="rydo-admin-card-title">Metro Fleet Telemetry</h3>
                  <p className="rydo-admin-card-sub">Tracking real-time vehicle coordinates & congestion corridors</p>
                </div>
                <span className="rydo-admin-live-pulse">
                  <span className="pulse-dot"></span> LIVE DISPATCH
                </span>
              </div>
              <div className="rydo-admin-map-box">
                <Map
                  mode="admin"
                  pickupText="Financial District (Indiranagar Hub)"
                  destinationText="Mission Bay / Koramangala Hub"
                  etaText="1.4x Surge Active"
                  showRoute={true}
                  driverMoving={true}
                />
              </div>
            </div>

            {/* AI Optimization & Traffic Index */}
            <div className="rydo-admin-insights-card">
              <h3 className="rydo-admin-card-title">AI Engine Insights</h3>
              <div className="rydo-insights-list">
                <div className="rydo-insight-row">
                  <div className="rydo-insight-icon-wrap">
                    <span className="material-symbols-outlined">traffic</span>
                  </div>
                  <div className="rydo-insight-info">
                    <span className="rydo-insight-title">City Congestion Index</span>
                    <span className="rydo-insight-val">Moderate (38% flow reduction)</span>
                  </div>
                  <span className="rydo-insight-badge yellow">Level 2</span>
                </div>

                <div className="rydo-insight-row">
                  <div className="rydo-insight-icon-wrap">
                    <span className="material-symbols-outlined">bolt</span>
                  </div>
                  <div className="rydo-insight-info">
                    <span className="rydo-insight-title">Predictive Demand Spike</span>
                    <span className="rydo-insight-val">Indiranagar 100ft: +180 rides expected in 30 min</span>
                  </div>
                  <span className="rydo-insight-badge green">Auto-Rerouting</span>
                </div>

                <div className="rydo-insight-row">
                  <div className="rydo-insight-icon-wrap">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div className="rydo-insight-info">
                    <span className="rydo-insight-title">Safety Telemetry Audits</span>
                    <span className="rydo-insight-val">0 active SOS alerts • 100% telemetry verified</span>
                  </div>
                  <span className="rydo-insight-badge green">Optimal</span>
                </div>
              </div>

              <div className="rydo-admin-zones-table">
                <h4 className="rydo-zones-title">Demand By Metro Clusters</h4>
                <div className="rydo-zone-row">
                  <span>Downtown Tech Park</span>
                  <span className="rydo-zone-bar"><span style={{ width: '85%' }}></span></span>
                  <strong>85% Cap</strong>
                </div>
                <div className="rydo-zone-row">
                  <span>Mission Bay Hub</span>
                  <span className="rydo-zone-bar"><span style={{ width: '70%' }}></span></span>
                  <strong>70% Cap</strong>
                </div>
                <div className="rydo-zone-row">
                  <span>Airport Express Corridor</span>
                  <span className="rydo-zone-bar"><span style={{ width: '92%' }}></span></span>
                  <strong>92% Cap</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Active Dispatches Table */}
          <div className="rydo-admin-table-card">
            <div className="rydo-admin-card-header">
              <div>
                <h3 className="rydo-admin-card-title">Live Dispatch Feed</h3>
                <p className="rydo-admin-card-sub">Real-time status of current and recent passenger bookings</p>
              </div>
            </div>

            <div className="rydo-table-responsive">
              <table className="rydo-admin-table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Rider</th>
                    <th>Driver</th>
                    <th>Pickup & Drop-off</th>
                    <th>Fare</th>
                    <th>Tier</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {liveRides.map((ride) => (
                    <tr key={ride.id}>
                      <td className="rydo-mono-cell">{ride.id}</td>
                      <td>
                        <span className="rydo-table-person">{ride.rider}</span>
                      </td>
                      <td>
                        <span className="rydo-table-person">{ride.driver}</span>
                      </td>
                      <td>
                        <div className="rydo-table-route">
                          <span className="rydo-table-point">P: {ride.pickup}</span>
                          <span className="rydo-table-point">D: {ride.destination}</span>
                        </div>
                      </td>
                      <td className="rydo-bold-fare">₹{ride.fare}</td>
                      <td>
                        <span className="rydo-tier-chip">{ride.tier}</span>
                      </td>
                      <td>
                        <span className={`rydo-status-pill ${ride.status.toLowerCase()}`}>
                          {ride.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation role="admin" />
    </div>
  );
}
