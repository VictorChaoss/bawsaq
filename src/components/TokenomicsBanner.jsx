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
            Want to see your GTA-themed token listed on the terminal? It's fully automated. Deploy your stock on Pump.fun and route a portion of your creator fees to the <strong>$BSQ Dev Wallet</strong>. Once received, your token instantly lists on BAWSAQ. All redirected fees flow directly into the native <strong>$BSQ</strong> token, creating a self-sustaining ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TokenomicsBanner;
