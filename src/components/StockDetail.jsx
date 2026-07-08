import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
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
            <div 
              className="ca-pill" 
              style={{ fontSize: '11px', color: 'var(--text-2)', background: 'var(--bg-2)', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-1)', cursor: 'pointer', userSelect: 'all' }}
              onClick={() => {
                const caText = stock.contract === 'PUMP' ? 'TBD1111111111111111111111111111111111111111' : stock.contract;
                navigator.clipboard.writeText(caText);
                alert('Copied CA: ' + caText);
              }}
            >
              CA: {stock.contract === 'PUMP' ? 'TBD1111111111111111111111111111111111111111' : stock.contract}
            </div>
          )}
        </div>
      </div>

      {/* Clean Chart Area */}
      <div className="minimal-chart-container" style={{ padding: (stock.contract && stock.contract !== 'PUMP') ? '0' : '20px 0 0 0' }}>
        {(stock.contract && stock.contract !== 'PUMP') ? (
          <iframe 
            width="100%" 
            height="400" 
            src={`https://dexscreener.com/solana/${stock.contract}?embed=1&theme=dark`} 
            frameBorder="0"
            style={{ borderRadius: '8px' }}
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
