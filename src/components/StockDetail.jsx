import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, ChevronDown, ChevronUp, Copy } from 'lucide-react';
import './StockDetail.css';
import { stockImageMap } from '../data/imageMap.js';

// Generate a fake chart path based on whether stock is trending up or down
function generatePath(isPositive, width = 800, height = 200) {
  const points = [];
  let y = isPositive ? height * 0.8 : height * 0.2;
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const drift = isPositive ? -2 : 2;
    const noise = (Math.random() - 0.45) * 20;
    y = Math.max(10, Math.min(height - 10, y + drift + noise));
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(' ');
}

function FakeChart({ isPositive }) {
  const path = generatePath(isPositive);
  const strokeColor = isPositive ? '#39FF14' : '#FF2D55';

  return (
    <svg className="fake-chart-svg" viewBox="0 0 800 200" preserveAspectRatio="none">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={path} fill="url(#chartGrad)" stroke="none" className="chart-area-fill" />
      <polyline points={path} stroke={strokeColor} strokeWidth="2" fill="none" style={{ filter: `drop-shadow(0 0 6px ${strokeColor}44)` }} />
    </svg>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="accordion">
      <button className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}

function StockDetail({ stock, onBack }) {
  const isPositive = stock.change24h >= 0;

  // Description format has literal \n
  const fullDesc = stock.desc ? stock.desc.replace(/\\n/g, '\n') : '';
  const paragraphs = fullDesc.split('\n\n').filter(p => p.trim() !== '');
  const overview = paragraphs.length > 0 ? paragraphs[0] : '';
  const history = paragraphs.slice(1).join('\n\n');

  return (
    <div className="minimal-detail-wrap">
      <button className="back-btn-minimal" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Directory
      </button>

      {/* Header */}
      <div className="minimal-header">
        <div className="header-left">
          <div className="logo-box">
            {stockImageMap[stock.ticker] ? (
              <img src={stockImageMap[stock.ticker]} alt={stock.ticker} />
            ) : (
              <span style={{ color: stock.color }}>{stock.ticker.slice(0, 2)}</span>
            )}
          </div>
          <div className="header-info">
            <h1>{stock.name}</h1>
            <div className="ticker-row">
              <span className="ticker">${stock.ticker}</span>
              <span className="dot">·</span>
              <span className="sector">{stock.sector}</span>
            </div>
          </div>
        </div>
        <div className="header-right" style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <a href={`https://pump.fun/coin/${stock.contract || ''}`} target="_blank" rel="noreferrer" className="pump-btn">
            Trade on Pump.fun <ExternalLink size={14} />
          </a>
          {stock.contract && (
            stock.contract === 'PUMP' ? (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'rgba(0,255,102,0.07)', padding: '5px 12px',
                borderRadius: '999px', border: '1px solid rgba(0,255,102,0.25)',
                animation: 'pulse-green 2s ease-in-out infinite'
              }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse-green 1.5s ease-in-out infinite' }} />
                <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: 'var(--green)', textTransform: 'uppercase', fontFamily: 'monospace' }}>CA Launching Soon</span>
              </div>
            ) : (
              <div
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', background: 'var(--bg-3)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-2)', cursor: 'pointer', userSelect: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-4)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-3)'}
                onClick={() => {
                  navigator.clipboard.writeText(stock.contract);
                  alert('CA copied!');
                }}
              >
                <span style={{ color: 'var(--text-2)' }}>CA:</span>
                <span style={{ fontFamily: 'monospace' }}>{stock.contract.slice(0, 8)}...{stock.contract.slice(-4)}</span>
                <Copy size={14} style={{ color: 'var(--text-2)', marginLeft: '4px' }} />
              </div>
            )
          )}
        </div>
      </div>

      {/* Clean Chart Area */}
      <div className={`minimal-chart-container${(stock.contract && stock.contract !== 'PUMP') ? '' : ' fake-chart-wrap'}`}>
        {(stock.contract && stock.contract !== 'PUMP') ? (
          <iframe
            src={`https://dexscreener.com/solana/${stock.contract}?embed=1&theme=dark&info=0&trades=0`}
            allowFullScreen
          ></iframe>
        ) : (
          <>
            <div className="chart-overlay-stats">
              <div className="stat-price">
                {isPositive ? <TrendingUp size={24} color="var(--green)" /> : <TrendingDown size={24} color="var(--red)" />}
                <span style={{ color: isPositive ? 'var(--green)' : 'var(--red)' }}>
                  {isPositive ? '+' : ''}{stock.change24h}%
                </span>
              </div>
            </div>
            <FakeChart isPositive={isPositive} />
          </>
        )}
      </div>

      {/* Expandable Content Area */}
      <div className="minimal-content">
        <div className="overview-text">
          {overview}
        </div>

        {history && (
          <Accordion title="Company History">
            <p className="history-text">{history}</p>
          </Accordion>
        )}

        <Accordion title="Corporate Data" defaultOpen={true}>
          <div className="data-grid">
            <div className="data-item">
              <span className="data-label">Sector</span>
              <span className="data-val">{stock.sector}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Exchange</span>
              <span className="data-val">{stock.exchange}</span>
            </div>
            <div className="data-item">
              <span className="data-label">Headquarters</span>
              <span className="data-val">Los Santos, SA</span>
            </div>
            <div className="data-item">
              <span className="data-label">Risk Level</span>
              <span className="data-val">{stock.risk}</span>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default StockDetail;
