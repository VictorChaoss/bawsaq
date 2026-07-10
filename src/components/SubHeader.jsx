import React, { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import './SubHeader.css';

const FILTERS = ['All', 'Live on Pump 💊', 'Unregulated 🏴‍☠️', 'Trending 🔥', 'New Listings', 'GTA VI'];
const TIMEFRAMES = ['1H', '4H', '1D', '1W', '1M'];

function SubHeader({ activeFilter, onFilter, onSubmit }) {
  const [tf, setTf] = useState('1D');

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
        <div className="timeframe-group">
          {TIMEFRAMES.map(t => (
            <button
              key={t}
              className={`tf-btn${tf === t ? ' active' : ''}`}
              onClick={() => setTf(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="sort-btn">
          <SlidersHorizontal size={12} />
          Filters
        </button>
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
            marginLeft: '8px',
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
