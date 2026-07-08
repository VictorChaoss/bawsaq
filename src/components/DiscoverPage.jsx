import React, { useRef } from 'react';
import { ArrowRight, Coins, Newspaper, TrendingUp, ShieldCheck, Copy, HelpCircle } from 'lucide-react';
import { mockStocks } from '../data/stocks';
import './DiscoverPage.css';

function TickerTape() {
  const scrollStocks = mockStocks.slice(0, 20);
  return (
    <div className="ticker-tape-container">
      <div className="ticker-tape-track">
        {[...scrollStocks, ...scrollStocks].map((stock, i) => (
          <div key={i} className="ticker-item">
            <span className="ticker-symbol">{stock.ticker}</span>
            <span className="ticker-price">{stock.price}</span>
            <span className={`ticker-change ${stock.change24h >= 0 ? 'text-green' : 'text-red'}`}>
              {stock.change24h >= 0 ? '+' : ''}{stock.change24h}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HoverCard({ children, className, glowColor }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      className={`discover-card ${className || ''}`}
      onMouseMove={handleMouseMove}
      style={{ '--glow-color': glowColor }}
    >
      {children}
    </div>
  );
}

function DiscoverPage({ setActiveTab }) {
  return (
    <div className="discover-page">
      <TickerTape />
      <div className="discover-hero">
        <div className="discover-hero-inner">
          <div className="discover-eyebrow">The Ecosystem</div>
          <h1 className="discover-title">The GTA Stock Market, Live on Solana</h1>
          <p className="discover-subtitle">
            Trade your favorite Grand Theft Auto companies as real crypto tokens. 
            BAWSAQ is the iconic in-game stock exchange, brought on-chain to Solana.
          </p>
        </div>
      </div>

      {/* Live Stats Banner */}
      <div className="stats-banner">
        <div className="stat-item">
          <span className="stat-val">83</span>
          <span className="stat-label">Tokens Listed</span>
        </div>
        <div className="stat-item">
          <span className="stat-val">1.4M</span>
          <span className="stat-label">$BSQ Burned</span>
        </div>
        <div className="stat-item">
          <span className="stat-val">$4.2M</span>
          <span className="stat-label">24h Volume</span>
        </div>
      </div>

      <div className="discover-grid">
        {/* WTF is BAWSAQ? */}
        <HoverCard glowColor="rgba(255, 255, 255, 0.15)">
          <div className="card-icon-wrap" style={{ background: 'rgba(255,255,255,0.1)' }}>
            <HelpCircle size={24} color="#fff" />
          </div>
          <h2 className="card-title">WTF is BAWSAQ?</h2>
          <p className="card-desc">
            If you've played GTA V, you know <strong>BAWSAQ</strong>. It's the notorious in-game stock market where players trade fictional companies like Ammu-Nation, Cluckin' Bell, and Los Santos Customs.
          </p>
          <p className="card-desc mt-2">
            We brought those iconic companies out of the game and onto the Solana blockchain. You're no longer just pretending to trade—you are buying and selling real GTA-themed meme tokens on a fully functional, decentralized terminal.
          </p>
        </HoverCard>

        {/* Token Listings */}
        <HoverCard glowColor="rgba(0, 255, 102, 0.15)">
          <div className="card-icon-wrap bg-green-tint">
            <Coins size={24} color="var(--green)" />
          </div>
          <h2 className="card-title">Token Deployment & Listings</h2>
          <p className="card-desc">
            Want to see your GTA-themed token listed on the BAWSAQ terminal? It's fully automated. 
            When people deploy a token and direct a portion of the funds to the native $BSQ token deployer wallet, 
            the token automatically gets listed on the BAWSAQ exchange.
          </p>
          <ul className="card-list">
            <li><ShieldCheck size={16} /> Deploy a token on Solana.</li>
            <li><ShieldCheck size={16} /> Route deployment funds to the BAWSAQ deployer.</li>
            <li><ShieldCheck size={16} /> Get instantly listed in the "New Listings" and "Live on Pump" tabs.</li>
          </ul>
        </HoverCard>

        {/* GTA News Hub */}
        <HoverCard glowColor="rgba(59, 130, 246, 0.15)">
          <div className="card-icon-wrap bg-blue-tint">
            <Newspaper size={24} color="var(--blue)" />
          </div>
          <h2 className="card-title">The GTA News Hub</h2>
          <p className="card-desc">
            The market never sleeps, and neither does the rumor mill. BAWSAQ tracks all the latest 
            Grand Theft Auto news, from official Rockstar announcements to GTA 6 leaks. 
          </p>
          <p className="card-desc mt-2">
            This news directly drives the market. A positive trailer drop could send $GTAVI tokens soaring, 
            while delays might cause a dip. Keep your eyes on the News tab to stay ahead of the curve and 
            capitalize on breaking info before the rest of the market catches on.
          </p>
        </HoverCard>

        {/* The Native Token */}
        <HoverCard className="full-width" glowColor="rgba(168, 85, 247, 0.15)">
          <div className="card-icon-wrap bg-purple-tint">
            <TrendingUp size={24} color="var(--purple)" />
          </div>
          <h2 className="card-title">The Native Token ($BSQ)</h2>
          <p className="card-desc">
            At the heart of the ecosystem is the <strong>$BSQ</strong> token. The terminal is designed to capture value 
            and feed it back to $BSQ holders. 
          </p>
          <div className="token-mechanics">
            <div className="mechanic">
              <h3>Volume Fees</h3>
              <p>A percentage of all trading volume across listed tokens is used to buy back and burn $BSQ.</p>
            </div>
            <div className="mechanic">
              <h3>Listing Revenue</h3>
              <p>Funds routed to the deployer for automatic listings are injected directly into the $BSQ liquidity pool.</p>
            </div>
            <div className="mechanic">
              <h3>Premium Features</h3>
              <p>Holding $BSQ unlocks premium terminal features, including advanced charting, early listing alerts, and zero-fee routing.</p>
            </div>
            <div className="mechanic" style={{ marginTop: '16px' }}>
              <h3 style={{ color: 'var(--text-1)' }}>Official Contract Address</h3>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(0,255,102,0.07)', padding: '6px 14px',
                borderRadius: '999px', border: '1px solid rgba(0,255,102,0.25)',
                marginTop: '10px'
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'blink 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: 'var(--green)', textTransform: 'uppercase', fontFamily: 'monospace' }}>CA Launching Soon</span>
              </div>
              <p style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-3)' }}>Ensure you are only interacting with this official contract address to avoid scams.</p>
            </div>
          </div>
        </HoverCard>
      </div>

      {/* Terminal Wizard: How to Buy */}
      <div className="wizard-section">
        <h2 className="wizard-title">How to Buy $BSQ</h2>
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="term-dot red" />
            <div className="term-dot yellow" />
            <div className="term-dot green" />
          </div>
          <div className="terminal-body">
            <div className="term-step">
              <span className="step-num">01.</span>
              <div className="step-content">
                <h4>Get Phantom Wallet</h4>
                <p>Download Phantom or another Solana-compatible wallet to hold your funds.</p>
              </div>
            </div>
            <div className="term-step">
              <span className="step-num">02.</span>
              <div className="step-content">
                <h4>Bridge SOL</h4>
                <p>Transfer Solana (SOL) to your wallet. You'll need it to swap for $BSQ and pay for network fees.</p>
              </div>
            </div>
            <div className="term-step">
              <span className="step-num">03.</span>
              <div className="step-content">
                <h4>Swap for $BSQ</h4>
                <p>Use Jupiter or Raydium to swap your SOL for $BSQ. <span className="term-cursor"></span></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to dive into the market?</h2>
        <button className="btn-primary" onClick={() => setActiveTab('Explore')}>
          Explore the Exchange <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default DiscoverPage;
