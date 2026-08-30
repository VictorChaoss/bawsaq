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
            The BAWSAQ ecosystem runs on a unique dividend model powered by Pons. You launch from your wallet. Pons receives creator fees and uses them to airdrop stock dividends directly to the community. No complex taxes, just pure, automated yield for holders.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TokenomicsBanner;
