import React, { useState } from 'react';
import { QUICK_PLACES, MOCK_SEARCH_RESULTS } from '../../constants/mockLocations.js';
import './index.css';

export default function LocationSearch({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
  onSelectLocation,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [filterQuery, setFilterQuery] = useState('');

  const handleSwap = () => {
    const temp = pickup;
    onPickupChange(destination);
    onDestinationChange(temp);
  };

  const filteredResults = MOCK_SEARCH_RESULTS.filter(item => {
    if (!filterQuery) return true;
    return (
      item.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(filterQuery.toLowerCase())
    );
  });

  return (
    <div className="rydo-loc-search">
      {/* Search Header Inputs */}
      <div className="rydo-loc-inputs-box">
        <div className="rydo-loc-dots-column">
          <span className="rydo-dot rydo-dot-green"></span>
          <span className="rydo-loc-dotted-line"></span>
          <span className="rydo-dot rydo-dot-blue"></span>
        </div>

        <div className="rydo-loc-input-fields">
          <div className="rydo-loc-field-row">
            <input
              type="text"
              value={pickup}
              onChange={(e) => onPickupChange(e.target.value)}
              placeholder="Current location / Pickup spot"
              className="rydo-loc-native-input"
            />
          </div>

          <div className="rydo-loc-divider"></div>

          <div className="rydo-loc-field-row">
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                onDestinationChange(e.target.value);
                setFilterQuery(e.target.value);
              }}
              placeholder="Where to? (e.g. Airport, Mission Bay)"
              className="rydo-loc-native-input"
              autoFocus
            />
          </div>
        </div>

        <button 
          type="button" 
          className="rydo-loc-swap-btn"
          onClick={handleSwap}
          title="Swap locations"
        >
          <span className="material-symbols-outlined">swap_vert</span>
        </button>
      </div>

      {/* Quick Location Shortcuts */}
      <div className="rydo-loc-quick-row">
        {QUICK_PLACES.map((place) => (
          <button
            key={place.id}
            type="button"
            className="rydo-loc-quick-chip"
            onClick={() => onSelectLocation(place.title)}
          >
            <span className="material-symbols-outlined rydo-quick-icon">{place.icon}</span>
            <span className="rydo-quick-title">{place.title}</span>
          </button>
        ))}
      </div>

      {/* Recent / Suggested Places List */}
      <div className="rydo-loc-results-list">
        <div className="rydo-loc-list-header">
          <span className="rydo-loc-list-title">Recent & Popular Destinations</span>
          <span className="rydo-loc-list-count">{filteredResults.length} spots</span>
        </div>

        {filteredResults.map((item) => (
          <div
            key={item.id}
            className="rydo-loc-result-item"
            onClick={() => onSelectLocation(item.title)}
          >
            <div className="rydo-loc-result-icon">
              <span className="material-symbols-outlined">{item.icon || 'location_on'}</span>
            </div>
            <div className="rydo-loc-result-info">
              <div className="rydo-loc-result-title">{item.title}</div>
              <div className="rydo-loc-result-sub">{item.subtitle}</div>
            </div>
            <div className="rydo-loc-result-dist">
              <span className="rydo-loc-dist-val">{item.distance}</span>
              <span className="material-symbols-outlined rydo-loc-chevron">chevron_right</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
