import React, { useState } from 'react';
import './index.css';

export default function StarRating({
  rating = 5,
  onChange,
  readOnly = false,
  size = 'md',
  showText = true
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = hoverRating || rating;

  const ratingDescriptions = {
    1: 'Poor Experience',
    2: 'Needs Improvement',
    3: 'Average Trip',
    4: 'Good & Safe Ride',
    5: 'Excellent Service!'
  };

  return (
    <div className={`rydo-rating-wrapper size-${size}`}>
      <div className="rydo-stars-row">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            className={`rydo-star-btn ${displayRating >= star ? 'filled' : ''} ${readOnly ? 'read-only' : ''}`}
            onClick={() => onChange && onChange(star)}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
          >
            <span className="material-symbols-outlined fill-icon">star</span>
          </button>
        ))}
      </div>

      {showText && (
        <span className="rydo-rating-feedback-label">
          {ratingDescriptions[displayRating] || `${rating}.0 Stars`}
        </span>
      )}
    </div>
  );
}
