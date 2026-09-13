import React, { useState } from 'react';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import Modal from '../../../components/Modal/index.jsx';
import Button from '../../../components/Button/index.jsx';
import { adminService } from '../../../services/adminService.js';
import './index.css';

export default function AdminRides() {
  const [rides] = useState(() => adminService.getAllRides());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRide, setSelectedRide] = useState(null);

  const filtered = rides.filter(r => {
    const riderName = typeof r.rider === 'string' ? r.rider : r.rider?.name || '';
    const driverName = typeof r.driver === 'string' ? r.driver : r.driver?.name || '';
    const matchesSearch = (r.id || '').toLowerCase().includes(search.toLowerCase()) ||
                          riderName.toLowerCase().includes(search.toLowerCase()) ||
                          driverName.toLowerCase().includes(search.toLowerCase()) ||
                          (r.pickup || '').toLowerCase().includes(search.toLowerCase()) ||
                          (r.destination || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || (r.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rydo-admin-rides-page">
      <Header title="Trip Dispatch Logs" />

      <main className="rydo-ar-content">
        <div className="rydo-ar-container">
          <div className="rydo-ar-header">
            <div>
              <h1 className="rydo-ar-title">Global Ride Records</h1>
              <p className="rydo-ar-sub">System-wide audit trail of all passenger bookings, fares and dispatch logs</p>
            </div>
          </div>

          {/* Search & Tabs */}
          <div className="rydo-ar-filter-row">
            <div className="rydo-ar-search-box">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search by Trip ID, rider, driver, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rydo-ar-search-input"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="rydo-ar-clear-btn">✕</button>
              )}
            </div>

            <div className="rydo-ar-status-tabs">
              {['all', 'completed', 'in_progress', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`rydo-ar-tab ${statusFilter === tab ? 'active' : ''}`}
                  onClick={() => setStatusFilter(tab)}
                >
                  {tab.replace('_', ' ').toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rydo-ar-table-card">
            <div className="rydo-table-responsive">
              <table className="rydo-admin-table">
                <thead>
                  <tr>
                    <th>Trip ID</th>
                    <th>Rider</th>
                    <th>Driver</th>
                    <th>Pickup & Destination</th>
                    <th>Vehicle Tier</th>
                    <th>Fare Amount</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((r) => (
                    <tr key={r.id}>
                      <td className="rydo-mono-cell">{r.id}</td>
                      <td><strong>{r.rider}</strong></td>
                      <td>{r.driver}</td>
                      <td>
                        <div className="rydo-table-route">
                          <span><strong>From:</strong> {r.pickup}</span>
                          <span><strong>To:</strong> {r.destination}</span>
                        </div>
                      </td>
                      <td><span className="rydo-tier-chip">{r.tier}</span></td>
                      <td className="rydo-bold-fare">₹{r.fare}</td>
                      <td>
                        <span className={`rydo-status-pill ${r.status.toLowerCase()}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="rydo-ar-view-btn"
                          onClick={() => setSelectedRide(r)}
                        >
                          View Audit
                        </button>
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

      {/* Ride Audit Modal */}
      <Modal
        isOpen={!!selectedRide}
        onClose={() => setSelectedRide(null)}
        title="Ride Dispatch Audit"
        maxWidth="520px"
      >
        {selectedRide && (
          <div className="rydo-ride-audit-modal">
            <div className="rydo-audit-badge-row">
              <span className="rydo-audit-id">{selectedRide.id}</span>
              <span className={`rydo-status-pill ${selectedRide.status.toLowerCase()}`}>
                {selectedRide.status}
              </span>
            </div>

            <div className="rydo-audit-grid">
              <div className="rydo-audit-item">
                <span className="label">Rider:</span>
                <span className="val">{selectedRide.rider}</span>
              </div>
              <div className="rydo-audit-item">
                <span className="label">Driver Partner:</span>
                <span className="val">{selectedRide.driver}</span>
              </div>
              <div className="rydo-audit-item">
                <span className="label">Vehicle Tier:</span>
                <span className="val">{selectedRide.tier}</span>
              </div>
              <div className="rydo-audit-item">
                <span className="label">Fare Total:</span>
                <span className="val fare">₹{selectedRide.fare}.00</span>
              </div>
            </div>

            <div className="rydo-audit-route-box">
              <div className="point">
                <span className="dot green"></span>
                <span><strong>Origin:</strong> {selectedRide.pickup}</span>
              </div>
              <div className="point">
                <span className="dot blue"></span>
                <span><strong>Destination:</strong> {selectedRide.destination}</span>
              </div>
            </div>

            <div className="rydo-audit-telemetry">
              <h4 className="title">AI Telemetry Log</h4>
              <p>Dispatch matched within 1.4 seconds. Optimal non-toll route chosen with 12% reduced traffic latency.</p>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick={() => setSelectedRide(null)}
            >
              Close Record
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
