import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import Button from '../../../components/Button/index.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import { driverService } from '../../../services/driverService.js';
import './index.css';

export default function DriverProfile() {
  const navigate = useNavigate();
  const { logout, switchRole } = useAuth();
  const driver = driverService.getDriverProfile();

  const documents = [
    { title: 'Commercial Driving License', status: 'Verified', expires: 'Exp: 14 May 2030' },
    { title: 'Vehicle Registration (RC)', status: 'Verified', expires: 'KA 01 MJ 4821' },
    { title: 'Commercial Insurance Policy', status: 'Verified', expires: 'Exp: 22 Nov 2027' },
    { title: 'Police Background Verification', status: 'Cleared', expires: 'Valid till 2028' }
  ];

  return (
    <div className="rydo-driver-profile-page">
      <Header title="Driver Profile" />

      <main className="rydo-dp-content">
        <div className="rydo-dp-container">
          {/* Driver Card Header */}
          <div className="rydo-dp-card">
            <div className="rydo-dp-avatar-row">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="rydo-dp-avatar"
              />
              <div className="rydo-dp-name-block">
                <div className="rydo-dp-title-row">
                  <h1 className="rydo-dp-name">{driver.name}</h1>
                  <span className="rydo-dp-badge">
                    <span className="material-symbols-outlined fill-icon">verified</span>
                    Top Partner
                  </span>
                </div>
                <p className="rydo-dp-phone">{driver.phone} • rahul.s.driver@rydo.io</p>
                <div className="rydo-dp-rating-meta">
                  <span className="material-symbols-outlined fill-icon star">star</span>
                  <strong>{driver.rating}</strong>
                  <span>({driver.tripsCount} lifetime trips)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="rydo-dp-card">
            <h2 className="rydo-dp-section-title">Assigned Vehicle</h2>
            <div className="rydo-dp-vehicle-box">
              <div className="rydo-dp-veh-icon">
                <span className="material-symbols-outlined">directions_car</span>
              </div>
              <div className="rydo-dp-veh-info">
                <span className="rydo-dp-veh-name">{driver.vehicleName}</span>
                <span className="rydo-dp-veh-type">{driver.vehicleType} • Air Conditioned</span>
              </div>
              <div className="rydo-dp-veh-plate">
                {driver.vehiclePlate}
              </div>
            </div>
          </div>

          {/* Verification & Compliance Documents */}
          <div className="rydo-dp-card">
            <h2 className="rydo-dp-section-title">KYC & Safety Documents</h2>
            <div className="rydo-dp-docs-list">
              {documents.map((doc, idx) => (
                <div key={idx} className="rydo-dp-doc-item">
                  <div className="rydo-dp-doc-left">
                    <span className="material-symbols-outlined rydo-dp-doc-icon">description</span>
                    <div className="rydo-dp-doc-text">
                      <span className="rydo-dp-doc-title">{doc.title}</span>
                      <span className="rydo-dp-doc-exp">{doc.expires}</span>
                    </div>
                  </div>
                  <span className="rydo-dp-doc-status-badge">
                    <span className="material-symbols-outlined fill-icon">check_circle</span>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payout Bank Account */}
          <div className="rydo-dp-card">
            <h2 className="rydo-dp-section-title">Payout Banking (Direct Deposit)</h2>
            <div className="rydo-dp-bank-row">
              <div className="rydo-dp-bank-icon">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
              <div className="rydo-dp-bank-text">
                <span className="rydo-dp-bank-name">HDFC Bank Ltd • Savings</span>
                <span className="rydo-dp-bank-num">Account ending in •••• 9104 (IFSC: HDFC0001248)</span>
              </div>
              <span className="rydo-dp-bank-auto">Daily Payout Active</span>
            </div>
          </div>

          {/* Switch Role & Logout */}
          <div className="rydo-dp-card">
            <h2 className="rydo-dp-section-title">Navigation & Account</h2>
            <div className="rydo-dp-action-buttons">
              <Button
                variant="outline"
                icon="directions_car"
                onClick={() => {
                  switchRole('rider');
                  navigate('/rider');
                }}
              >
                Switch to Rider Experience
              </Button>
              <Button
                variant="danger"
                icon="logout"
                onClick={async () => {
                  await logout();
                  navigate('/login');
                }}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation role="driver" />
    </div>
  );
}
