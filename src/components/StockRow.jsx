import React from 'react';
import { Globe, Shield, Activity, Users } from 'lucide-react';
import './StockTable.css';

function StockRow({ stock, onClick }) {
  const isPositive = stock.change24h >= 0;
  const is1hPositive = stock.change1h >= 0;
  
  return (
    <div className="stock-row" onClick={onClick}>
      <div className="col-pair flex gap-3">
        <img src={stock.imgUrl} alt={stock.ticker} className="stock-img" />
        <div className="flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="stock-ticker">{stock.ticker}</span>
            <span className="stock-name text-secondary">{stock.name}</span>
          </div>
          <div className="flex items-center gap-3 text-secondary text-xs mt-1">
            <span className="stock-age text-positive">{stock.age}</span>
            <div className="flex items-center gap-1"><Globe size={10} /> <Shield size={10} /> <Activity size={10} /></div>
          </div>
        </div>
      </div>
      
      <div className="col-mc flex-col justify-center">
        <span className="font-semibold">{stock.marketCap}</span>
        <span className={isPositive ? 'text-positive text-xs mt-1' : 'text-negative text-xs mt-1'}>
          {isPositive ? '+' : ''}{stock.change24h}%
        </span>
      </div>
      
      <div className="col-liq flex items-center">
        <span className="text-secondary">{stock.liquidity}</span>
      </div>
      
      <div className="col-vol flex items-center">
        <span className="font-semibold">{stock.volume24h}</span>
      </div>
      
      <div className="col-txns flex-col justify-center">
        <span className="font-semibold">{stock.txns24h}</span>
        <div className="flex items-center gap-1 text-xs mt-1">
          <span className="text-positive">B: 1.2K</span>
          <span className="text-secondary">/</span>
          <span className="text-negative">S: 800</span>
        </div>
      </div>
      
      <div className="col-info flex-col justify-center gap-1 text-xs font-semibold">
        <div className="flex items-center gap-1">
          <Users size={12} className="text-secondary" />
          <span>{stock.holders}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-positive">0%</span>
          <span className="text-secondary mx-1">TAX</span>
          <span className="text-positive">0%</span>
        </div>
      </div>
      
      <div className="col-action flex items-center justify-end">
        <button className="btn-buy-sol" onClick={(e) => {
          e.stopPropagation();
          alert(`Initiating trade for ${stock.ticker}`);
        }}>Buy 1 SOL</button>
      </div>
    </div>
  );
}

export default StockRow;
