import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default function BottomNavigation({ role = 'rider' }) {
  const items = role === 'driver' ? [
    { to: '/driver', label: 'Dashboard', icon: 'speed' },
    { to: '/driver/rides', label: 'Rides', icon: 'receipt_long' },
    { to: '/driver/profile', label: 'Profile', icon: 'person' }
  ] : [
    { to: '/rider', label: 'Home', icon: 'directions_car' },
    { to: '/rider/rides', label: 'Rides', icon: 'receipt_long' },
    { to: '/rider/profile', label: 'Profile', icon: 'person' }
  ];

  return (
    <nav className="rydo-bottom-nav">
      <div className="rydo-bottom-nav-container">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/rider' || item.to === '/driver'}
            className={({ isActive }) => `rydo-bottom-nav-item ${isActive ? 'is-active' : ''}`}
          >
            <span className="material-symbols-outlined rydo-bottom-nav-icon">
              {item.icon}
            </span>
            <span className="rydo-bottom-nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
