import React, { useState, useEffect } from 'react';
import { Search, Bell, Settings, ChevronDown, Zap } from 'lucide-react';
import { mockStocks } from '../data/stocks';
import './Header.css';

function LiveTickerItem({ symbol, price, change, isUp }) {
  const color = isUp ? 'var(--green)' : '#EF4444';
  const icon = isUp ? '▲' : '▼';
  
  return (
    <div className="ticker-item">
      <span style={{ color: 'var(--text-2)', fontWeight: 600 }}>{symbol}</span>
      <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: '13px' }}>
        ${price.toFixed(2)}
      </span>
      <span style={{ color: color, fontWeight: 700, fontSize: '11px', letterSpacing: '0.5px' }}>
        {icon} {change}%
      </span>
      <div className="ticker-dot" style={{ background: color, marginLeft: '8px' }} />
    </div>
  );
}

function Header({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [logoError, setLogoError] = useState(false);
  
  // Simulated live prices for TTWO and BSQ
  const [prices, setPrices] = useState({
    TTWO: { price: 243.25, change: -2.89, isUp: false },
    BSQ: { price: 0.05, change: 12.4, isUp: true }
  });

  useEffect(() => {
    // Simulate live market updates every 3 seconds
    const interval = setInterval(() => {
      setPrices(prev => {
        // Random fluctuation between -0.5% and +0.5%
        const ttwoFluct = (Math.random() - 0.5) * 0.5;
        const bsqFluct = (Math.random() - 0.5) * 2.0; // Crypto is more volatile
        
        return {
          TTWO: {
            price: prev.TTWO.price * (1 + ttwoFluct / 100),
            change: prev.TTWO.change + ttwoFluct,
            isUp: prev.TTWO.change + ttwoFluct >= 0
          },
          BSQ: {
            price: prev.BSQ.price * (1 + bsqFluct / 100),
            change: prev.BSQ.change + bsqFluct,
            isUp: prev.BSQ.change + bsqFluct >= 0
          }
        };
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Repeat the two items to fill the marquee
  const displayStocks = [
    { symbol: 'TTWO', ...prices.TTWO },
    { symbol: 'BSQ', ...prices.BSQ },
    { symbol: 'TTWO', ...prices.TTWO },
    { symbol: 'BSQ', ...prices.BSQ },
    { symbol: 'TTWO', ...prices.TTWO },
    { symbol: 'BSQ', ...prices.BSQ },
    { symbol: 'TTWO', ...prices.TTWO },
    { symbol: 'BSQ', ...prices.BSQ },
    { symbol: 'TTWO', ...prices.TTWO },
    { symbol: 'BSQ', ...prices.BSQ },
  ];

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
          {displayStocks.map((item, i) => (
            <LiveTickerItem key={i} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Header;
