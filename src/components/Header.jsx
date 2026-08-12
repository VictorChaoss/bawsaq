import React, { useState } from 'react';
import { Search, Bell, Settings, ChevronDown, Zap } from 'lucide-react';
import { mockStocks } from '../data/stocks';
import './Header.css';

function TickerItem({ item }) {
  let statusText = '⬜ DEPLOY';
  let color = 'var(--text-3)';
  
  if (item.status === 'live') {
    statusText = '🟢 LIVE';
    color = 'var(--green)';
  } else if (item.status === 'launching') {
    statusText = '🟡 LAUNCHING';
    color = '#F59E0B';
  } else if (item.ticker === 'BSQ') {
    statusText = '★ NATIVE';
    color = 'var(--green)';
  }

  return (
    <div className="ticker-item">
      <span style={{ color: 'var(--text-2)' }}>{item.ticker}</span>
      <span style={{ color: color, fontWeight: 700, fontSize: '11px', letterSpacing: '1px' }}>{statusText}</span>
      <div className="ticker-dot" style={{ background: color }} />
    </div>
  );
}

function Header({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [logoError, setLogoError] = useState(false);
  
  // Use a slice of the real stocks for the ticker tape to keep it readable
  const displayStocks = mockStocks.slice(0, 15);
  const doubled = [...displayStocks, ...displayStocks];

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
            {['Discover', 'Explore', 'Tokenomics', 'News', 'Socials', 'About'].map(tab => (
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
