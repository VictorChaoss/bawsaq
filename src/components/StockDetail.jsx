import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Copy, Share2, ChevronDown, ChevronUp, Rocket, Clock, Gift, RefreshCw } from 'lucide-react';
import './StockDetail.css';
import { stockImageMap } from '../data/imageMap.js';
import NativeChart from './NativeChart';

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
  const [copied, setCopied] = useState(false);

  const isLive = stock.contract && stock.contract !== 'PUMP';
  const isLaunching = stock.contract === 'PUMP';

  // Description format has literal \n
  const fullDesc = stock.desc ? stock.desc.replace(/\\n/g, '\n') : '';
  const paragraphs = fullDesc.split('\n\n').filter(p => p.trim() !== '');
  const overview = paragraphs.length > 0 ? paragraphs[0] : '';
  const history = paragraphs.slice(1).join('\n\n');

  const handleCopyCA = () => {
    navigator.clipboard.writeText(stock.contract);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    const text = `Tracking $${stock.ticker} — ${stock.name} on BAWSAQ 📈\nThe GTA stock market is live on Solana\n`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://bawsaq.xyz')}`;
    window.open(url, '_blank');
  };

  // Status badge
  const statusBadge = isLive
    ? <span className="status-badge status-live"><span className="status-dot dot-green" /> LIVE</span>
    : isLaunching
      ? <span className="status-badge status-launching"><span className="status-dot dot-amber" /> LAUNCHING SOON</span>
      : <span className="status-badge status-not-deployed"><span className="status-dot dot-gray" /> NOT DEPLOYED</span>;

  return (
    <div className="sd-wrap">
      <button className="sd-back" onClick={onBack}>
        <ArrowLeft size={16} /> Back to Directory
      </button>

      {/* Header */}
      <div className="sd-header">
        <div className="sd-header-top">
          <div className="sd-identity">
            <div className="sd-logo">
              {stockImageMap[stock.ticker] ? (
                <img src={stockImageMap[stock.ticker]} alt={stock.ticker} />
              ) : (
                <span className="sd-logo-fallback" style={{ color: stock.color }}>{stock.ticker.slice(0, 2)}</span>
              )}
            </div>
            <div className="sd-name-block">
              <div className="sd-name-row">
                <h1 className="sd-company-name">{stock.name}</h1>
                {statusBadge}
              </div>
              <div className="sd-tags">
                <span className="sd-tag sd-tag-ticker">${stock.ticker}</span>
                <span className="sd-tag sd-tag-sector">{stock.sector}</span>
                <span className="sd-tag sd-tag-exchange">{stock.exchange}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions row */}
        <div className="sd-actions">
          <button className="sd-btn sd-btn-ghost" onClick={handleShare}>
            <Share2 size={14} /> Share
          </button>
          {isLive && (
            <>
              <button className="sd-btn sd-btn-ghost" onClick={handleCopyCA}>
                <Copy size={14} />
                {copied ? 'Copied!' : `${stock.contract.slice(0, 6)}…${stock.contract.slice(-4)}`}
              </button>
              {stock.exchange === 'STONK' ? (
                <a
                  href={`https://www.stonkfun.xyz/token/${stock.contract}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sd-btn sd-btn-primary"
                >
                  Trade on StonkFun <ExternalLink size={14} />
                </a>
              ) : (
                <a
                  href={`https://pump.fun/coin/${stock.contract}`}
                  target="_blank"
                  rel="noreferrer"
                  className="sd-btn sd-btn-primary"
                >
                  Trade on Pump.fun <ExternalLink size={14} />
                </a>
              )}
            </>
          )}
        </div>
      </div>

      <div className="sd-divider" />

      {/* Main content area — two states */}
      {isLive ? (
        /* State A: Token is Live */
        <div className="sd-chart-section">
          {(stock.contract?.endsWith('pump') || stock.exchange === 'STONK') && (
            <div style={{ background: 'rgba(255, 170, 0, 0.1)', color: '#ffaa00', padding: '8px 12px', fontSize: '12px', textAlign: 'center', borderBottom: '1px solid rgba(255, 170, 0, 0.2)' }}>
              Note: Charts for early-stage tokens may take time to index. If it's stuck loading, click "Trade on {stock.exchange === 'STONK' ? 'StonkFun' : 'Pump.fun'}" to view live data.
            </div>
          )}
          <div className="sd-chart-iframe-container" style={{ width: '100%', height: '500px' }}>
            <NativeChart contractAddress={stock.contract} />
          </div>
          {stock.exchange === 'STONK' && (
            <div className="stonk-rewards-container">
              <div className="stonk-card">
                <div className="stonk-card-header">
                  <div className="stonk-card-title">
                    <Gift size={16} className="stonk-icon" /> Holder rewards
                  </div>
                </div>
                <p className="stonk-card-desc">
                  85% of every trading fee on this 4% pool is paid out to ${stock.ticker} holders in TTWO, pro-rata, less a 2.50% fee covering the network costs of distributing and supporting operations. Fees collect until they are worth distributing, then go to wallets holding at least $20 of ${stock.ticker} at that moment.
                </p>
                
                <div className="stonk-stats-grid">
                  <div className="stonk-stat">
                    <div className="stonk-stat-label">Paid to holders</div>
                    <div className="stonk-stat-val">$0</div>
                    <div className="stonk-stat-sub">0 TTWO</div>
                  </div>
                  <div className="stonk-stat">
                    <div className="stonk-stat-label">Waiting to distribute</div>
                    <div className="stonk-stat-val">$0</div>
                  </div>
                </div>
                
                <div className="stonk-card-footer">
                  0 payouts · pending
                </div>
              </div>

              <div className="stonk-card">
                <div className="stonk-card-header">
                  <div className="stonk-card-title">
                    <RefreshCw size={16} className="stonk-icon" /> Ecosystem Flywheel
                  </div>
                  <span className="stonk-badge">Active</span>
                </div>
                <p className="stonk-card-desc">
                  ${stock.ticker} is in the flywheel's top rankings: platform revenue buys it back and burns it every few minutes, weighted by market cap. <span className="text-green cursor-pointer">View the flywheel</span>
                </p>
                
                <div className="stonk-stats-grid">
                  <div className="stonk-stat">
                    <div className="stonk-stat-label">Bought back & burned</div>
                    <div className="stonk-stat-val">$0</div>
                  </div>
                  <div className="stonk-stat">
                    <div className="stonk-stat-label">Buybacks</div>
                    <div className="stonk-stat-val">0</div>
                    <div className="stonk-stat-sub">pending</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* State B: Token Not Yet Live */
        <div className="sd-deploy-section">
          {isLaunching ? (
            <div className="sd-deploy-card sd-deploy-launching">
              <div className="sd-deploy-icon sd-deploy-icon-amber">
                <Clock size={32} />
              </div>
              <h2 className="sd-deploy-title">Launching Soon</h2>
              <p className="sd-deploy-text">
                This stock is being prepared for launch.
              </p>
              <span className="sd-launching-badge">
                <span className="status-dot dot-amber" /> Launching Soon
              </span>
            </div>
          ) : (
            <div className="sd-deploy-card sd-deploy-available">
              <div className="sd-deploy-icon sd-deploy-icon-green">
                <Rocket size={32} />
              </div>
              <h2 className="sd-deploy-title">Be the first to bring {stock.name} on-chain</h2>
              <p className="sd-deploy-text">
                Deploy this GTA stock as a token and it will be automatically listed on BAWSAQ.
              </p>
              <button
                disabled
                className="sd-btn sd-btn-deploy"
                style={{ cursor: 'not-allowed', opacity: 0.5 }}
              >
                <Rocket size={16} /> Deploy
              </button>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <div className="sd-content">
        {overview && (
          <p className="sd-overview">{overview}</p>
        )}

        {history && (
          <Accordion title="Company History">
            <p className="sd-history">{history}</p>
          </Accordion>
        )}

        <Accordion title="Corporate Data" defaultOpen={true}>
          <div className="sd-data-grid">
            <div className="sd-data-item">
              <span className="sd-data-label">Sector</span>
              <span className="sd-data-value">{stock.sector}</span>
            </div>
            <div className="sd-data-item">
              <span className="sd-data-label">Exchange</span>
              <span className="sd-data-value">{stock.exchange}</span>
            </div>
            <div className="sd-data-item">
              <span className="sd-data-label">Headquarters</span>
              <span className="sd-data-value">Los Santos, SA</span>
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default StockDetail;
