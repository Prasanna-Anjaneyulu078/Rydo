import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/index.jsx';
import Button from '../../../components/Button/index.jsx';
import StarRating from '../../../components/StarRating/index.jsx';
import { useRide } from '../../../context/RideContext.jsx';
import { ASSETS } from '../../../constants/assets.js';
import './index.css';

export default function RideCompleted() {
  const navigate = useNavigate();
  const { activeRide, completeActiveRide, resetRide } = useRide();

  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState(['Clean Car', 'Smooth Drive']);
  const [tip, setTip] = useState(20);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tags = [
    'Clean Car',
    'Polite Driver',
    'Smooth Drive',
    'Guaranteed AC',
    'Great Music',
    'Fast Route'
  ];

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    completeActiveRide(rating, comment);
    setSubmitted(true);
    setTimeout(() => {
      resetRide();
      navigate('/rider/rides');
    }, 1200);
  };

  const fareTotal = (activeRide.fare || 140) + tip;

  return (
    <div className="rydo-completed-page">
      <Header title="Trip Summary" />

      <main className="rydo-completed-layout">
        <div className="rydo-completed-card">
          {/* Success Check Banner */}
          <div className="rydo-completed-header">
            <div className="rydo-success-icon-box">
              <span className="material-symbols-outlined fill-icon">check_circle</span>
            </div>
            <h1 className="rydo-completed-title">Ride Completed!</h1>
            <p className="rydo-completed-sub">
              You arrived safely at {activeRide.destination || 'Mission Bay Innovation Hub'}
            </p>
          </div>

          {/* Fare Summary Box */}
          <div className="rydo-fare-summary-box">
            <div className="rydo-fare-row">
              <span className="rydo-fare-label">Trip Fare</span>
              <span className="rydo-fare-val">₹{activeRide.fare || 140}.00</span>
            </div>
            {tip > 0 && (
              <div className="rydo-fare-row">
                <span className="rydo-fare-label">Driver Tip</span>
                <span className="rydo-fare-val">₹{tip}.00</span>
              </div>
            )}
            <div className="rydo-fare-divider"></div>
            <div className="rydo-fare-row rydo-fare-total-row">
              <span className="rydo-fare-total-label">Total Amount Paid</span>
              <span className="rydo-fare-total-val">₹{fareTotal}.00</span>
            </div>
            <p className="rydo-payment-meta">
              Paid via {activeRide.paymentMethod || 'UPI (•••• 8821)'} • ID: {activeRide.id || 'RYD-98214'}
            </p>
          </div>

          {/* Driver Avatar & Rating Box */}
          <div className="rydo-rating-section">
            <div className="rydo-completed-driver-row">
              <img
                src={activeRide.driver?.avatar || ASSETS.driverAvatar}
                alt="Driver"
                className="rydo-completed-driver-avatar"
              />
              <div className="rydo-completed-driver-info">
                <span className="rydo-completed-driver-name">
                  {activeRide.driver?.name || 'Rahul Sharma'}
                </span>
                <span className="rydo-completed-driver-vehicle">
                  {activeRide.driver?.vehicleName || 'White Hyundai i20'}
                </span>
              </div>
            </div>

            <div className="rydo-stars-container">
              <p className="rydo-rating-prompt">Rate your trip experience</p>
              <StarRating
                rating={rating}
                onChange={setRating}
                size="lg"
                showText={true}
              />
            </div>

            {/* Compliment Badges */}
            <div className="rydo-tags-grid">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`rydo-tag-chip ${selectedTags.includes(tag) ? 'active' : ''}`}
                  onClick={() => toggleTag(tag)}
                >
                  <span className="material-symbols-outlined">thumb_up</span>
                  <span>{tag}</span>
                </button>
              ))}
            </div>

            {/* Tip Selection */}
            <div className="rydo-tip-container">
              <span className="rydo-tip-label">Add a tip for Rahul? (100% goes to driver)</span>
              <div className="rydo-tip-chips">
                {[0, 20, 50, 100].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`rydo-tip-chip ${tip === amount ? 'selected' : ''}`}
                    onClick={() => setTip(amount)}
                  >
                    {amount === 0 ? 'No Tip' : `₹${amount}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="rydo-comment-box">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Leave optional compliment or feedback..."
                className="rydo-comment-input"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="rydo-completed-footer">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={submitted}
              onClick={handleSubmit}
            >
              {submitted ? 'Receipt Saved!' : 'Submit & Done'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
