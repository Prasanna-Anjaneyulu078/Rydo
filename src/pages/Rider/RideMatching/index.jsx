import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import Button from '../../../components/Button/index.jsx';
import Map from '../../../components/Map/index.jsx';
import { useRide } from '../../../context/RideContext.jsx';
import { ASSETS } from '../../../constants/assets.js';
import './index.css';

export default function RideMatching() {
  const navigate = useNavigate();
  const { activeRide, cancelActiveRide, startAIMatching, selectedTier } = useRide();
  const [matchStep, setMatchStep] = useState('Scanning 1.5 km radius');
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate search dots
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    // Sequence through AI matching steps
    const t1 = setTimeout(() => {
      setMatchStep('Evaluating 6 nearby verified drivers...');
    }, 1200);

    const t2 = setTimeout(() => {
      setMatchStep('Optimizing route & traffic congestion index...');
    }, 2400);

    const t3 = setTimeout(() => {
      setMatchStep('Driver found! Assigning Rahul Sharma...');
    }, 3600);

    // Auto navigate after match
    const finishMatch = async () => {
      await startAIMatching();
      navigate('/rider/tracking');
    };

    const matchTimer = setTimeout(() => {
      finishMatch();
    }, 4500);

    return () => {
      clearInterval(dotsInterval);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(matchTimer);
    };
  }, []);

  const handleCancel = () => {
    cancelActiveRide('User cancelled while matching');
    navigate('/rider');
  };

  return (
    <div className="rydo-matching-page">
      <Header title="Connecting..." />

      <div className="rydo-matching-layout">
        {/* Background Map Simulation with low opacity */}
        <div className="rydo-matching-map-bg">
          <Map
            mode="rider"
            showRoute={false}
            interactive={false}
            driverMoving={true}
          />
          <div className="rydo-matching-backdrop-mask"></div>
        </div>

        {/* Central AI Matching Card */}
        <div className="rydo-matching-center-card">
          {/* Radar Radar Animation */}
          <div className="rydo-radar-circle-wrapper">
            <div className="rydo-radar-wave wave-1"></div>
            <div className="rydo-radar-wave wave-2"></div>
            <div className="rydo-radar-wave wave-3"></div>

            <div className="rydo-radar-core">
              <img
                src={selectedTier.image || ASSETS.carEconomy}
                alt="Selected Car"
                className="rydo-radar-car-img"
              />
              <span className="rydo-radar-beacon-dot"></span>
            </div>
          </div>

          {/* Titles & Status */}
          <div className="rydo-matching-headers">
            <div className="rydo-ai-tag">
              <span className="material-symbols-outlined fill-icon">auto_awesome</span>
              <span>Rydo AI Dispatch</span>
            </div>
            <h1 className="rydo-matching-title">Connecting with nearby drivers{dots}</h1>
            <p className="rydo-matching-desc">
              Matching you with the highest-rated driver and the fastest, congestion-free route.
            </p>
          </div>

          {/* Telemetry telemetry stream */}
          <div className="rydo-telemetry-box">
            <div className="rydo-telemetry-item">
              <span className="material-symbols-outlined rydo-telemetry-icon">radar</span>
              <span className="rydo-telemetry-text">{matchStep}</span>
            </div>
            <div className="rydo-telemetry-tier">
              <span>Requested: <strong>{selectedTier.name}</strong> • ₹{selectedTier.price}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="rydo-matching-actions">
            <Button
              variant="outline"
              size="md"
              fullWidth
              onClick={handleCancel}
              icon="close"
            >
              Cancel Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
