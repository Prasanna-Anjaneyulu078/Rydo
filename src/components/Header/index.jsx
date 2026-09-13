import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { ASSETS } from '../../constants/assets.js';
import './index.css';

export default function Header({ title, showBack = false, onBack }) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/rider' && (location.pathname === '/rider' || location.pathname === '/')) return true;
    return location.pathname.startsWith(path);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="rydo-header">
      <div className="rydo-header-container">
        {/* Left: Brand / Back */}
        <div className="rydo-header-left">
          {showBack ? (
            <button 
              className="rydo-back-btn" 
              onClick={handleBack}
              aria-label="Go back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          ) : null}

          <Link to={role === 'driver' ? '/driver' : role === 'admin' ? '/admin' : '/rider'} className="rydo-brand" aria-label="Rydo Home">
            <img src={ASSETS.logo} alt="Rydo" className="rydo-logo" referrerPolicy="no-referrer" />
          </Link>

          {title && (
            <span className="rydo-header-subtitle">{title}</span>
          )}

          {/* AI Beacon Badge */}
          <div className="rydo-ai-beacon">
            <span className="rydo-beacon-pulse">
              <span className="rydo-beacon-ping"></span>
              <span className="rydo-beacon-dot"></span>
            </span>
            <span className="rydo-beacon-text">AI Smart Dispatch Active</span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="rydo-desktop-nav">
          {role === 'rider' && (
            <>
              <Link
                to="/rider"
                className={`rydo-nav-link ${isActive('/rider') ? 'active' : ''}`}
              >
                Home
              </Link>
              <Link
                to="/rider/rides"
                className={`rydo-nav-link ${isActive('/rider/rides') ? 'active' : ''}`}
              >
                Rides
              </Link>
            </>
          )}

          {role === 'driver' && (
            <>
              <Link
                to="/driver"
                className={`rydo-nav-link ${isActive('/driver') ? 'active' : ''}`}
              >
                Driver Cockpit
              </Link>
              <Link
                to="/driver/rides"
                className={`rydo-nav-link ${isActive('/driver/rides') ? 'active' : ''}`}
              >
                Shift Log
              </Link>
            </>
          )}

          {role === 'admin' && (
            <>
              <Link
                to="/admin"
                className={`rydo-nav-link ${isActive('/admin') ? 'active' : ''}`}
              >
                Fleet Overview
              </Link>
              <Link
                to="/admin/drivers"
                className={`rydo-nav-link ${isActive('/admin/drivers') ? 'active' : ''}`}
              >
                Drivers Directory
              </Link>
              <Link
                to="/admin/rides"
                className={`rydo-nav-link ${isActive('/admin/rides') ? 'active' : ''}`}
              >
                Dispatches
              </Link>
            </>
          )}
        </nav>

        {/* Right: Actions & User */}
        <div className="rydo-header-right">
          <button 
            className="rydo-icon-btn" 
            title="Notifications"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>

          <div className="rydo-user-menu-wrapper">
            <button 
              className="rydo-user-btn"
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="User menu"
            >
              <img 
                src={user?.avatar || ASSETS.userAvatar} 
                alt="Profile" 
                className="rydo-user-avatar" 
              />
              <span className="rydo-user-name">{user?.name?.split(' ')[0] || 'Alex'}</span>
              <span className="material-symbols-outlined rydo-dropdown-chevron">expand_more</span>
            </button>

            {profileOpen && (
              <div className="rydo-dropdown-menu">
                <div className="rydo-dropdown-header">
                  <p className="rydo-dropdown-user-name">{user?.name || 'Alex Mercer'}</p>
                  <p className="rydo-dropdown-user-email">{user?.email || 'alex@rydo.io'}</p>
                  <span className="rydo-dropdown-role-tag">{role?.toUpperCase()}</span>
                </div>
                <div className="rydo-dropdown-divider"></div>
                {role !== 'admin' && (
                  <button 
                    className="rydo-dropdown-item" 
                    onClick={() => { 
                      setProfileOpen(false); 
                      if (role === 'driver') navigate('/driver/profile');
                      else navigate('/rider/profile');
                    }}
                  >
                    <span className="material-symbols-outlined">person</span>
                    Profile
                  </button>
                )}
                <button 
                  className="rydo-dropdown-item" 
                  onClick={() => { 
                    setProfileOpen(false); 
                    if (role === 'driver') navigate('/driver/rides');
                    else if (role === 'admin') navigate('/admin/rides');
                    else navigate('/rider/rides');
                  }}
                >
                  <span className="material-symbols-outlined">history</span>
                  {role === 'driver' ? 'Shift Rides' : role === 'admin' ? 'Dispatch Activity' : 'Ride History'}
                </button>
                <div className="rydo-dropdown-divider"></div>
                <button 
                  className="rydo-dropdown-item rydo-dropdown-logout"
                  onClick={() => { setProfileOpen(false); logout(); navigate('/login'); }}
                >
                  <span className="material-symbols-outlined">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
