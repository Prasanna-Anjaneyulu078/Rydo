import React, { useState } from 'react';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import Button from '../../../components/Button/index.jsx';
import Modal from '../../../components/Modal/index.jsx';
import { adminService } from '../../../services/adminService.js';
import './index.css';

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState(() => adminService.getAllDrivers());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState(null);

  const toggleDriverStatus = (id, e) => {
    e.stopPropagation();
    setDrivers(prev => prev.map(d => {
      if (d.id === id) {
        const nextStatus = d.status === 'Active' ? 'Suspended' : 'Active';
        adminService.updateDriverStatus(id, nextStatus);
        return { ...d, status: nextStatus };
      }
      return d;
    }));
  };

  const filtered = drivers.filter(d => {
    const nameMatch = (d.name || '').toLowerCase().includes(search.toLowerCase());
    const plateMatch = (d.vehiclePlate || '').toLowerCase().includes(search.toLowerCase());
    const matchesSearch = nameMatch || plateMatch;
    const driverStatus = (d.status || 'Active').toLowerCase();
    const matchesStatus = statusFilter === 'all' || driverStatus === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="rydo-admin-drivers-page">
      <Header title="Driver Fleet Management" />

      <main className="rydo-ad-content">
        <div className="rydo-ad-container">
          <div className="rydo-ad-header">
            <div>
              <h1 className="rydo-ad-title">Driver Fleet Directory</h1>
              <p className="rydo-ad-sub">Manage verified driver partners, verification compliance & operational status</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="rydo-ad-filter-row">
            <div className="rydo-ad-search-box">
              <span className="material-symbols-outlined">search</span>
              <input
                type="text"
                placeholder="Search driver by name, plate number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="rydo-ad-search-input"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="rydo-ad-clear-btn">✕</button>
              )}
            </div>

            <div className="rydo-ad-status-tabs">
              {['all', 'active', 'suspended', 'pending'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`rydo-ad-tab ${statusFilter === tab ? 'active' : ''}`}
                  onClick={() => setStatusFilter(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Drivers Grid / Table */}
          <div className="rydo-ad-table-card">
            <div className="rydo-table-responsive">
              <table className="rydo-admin-table">
                <thead>
                  <tr>
                    <th>Driver Partner</th>
                    <th>Vehicle & Plate</th>
                    <th>Rating & Trips</th>
                    <th>Status</th>
                    <th>KYC Compliance</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id} onClick={() => setSelectedDriver(d)} className="rydo-table-row-clickable">
                      <td>
                        <div className="rydo-ad-driver-cell">
                          <img src={d.avatar} alt={d.name} className="rydo-ad-avatar" />
                          <div className="rydo-ad-driver-name-block">
                            <span className="rydo-ad-driver-name">{d.name}</span>
                            <span className="rydo-ad-driver-phone">{d.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="rydo-ad-veh-cell">
                          <span className="rydo-ad-veh-name">{d.vehicleName}</span>
                          <span className="rydo-ad-veh-plate">{d.vehiclePlate}</span>
                        </div>
                      </td>
                      <td>
                        <div className="rydo-ad-rating-cell">
                          <span className="rydo-ad-rating-num">★ {d.rating}</span>
                          <span className="rydo-ad-trips-num">{d.trips} trips</span>
                        </div>
                      </td>
                      <td>
                        <span className={`rydo-ad-status-pill ${d.status.toLowerCase()}`}>
                          {d.status}
                        </span>
                      </td>
                      <td>
                        <span className="rydo-ad-compliance-tag">
                          <span className="material-symbols-outlined fill-icon">verified</span>
                          100% Cleared
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={`rydo-ad-action-btn ${d.status === 'Active' ? 'suspend' : 'activate'}`}
                          onClick={(e) => toggleDriverStatus(d.id, e)}
                        >
                          {d.status === 'Active' ? 'Suspend' : 'Activate'}
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

      {/* Driver Detail Modal */}
      <Modal
        isOpen={!!selectedDriver}
        onClose={() => setSelectedDriver(null)}
        title="Driver Partner Profile"
        maxWidth="500px"
      >
        {selectedDriver && (
          <div className="rydo-driver-detail-modal">
            <div className="rydo-dd-top">
              <img src={selectedDriver.avatar} alt={selectedDriver.name} className="rydo-dd-avatar" />
              <div>
                <h3 className="rydo-dd-name">{selectedDriver.name}</h3>
                <p className="rydo-dd-meta">{selectedDriver.phone} • {selectedDriver.vehicleName}</p>
                <div className="rydo-dd-badge-row">
                  <span className="rydo-dd-badge">Rating: ★ {selectedDriver.rating}</span>
                  <span className="rydo-dd-badge">{selectedDriver.trips} Trips Completed</span>
                </div>
              </div>
            </div>

            <div className="rydo-dd-specs">
              <div className="rydo-dd-spec-item">
                <span className="label">Vehicle Plate:</span>
                <span className="val">{selectedDriver.vehiclePlate}</span>
              </div>
              <div className="rydo-dd-spec-item">
                <span className="label">Category:</span>
                <span className="val">{selectedDriver.tier || 'Rydo Comfort'}</span>
              </div>
              <div className="rydo-dd-spec-item">
                <span className="label">Account Status:</span>
                <span className={`val ${selectedDriver.status.toLowerCase()}`}>{selectedDriver.status}</span>
              </div>
              <div className="rydo-dd-spec-item">
                <span className="label">Background Check:</span>
                <span className="val green">Verified Police Clearance</span>
              </div>
            </div>

            <div className="rydo-dd-actions">
              <Button
                variant={selectedDriver.status === 'Active' ? 'danger' : 'success'}
                fullWidth
                onClick={(e) => {
                  toggleDriverStatus(selectedDriver.id, e);
                  setSelectedDriver(null);
                }}
              >
                {selectedDriver.status === 'Active' ? 'Suspend Driver Access' : 'Re-activate Driver Account'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
