import React from 'react';
import { mockStocks } from '../data/stocks';
import { stockImageMap } from '../data/imageMap.js';
import './StockTable.css';

function StockRow({ stock, index, onClick }) {
  const isNative = stock.ticker === 'BSQ';

  const getStatusBadge = () => {
    if (stock.status === 'live') return <span className="status-badge live"><span className="dot"></span>Live on Pump</span>;
    if (stock.status === 'launching') return <span className="status-badge launching"><span className="dot"></span>Launching Soon</span>;
    return <span className="status-badge undeployed">Not Yet Deployed</span>;
  };

  const getActionText = () => {
    if (stock.status === 'live') return 'Trade →';
    if (stock.status === 'launching') return 'View →';
    return 'Deploy on Pump →';
  };

  return (
    <div
      className={`stock-row${isNative ? ' native' : ''}`}
      onClick={onClick}
    >
      {/* Color accent bar */}
      <div className="row-accent" style={{ background: stock.color }} />

      <div className="col-num">{index + 1}</div>

      {/* Token identity */}
      <div className="col-token">
        <div
          className="token-avatar"
          style={{ background: stock.color + '22', border: `1px solid ${stock.color}44` }}
        >
          {stockImageMap[stock.ticker] ? (
            <img src={stockImageMap[stock.ticker]} alt={stock.ticker} style={{width:'100%', height:'100%', objectFit:'contain', borderRadius: '8px'}} />
          ) : (
            <span style={{ color: stock.color }}>{stock.ticker.slice(0, 2)}</span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="token-name">{stock.ticker}</span>
            {isNative && <span className="native-badge">★ NATIVE</span>}
          </div>
          <div className="token-sub">
            <span className="text-2 text-xs">{stock.name}</span>
          </div>
        </div>
      </div>

      <div className="col-exchange">
        <span className="info-tag">{stock.exchange}</span>
      </div>
      
      <div className="col-sector">
        <span className="info-tag">{stock.sector}</span>
      </div>

      <div className="col-status">
        {getStatusBadge()}
      </div>

      <div className="col-action">
        <button className="btn-trade" onClick={e => { e.stopPropagation(); onClick(); }}>
          {getActionText()}
        </button>
      </div>
    </div>
  );
}

function StockTable({ filter, onSelectStock, searchQuery }) {
  const filteredStocks = mockStocks.filter(s => {
    if (searchQuery) {
      return (
        s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === 'Community Customs 🔧') return !!s.unregulated;
    if (s.unregulated) return false; // Exclude unregulated from all other tabs
    
    if (filter === 'All' || !filter) return true;
    if (filter === 'Live on Pump 💊') return s.status === 'live';
    if (['Finance', 'Beverages', 'Defense', 'Tech'].includes(filter)) {
      return s.sector && s.sector.includes(filter);
    }
    return true; // default
  });

  return (
    <div className="stock-table-wrap">
      {filter === 'Community Customs 🔧' && (
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{
            background: 'rgba(0, 255, 102, 0.15)',
            border: '1px solid rgba(0, 255, 102, 0.3)',
            borderRadius: '12px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#fff' }}>The Central Hub for GTA Stocks</h3>
            <p style={{ color: 'var(--text-2)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              Want to see your GTA-themed token listed on the terminal? It's fully automated. Deploy your stock on Pump.fun and route a portion of your creator fees to the <strong style={{color:'var(--green)'}}>$BSQ Dev Wallet</strong>. Once received, your token instantly lists on BAWSAQ. All redirected fees flow directly into the native <strong style={{color:'var(--green)'}}>$BSQ</strong> token, creating a self-sustaining ecosystem.
            </p>
          </div>
        </div>
      )}
      <div className="table-head">
        <div className="col-num">#</div>
        <div className="col-token">Company</div>
        <div className="col-exchange">Exchange</div>
        <div className="col-sector">Sector</div>
        <div className="col-status">Status</div>
        <div className="col-action"></div>
      </div>

      {/* Rows */}
      <div className="table-body">
        {filteredStocks.length > 0 ? (
          filteredStocks.map((stock, i) => (
            <StockRow
              key={stock.id}
              stock={stock}
              index={i}
              onClick={() => onSelectStock(stock)}
            />
          ))
        ) : (
          <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-3)' }}>
            No stocks found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}

export default StockTable;
