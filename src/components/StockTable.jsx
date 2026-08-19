import React, { useEffect, useState } from 'react';
import { mockStocks } from '../data/stocks';
import { stockImageMap } from '../data/imageMap.js';
import { playHoverSound, playSelectSound } from '../utils/soundManager';
import './StockTable.css';

const formatMcap = (val) => {
  if (!val) return '--';
  if (val >= 1000000000) return '$' + (val / 1000000000).toFixed(2) + 'B';
  if (val >= 1000000) return '$' + (val / 1000000).toFixed(2) + 'M';
  if (val >= 1000) return '$' + (val / 1000).toFixed(2) + 'K';
  return '$' + val.toFixed(2);
};

function StockRow({ stock, index, onClick, marketCap, isMcapView }) {
  const isNative = stock.ticker === 'BSQ';

  const getStatusBadge = () => {
    if (stock.status === 'live') return <span className="status-badge live"><span className="dot"></span>Live</span>;
    if (stock.status === 'launching') return <span className="status-badge launching"><span className="dot"></span>Launching Soon</span>;
    return <span className="status-badge undeployed">Not Yet Deployed</span>;
  };

  const getActionText = () => {
    if (stock.status === 'live') return 'Trade →';
    if (stock.status === 'launching') return 'View →';
    return 'Deploy →';
  };

  return (
    <div
      className={`stock-row${isNative ? ' native' : ''}`}
      onClick={() => { playSelectSound(); onClick(); }}
      onMouseEnter={playHoverSound}
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
      
      {isMcapView ? (
        <div className="col-mcap">
          <span className="info-tag" style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--green)' }}>
            {marketCap ? formatMcap(marketCap) : '--'}
          </span>
        </div>
      ) : (
        <div className="col-sector">
          <span className="info-tag">{stock.sector}</span>
        </div>
      )}

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
  const [marketCaps, setMarketCaps] = useState({});

  const filteredStocks = mockStocks.filter(s => {
    if (searchQuery) {
      return (
        s.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filter === 'GTA Related Tokens') return !!s.unregulated;
    if (s.unregulated) return false; // Exclude unregulated from all other tabs
    
    if (filter === 'All' || !filter) return true;
    if (filter === 'Live on Pump 💊') return s.status === 'live';
    if (['Finance', 'Beverages', 'Defense', 'Tech'].includes(filter)) {
      return s.sector && s.sector.includes(filter);
    }
    return true; // default
  });

  const contractsString = JSON.stringify(
    filteredStocks.filter(s => s.status === 'live' && s.contract).map(s => s.contract)
  );

  useEffect(() => {
    const contracts = JSON.parse(contractsString);
    if (contracts.length === 0) return;
    
    const fetchMarketCaps = async () => {
      try {
        const chunks = [];
        for (let i = 0; i < contracts.length; i += 30) {
            chunks.push(contracts.slice(i, i + 30).join(','));
        }
        
        const caps = { ...marketCaps };
        let hasNew = false;
        
        for (const chunk of chunks) {
            const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${chunk}`);
            const data = await res.json();
            
            if (data.pairs) {
                data.pairs.forEach(pair => {
                    const addr = pair.baseToken.address;
                    if (!caps[addr] || (pair.fdv || pair.marketCap) > caps[addr]) {
                        caps[addr] = pair.fdv || pair.marketCap;
                        hasNew = true;
                    }
                });
            }
        }
        if (hasNew) {
            setMarketCaps(caps);
        }
      } catch (err) {
        console.error("Failed to fetch market caps:", err);
      }
    };
    
    fetchMarketCaps();
  }, [contractsString]);

  const isMcapView = filter === 'GTA Related Tokens';

  return (
    <div className="stock-table-wrap">
      <div className="table-head">
        <div className="col-num">#</div>
        <div className="col-token">Company</div>
        <div className="col-exchange">Exchange</div>
        {isMcapView ? (
          <div className="col-mcap">M.Cap</div>
        ) : (
          <div className="col-sector">Sector</div>
        )}
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
                marketCap={marketCaps[stock.contract]}
                isMcapView={isMcapView}
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
