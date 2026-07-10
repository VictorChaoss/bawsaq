import React from 'react';
import './SubHeader.css';

const FILTERS = ['All', 'Live on Pump 💊', 'Unregulated 🏴‍☠️', 'Trending 🔥', 'New Listings', 'GTA VI'];

function SubHeader({ activeFilter, onFilter, onSubmit }) {
  return (
    <div className="subheader">
      <div className="filter-tabs">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`filter-tab${activeFilter === f ? ' active' : ''}`}
            onClick={() => { onFilter && onFilter(f); }}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="subheader-right">
        <button
          onClick={() => onSubmit && onSubmit()}
          style={{
            background: 'var(--green)',
            color: '#000',
            padding: '4px 12px',
            borderRadius: '16px',
            fontWeight: 'bold',
            fontSize: '12px',
            border: '2px solid #fff',
            cursor: 'pointer',
          }}
        >
          Deploy a Stock
        </button>
        <span className="live-dot">LIVE</span>
      </div>
    </div>
  );
}

export default SubHeader;
