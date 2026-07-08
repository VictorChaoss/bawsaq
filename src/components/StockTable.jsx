import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { mockStocks } from '../data/stocks';
import { stockImageMap } from '../data/imageMap.js';
import './StockTable.css';

function ChangeCell({ val }) {
  if (val === undefined || val === null) return <span className="text-3">—</span>;
  const pos = val >= 0;
  return (
    <span className={`chg-cell ${pos ? 'text-green' : 'text-red'}`}>
      {pos ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
      {pos ? '+' : ''}{val}%
    </span>
  );
}

function StockRow({ stock, index, onClick }) {
  const buyPct = 60; // mock buy/sell ratio
  const sellPct = 40;
  const isNative = stock.ticker === 'BSQ';

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
            <span className="sector-tag">{stock.sector}</span>
          </div>
        </div>
      </div>


      <div className="col-action">
        <button className="btn-trade" onClick={e => { e.stopPropagation(); }}>
          View Info
        </button>
        <span className="row-arrow">›</span>
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
    if (filter === 'Unregulated 🏴‍☠️') return !!s.unregulated;
    if (s.unregulated) return false; // Exclude unregulated from all other tabs
    
    if (filter === 'All' || !filter) return true;
    if (filter === 'Live on Pump 💊') return !!s.contract;
    if (filter === 'Trending 🔥') return s.change24h > 2; // mock logic
    if (filter === 'New Listings') return false; // mock logic for empty list
    if (filter === 'GTA VI') return false; // intentionally empty for now
    if (filter === 'Top Gainers') return s.change24h > 0;
    if (filter === 'Top Losers') return s.change24h < 0;
    if (['Finance', 'Beverages', 'Defense', 'Tech'].includes(filter)) {
      // In GTA universe some sectors: Diversified, Food/Beverage, Finance etc
      // We will do a substring match
      return s.sector && s.sector.includes(filter);
    }
    return true; // default
  });

  return (
    <div className="stock-table-wrap">
      <div className="table-head">
        <div className="col-num">#</div>
        <div className="col-token">Company</div>
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
