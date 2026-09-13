import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import BottomNavigation from '../../../components/BottomNavigation/index.jsx';
import Button from '../../../components/Button/index.jsx';
import Input from '../../../components/Input/index.jsx';
import { useAuth } from '../../../context/AuthContext.jsx';
import { ASSETS } from '../../../constants/assets.js';
import './index.css';

export default function RiderProfile() {
  const navigate = useNavigate();
  const { user, logout, switchRole } = useAuth();
  const [name, setName] = useState(user?.name || 'Alex Mercer');
  const [email, setEmail] = useState(user?.email || 'alex.mercer@rydo.io');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rydo-profile-page">
      <Header title="Rider Profile" />

      <main className="rydo-profile-content">
        <div className="rydo-profile-container">
          {/* Profile Card Header */}
          <div className="rydo-profile-card">
            <div className="rydo-profile-avatar-row">
              <div className="rydo-profile-avatar-wrap">
                <img
                  src={user?.avatar || ASSETS.userAvatar}
                  alt={name}
                  className="rydo-profile-big-avatar"
                />
                <button type="button" className="rydo-avatar-edit-btn" title="Change Avatar">
                  <span className="material-symbols-outlined">photo_camera</span>
                </button>
              </div>

              <div className="rydo-profile-avatar-text">
                <h1 className="rydo-profile-name">{name}</h1>
                <p className="rydo-profile-role">Rydo Member • 4.98★ Rider Rating</p>
                <span className="rydo-profile-verified">
                  <span className="material-symbols-outlined fill-icon">verified</span>
                  Verified Rider Account
                </span>
              </div>
            </div>

            {saved && (
              <div className="rydo-profile-alert-success">
                Profile changes saved successfully!
              </div>
            )}

            <form onSubmit={handleSave} className="rydo-profile-form">
              <div className="rydo-profile-fields-grid">
                <Input
                  id="p-name"
                  label="Display Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon="badge"
                />
                <Input
                  id="p-email"
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon="mail"
                />
                <Input
                  id="p-phone"
                  label="Mobile Number"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  icon="call"
                />
              </div>

              <div className="rydo-profile-save-row">
                <Button type="submit" variant="primary" size="md">
                  Update Profile Details
                </Button>
              </div>
            </form>
          </div>

          {/* Saved Places */}
          <div className="rydo-profile-section-card">
            <h3 className="rydo-profile-section-title">Saved Locations</h3>
            <div className="rydo-saved-places-list">
              <div className="rydo-saved-place-item">
                <div className="rydo-saved-place-icon">
                  <span className="material-symbols-outlined">home</span>
                </div>
                <div className="rydo-saved-place-info">
                  <span className="rydo-saved-place-name">Home</span>
                  <span className="rydo-saved-place-addr">742 Evergreen Terrace, San Francisco, CA</span>
                </div>
                <button type="button" className="rydo-saved-place-btn">
                  Edit
                </button>
              </div>

              <div className="rydo-saved-place-item">
                <div className="rydo-saved-place-icon">
                  <span className="material-symbols-outlined">business</span>
                </div>
                <div className="rydo-saved-place-info">
                  <span className="rydo-saved-place-name">Office</span>
                  <span className="rydo-saved-place-addr">Mission Bay Innovation Hub, 4th St</span>
                </div>
                <button type="button" className="rydo-saved-place-btn">
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Rydo Mobility Wallet & Payments */}
          <div className="rydo-profile-section-card">
            <h3 className="rydo-profile-section-title">Payment & Wallet</h3>
            <div className="rydo-wallet-banner">
              <div className="rydo-wallet-info">
                <span className="rydo-wallet-label">Rydo Cash Balance</span>
                <span className="rydo-wallet-amount">₹480.00</span>
              </div>
              <Button variant="secondary" size="sm" icon="add">
                Add Funds
              </Button>
            </div>
          </div>

          {/* Quick Portal Switch & Logout */}
          <div className="rydo-profile-section-card">
            <h3 className="rydo-profile-section-title">Account & Portals</h3>
            <div className="rydo-portal-switch-row">
              <Button
                variant="outline"
                size="md"
                icon="speed"
                onClick={() => {
                  switchRole('driver');
                  navigate('/driver');
                }}
              >
                Switch to Driver Portal
              </Button>

              <Button
                variant="outline"
                size="md"
                icon="admin_panel_settings"
                onClick={() => {
                  switchRole('admin');
                  navigate('/admin');
                }}
              >
                Switch to Admin Console
              </Button>

              <Button
                variant="danger"
                size="md"
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

      <BottomNavigation role="rider" />
    </div>
  );
}
