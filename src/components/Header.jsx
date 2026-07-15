import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, Zap } from 'lucide-react';
import './Header.css';

const TICKER_DATA = [
  { ticker: 'AMU',  price: '$2.1B',  change: +4.25 },
  { ticker: 'LFI',  price: '$845M',  change: -12.4 },
  { ticker: 'ECL',  price: '$1.4B',  change: +2.1  },
  { ticker: 'PIS',  price: '$4.2B',  change: +18.5 },
  { ticker: 'FLC',  price: '$385M',  change: -5.6  },
  { ticker: 'MAZ',  price: '$8.5B',  change: +1.2  },
  { ticker: 'BSQ',  price: '$142M',  change: +34.7 },
  { ticker: 'LSD',  price: '$67M',   change: -8.9  },
];

function TickerItem({ item }) {
  const pos = item.change >= 0;
  return (
    <div className="ticker-item">
      <span style={{ color: 'var(--text-2)' }}>{item.ticker}</span>
      <span style={{ color: 'var(--text-1)', fontWeight: 700 }}>{item.price}</span>
      <span style={{ color: pos ? 'var(--green)' : 'var(--red)' }}>
        {pos ? '+' : ''}{item.change}%
      </span>
      <div className="ticker-dot" style={{ background: pos ? 'var(--green)' : 'var(--red)' }} />
    </div>
  );
}

function Header({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [logoError, setLogoError] = useState(false);
  const doubled = [...TICKER_DATA, ...TICKER_DATA];

  return (
    <>
      <header className="header">
        <div className="header-left flex items-center">
          <div className="logo-wrap">
            {!logoError ? (
              <img
                src="/logo.jpeg"
                alt="BAWSAQ"
                className="logo-img"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="logo-fallback">BAWSAQ</span>
            )}
          </div>
          <nav className="main-nav">
            {['Discover', 'Explore', 'News', 'Socials', 'About'].map(tab => (
              <button
                key={tab}
                className={`nav-item${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="header-right flex items-center">
          <div className="search-wrap">
            <Search size={14} color="var(--text-3)" />
            <input 
              placeholder="Search token..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length > 0 && activeTab !== 'Explore') {
                  setActiveTab('Explore');
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Live scrolling ticker tape */}
      <div className="ticker-tape">
        <div className="ticker-scroll">
          {doubled.map((item, i) => <TickerItem key={i} item={item} />)}
        </div>
      </div>
    </>
  );
}

export default Header;
