import React, { useState, useEffect } from 'react';
import { ASSETS } from '../../constants/assets.js';
import './index.css';

export default function Map({
  mode = 'rider', // 'rider' | 'driver' | 'tracking'
  pickupText = 'Pickup: 452 Market',
  destinationText = 'Mission Bay Hub',
  etaText = '18 min • 5.2 km',
  showRoute = true,
  driverMoving = true,
  driverPlate = 'KA-01-MJ-4102',
  mapBackground = ASSETS.mapSF,
  interactive = true,
  className = ''
}) {
  const [trafficActive, setTrafficActive] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [carStep, setCarStep] = useState(0);

  // Trajectory points for simulated live car progress
  const trajectoryPoints = [
    { x: 330, y: 260, rot: 42, label: '4m away' },
    { x: 370, y: 285, rot: 55, label: '3m away' },
    { x: 440, y: 310, rot: 65, label: '2m away' },
    { x: 510, y: 350, rot: 75, label: '1m away' },
    { x: 560, y: 410, rot: 50, label: 'Arriving now' },
    { x: 610, y: 460, rot: 40, label: 'On trip' },
    { x: 670, y: 520, rot: 35, label: 'Near drop-off' }
  ];

  useEffect(() => {
    if (!driverMoving) return;
    const interval = setInterval(() => {
      setCarStep(prev => (prev + 1) % trajectoryPoints.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [driverMoving, trajectoryPoints.length]);

  const currentCar = trajectoryPoints[carStep];

  return (
    <div className={`rydo-map-viewport ${className}`}>
      {/* Base Cartographic Graphic */}
      <div 
        className="rydo-map-base"
        style={{ 
          backgroundImage: `url('${mapBackground}')`,
          transform: `scale(${zoomLevel})`
        }}
      >
        {/* Soft Vignette Mask & Ambient Geometry Overlay */}
        <div className="rydo-map-ambient-overlay">
          <svg className="rydo-map-grid-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="rydo-city-blocks" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(195, 198, 215, 0.45)" strokeWidth="1.5" />
                <rect x="12" y="12" width="44" height="44" rx="4" fill="rgba(234, 237, 255, 0.55)" />
                <rect x="68" y="12" width="40" height="44" rx="4" fill="rgba(234, 237, 255, 0.55)" />
                <rect x="12" y="68" width="44" height="40" rx="4" fill="rgba(234, 237, 255, 0.55)" />
                <rect x="68" y="68" width="40" height="40" rx="4" fill="rgba(234, 237, 255, 0.55)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#rydo-city-blocks)" />
          </svg>
        </div>

        {/* Dynamic Route SVG Layer */}
        {showRoute && (
          <svg className="rydo-map-route-svg" viewBox="0 0 1000 800" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rydoRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#006b5f" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#004ac6" />
              </linearGradient>
              <filter id="rydoRouteGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.35" />
              </filter>
            </defs>

            {/* Ghost Alternate Route */}
            <path
              d="M 280 220 C 290 320, 390 380, 480 430 C 560 480, 640 550, 720 620"
              fill="none"
              stroke="#737686"
              strokeWidth="4"
              strokeDasharray="6 6"
              strokeLinecap="round"
              opacity="0.35"
            />

            {/* Active Polyline Base & Glow */}
            <path
              d="M 280 220 C 340 220, 370 290, 440 310 C 510 330, 560 410, 610 460 C 670 520, 680 570, 720 620"
              fill="none"
              stroke="#ffffff"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 280 220 C 340 220, 370 290, 440 310 C 510 330, 560 410, 610 460 C 670 520, 680 570, 720 620"
              fill="none"
              stroke="url(#rydoRouteGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#rydoRouteGlow)"
            />
          </svg>
        )}

        {/* Surge Heatmap Blobs for Driver Mode */}
        {mode === 'driver' && (
          <div className="rydo-map-surge-container">
            <div className="rydo-surge-blob rydo-surge-blob-1"></div>
            <div className="rydo-surge-blob rydo-surge-blob-2"></div>
          </div>
        )}

        {/* Pickup Pin */}
        <div className="rydo-map-pin rydo-pin-pickup" style={{ left: '28%', top: '27%' }}>
          <div className="rydo-pin-label rydo-label-pickup">
            <span className="rydo-dot rydo-dot-green"></span>
            <span>{pickupText}</span>
          </div>
          <div className="rydo-pin-circle rydo-circle-green">
            <span className="material-symbols-outlined">person_pin</span>
          </div>
          <div className="rydo-pin-pointer rydo-pointer-green"></div>
        </div>

        {/* Mid-Route ETA Bubble */}
        {showRoute && (
          <div className="rydo-map-eta-bubble" style={{ left: '52%', top: '48%' }}>
            <span className="material-symbols-outlined rydo-eta-icon">navigation</span>
            <span className="rydo-eta-main">{etaText}</span>
            <span className="rydo-eta-badge">Fastest</span>
          </div>
        )}

        {/* Destination Pin */}
        <div className="rydo-map-pin rydo-pin-destination" style={{ left: '72%', top: '75%' }}>
          <div className="rydo-pin-label rydo-label-dest">
            <span className="rydo-dot rydo-dot-blue"></span>
            <span>{destinationText}</span>
          </div>
          <div className="rydo-pin-circle rydo-circle-blue">
            <span className="material-symbols-outlined">flag</span>
          </div>
          <div className="rydo-pin-pointer rydo-pointer-blue"></div>
        </div>

        {/* Active Primary Driver Car with rotation & badge */}
        <div 
          className="rydo-map-driver-car rydo-driver-primary"
          style={{ 
            left: `${currentCar.x / 10}%`, 
            top: `${currentCar.y / 8}%`,
            transition: 'left 1.2s ease, top 1.2s ease'
          }}
        >
          <div className="rydo-car-icon-wrapper" style={{ transform: `rotate(${currentCar.rot}deg)` }}>
            <span className="material-symbols-outlined fill-icon">directions_car</span>
            <div className="rydo-car-check">✓</div>
          </div>
          <div className="rydo-car-tag">
            <span className="rydo-car-plate">{driverPlate}</span>
            <span className="rydo-car-eta">{currentCar.label} • 4.9★</span>
          </div>
        </div>

        {/* Surrounding Nearby Driver Cars */}
        <div className="rydo-map-driver-car rydo-driver-secondary" style={{ left: '22%', top: '20%' }}>
          <div className="rydo-car-icon-wrapper mini" style={{ transform: 'rotate(-20deg)' }}>
            <span className="material-symbols-outlined fill-icon">directions_car</span>
          </div>
          <div className="rydo-car-tag mini">DL-04-AB-9921</div>
        </div>

        <div className="rydo-map-driver-car rydo-driver-secondary" style={{ left: '46%', top: '26%' }}>
          <div className="rydo-car-icon-wrapper mini ev" style={{ transform: 'rotate(110deg)' }}>
            <span className="material-symbols-outlined fill-icon">electric_car</span>
          </div>
          <div className="rydo-car-tag mini ev">EV • MH-12-RT-8843</div>
        </div>

        <div className="rydo-map-driver-car rydo-driver-secondary" style={{ left: '42%', top: '50%' }}>
          <div className="rydo-car-icon-wrapper mini" style={{ transform: 'rotate(65deg)' }}>
            <span className="material-symbols-outlined fill-icon">directions_car</span>
          </div>
          <div className="rydo-car-tag mini">KA-05-EQ-1120</div>
        </div>
      </div>

      {/* Map Control Floating Rails */}
      {interactive && (
        <div className="rydo-map-controls-rail">
          <button 
            className="rydo-map-control-btn"
            title="Recenter Current Location"
            onClick={() => setZoomLevel(1)}
          >
            <span className="material-symbols-outlined">my_location</span>
          </button>
          <button 
            className={`rydo-map-control-btn ${trafficActive ? 'active-traffic' : ''}`}
            title="Toggle Live Traffic"
            onClick={() => setTrafficActive(!trafficActive)}
          >
            <span className="material-symbols-outlined">traffic</span>
          </button>
          <button 
            className="rydo-map-control-btn"
            title="Map Layer"
          >
            <span className="material-symbols-outlined">layers</span>
          </button>

          <div className="rydo-map-zoom-group">
            <button 
              className="rydo-map-zoom-btn"
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
              title="Zoom in"
            >
              <span className="material-symbols-outlined">add</span>
            </button>
            <div className="rydo-map-zoom-divider"></div>
            <button 
              className="rydo-map-zoom-btn"
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.85))}
              title="Zoom out"
            >
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
        </div>
      )}

      {/* Top Map Status Banner */}
      <div className="rydo-map-top-banner">
        <span className="rydo-banner-dot"></span>
        <span className="rydo-banner-title">Downtown Telemetry Grid</span>
        <span className="rydo-banner-divider">•</span>
        <span className="rydo-banner-sub">Optimal Satellite Accuracy (2.1m)</span>
      </div>

      {/* Bottom Floating Traffic / Fast Match Badge */}
      <div className="rydo-map-bottom-pill">
        <div className="rydo-pill-left">
          <span className="rydo-pill-pulse">
            <span className="rydo-pill-ping"></span>
            <span className="rydo-pill-dot"></span>
          </span>
          <span className="rydo-pill-traffic">Live Traffic: {trafficActive ? 'Light' : 'Standard'}</span>
          <span className="rydo-pill-sep">•</span>
          <span className="rydo-pill-nearby">6 Rydo drivers nearby</span>
        </div>
        <div className="rydo-pill-right">
          <span className="material-symbols-outlined">bolt</span>
          <span>Fast Match</span>
        </div>
      </div>
    </div>
  );
}
