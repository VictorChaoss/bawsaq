import React from 'react';
import { Zap } from 'lucide-react';
import './TokenomicsBanner.css';

function TokenomicsBanner() {
  return (
    <div className="tokenomics-banner">
      <div className="flex items-center gap-4">
        <div className="banner-icon">
          <Zap size={18} color="var(--green)" />
        </div>
        <div>
          <div className="banner-title">The Central Hub for GTA Stocks</div>
          <p className="banner-desc">
            Want to see your GTA-themed token listed on the terminal? It's fully automated. Deploy your stock on Pump.fun and route a portion of the deployment funds to the <strong>$BSQ Dev Wallet</strong>. Once received, your token instantly lists on BAWSAQ. All redirected funds flow directly into the native <strong>$BSQ</strong> token, creating a self-sustaining ecosystem.
          </p>
        </div>
      </div>
      <div className="banner-right">
        <a href="https://pump.fun/create" target="_blank" rel="noreferrer" className="btn-green" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Deploy a Stock
        </a>
      </div>
    </div>
  );
}

export default TokenomicsBanner;
