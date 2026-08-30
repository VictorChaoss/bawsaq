import React, { useRef, useState, useEffect } from 'react';
import { mockStocks, nativeToken } from '../data/stocks';
import { ArrowRight, Coins, Newspaper, TrendingUp, ShieldCheck, Copy, HelpCircle } from 'lucide-react';
import GTACountdown from './GTACountdown';
import './DiscoverPage.css';

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
  const [volume, setVolume] = useState(0);

  const liveTokensCount = mockStocks.filter(s => s.contract && s.contract !== 'PUMP').length;

  useEffect(() => {
    if (nativeToken.contract) {
      fetch(`https://api.dexscreener.com/latest/dex/tokens/${nativeToken.contract}`)
        .then(res => res.json())
        .then(data => {
          if (data.pairs && data.pairs.length > 0) {
            data.pairs.sort((a,b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
            setVolume(data.pairs[0].volume?.h24 || 0);
          }
        })
        .catch(console.error);
    }
  }, []);

  const formatCurrency = (val) => {
    if (val >= 1000000) return '$' + (val / 1000000).toFixed(2) + 'M';
    if (val >= 1000) return '$' + (val / 1000).toFixed(2) + 'K';
    return '$' + val.toFixed(2);
  };

  return (
    <div className="discover-page">
      <div className="discover-hero">
        <div className="discover-hero-inner">
          <div className="discover-eyebrow">The Ecosystem</div>
          <h1 className="discover-title">The GTA Stock Market, Live on Solana</h1>
          <p className="discover-subtitle">
            Trade your favorite Grand Theft Auto companies as real crypto tokens. 
            BAWSAQ is the iconic in-game stock exchange, brought on-chain.
          </p>
        </div>
      </div>

      {/* Live Stats Banner */}
      <div className="stats-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
        <div className="stat-item">
          <span className="stat-val">{liveTokensCount}</span>
          <span className="stat-label">Tokens Listed</span>
        </div>
        <div className="stat-item">
          <span className="stat-val">0</span>
          <span className="stat-label">$BAWSAQ Burned</span>
        </div>
        <div className="stat-item">
          <span className="stat-val">{volume > 0 ? formatCurrency(volume) : '$0'}</span>
          <span className="stat-label">24h Volume</span>
        </div>
      </div>

      {/* CA Placeholder */}
      <div className="ca-bar">
        <div className="ca-bar-inner">
          <span className="ca-pulse" />
          <span className="ca-label">$BAWSAQ Contract Address</span>
          <div className="ca-address-box">
            <span className="ca-address">{nativeToken.contract || 'LAUNCHING SOON'}</span>
            <button 
              className="ca-copy-btn"
              onClick={(e) => {
                const btn = e.currentTarget;
                if(nativeToken.contract) navigator.clipboard.writeText(nativeToken.contract);
                btn.classList.add('copied');
                setTimeout(() => btn.classList.remove('copied'), 1500);
              }}
              title="Copy CA"
            >
              <Copy size={14} />
              <span className="ca-copy-label">Copy</span>
            </button>
          </div>
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
            We brought those iconic companies out of the game and onto the Robinhood Chain. You're no longer just pretending to trade, you are buying and selling real GTA-themed meme tokens on a fully functional, decentralized terminal.
          </p>
          <p className="card-desc mt-2" style={{ color: '#00ff66' }}>
            <strong>Why Robinhood Chain?</strong> Solana became a PvP warzone driven by fleeting hype and pump-and-dump rug culture. Robinhood Chain investors respect hold culture. They understand that to build a multi-million dollar ecosystem—especially one tracking the real-world Take-Two Interactive (TTWO) tokenized stock—you need patience, diamond hands, and a community that actually holds the line.
          </p>
        </HoverCard>

        {/* Token Listings */}
        <HoverCard glowColor="rgba(0, 255, 102, 0.15)">
          <div className="card-icon-wrap bg-green-tint">
            <Coins size={24} color="var(--green)" />
          </div>
          <h2 className="card-title">Token Deployment & Listings</h2>
          <p className="card-desc">
            Want to see your GTA-themed token listed on the BAWSAQ terminal? Our platform is designed to track and verify the top GTA tokens on the blockchain. Contact our team on X or Telegram to apply for a listing and a rapid security review before going live on the BAWSAQ exchange.
          </p>
          <ul className="card-list">
            <li><ShieldCheck size={16} /> Contact us with your token details.</li>
            <li><ShieldCheck size={16} /> We perform a strict security review.</li>
            <li><ShieldCheck size={16} /> Verified tokens get listed on the terminal.</li>
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
          <h2 className="card-title">The Native Token ($BAWSAQ)</h2>
          <p className="card-desc">
            At the heart of the ecosystem is the <strong>$BAWSAQ</strong> token. The BAWSAQ token runs on a revolutionary <strong>dividend model</strong> designed to capture value and feed it back to holders. 
          </p>
          <div className="token-mechanics">
            <div className="mechanic">
              <h3>Memestonk Dividends</h3>
              <p>You launch from your wallet. Memestonk receives creator fees and uses them to airdrop stock dividends straight to your wallet.</p>
            </div>
            <div className="mechanic">
              <h3>Passive Yield</h3>
              <p>No complicated taxes or staking required. You accumulate tokenized Take-Two (Rockstar) shares simply by holding $BAWSAQ.</p>
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
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: 'var(--green)', textTransform: 'uppercase', fontFamily: 'monospace' }}>{nativeToken.contract || 'CA Launching Soon'}</span>
              </div>
              <p style={{ fontSize: '12px', marginTop: '8px', color: 'var(--text-3)' }}>Ensure you are only interacting with this official contract address to avoid scams.</p>
            </div>
          </div>
        </HoverCard>
      </div>

      {/* Terminal Wizard: How to Buy */}
      {/* GTA VI Countdown */}
      <GTACountdown />

      {/* GTA 6 Hype Banner */}
      <div style={{
        maxWidth: '1000px', margin: '0 auto 60px auto',
        background: 'linear-gradient(135deg, rgba(255,60,0,0.08) 0%, rgba(168,85,247,0.08) 50%, rgba(0,255,102,0.06) 100%)',
        border: '1px solid rgba(255,60,0,0.2)',
        borderRadius: '20px',
        padding: '48px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow orb */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(255,60,0,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,60,0,0.15)', border: '1px solid rgba(255,60,0,0.4)',
            borderRadius: '999px', padding: '4px 12px',
            fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px',
            color: '#ff6b35', textTransform: 'uppercase', fontFamily: 'monospace'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff6b35', display: 'inline-block', animation: 'blink 1.5s ease-in-out infinite' }} />
            GTA VI INCOMING
          </span>
        </div>
        <h2 style={{
          fontSize: '36px', fontWeight: '800', lineHeight: '1.2',
          marginBottom: '20px', letterSpacing: '-0.5px',
          background: 'linear-gradient(to right, #fff 0%, #ff6b35 60%, #a855f7 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          The BAWSAQ Thesis: The NASDAQ of GTA
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-2)', maxWidth: '680px', marginBottom: '16px' }}>
          The NASDAQ boasts a market cap of over $25 Trillion, serving as the ultimate hub for the world's most valuable tech companies. Grand Theft Auto VI is not just a video game; it is the biggest cultural and financial entertainment event of the decade.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--text-2)', maxWidth: '680px', marginBottom: '28px' }}>
          An event of this magnitude deserves true representation in the crypto trenches. BAWSAQ is the definitive, centralized hub for all GTA-related tokens, stocks, and on-chain assets. We are building the NASDAQ of the GTA universe, a single, premium interface to track, trade, and launch the economy of the biggest game ever made. Our ultimate goal is simple: to make <strong style={{ color: 'var(--text-1)' }}>$BAWSAQ</strong> the biggest and most valuable GTA token ever created.
        </p>
      </div>

      <div className="wizard-section">
        <h2 className="wizard-title">How to Buy $BAWSAQ</h2>
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
                <h4>Get Web3 Wallet</h4>
                <p>Download MetaMask, Robinhood Wallet, or any EVM-compatible wallet to hold your funds.</p>
              </div>
            </div>
            <div className="term-step">
              <span className="step-num">02.</span>
              <div className="step-content">
                <h4>Bridge Funds</h4>
                <p>Transfer ETH to the Robinhood Chain. You'll need it to swap for $BAWSAQ and pay for network fees.</p>
              </div>
            </div>
            <div className="term-step">
              <span className="step-num">03.</span>
              <div className="step-content">
                <h4>Swap for $BAWSAQ</h4>
                <p>Use Jupiter or Raydium to swap your SOL for $BAWSAQ. Make sure to set your slippage to at least 3-4% to account for the transfer tax. <span className="term-cursor"></span></p>
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
