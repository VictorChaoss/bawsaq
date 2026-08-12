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
            The BAWSAQ ecosystem runs on a revolutionary Reward Token model. Every transaction carries a 3% tax that is paid straight to holders in the paired token. No creator fees—just pure, automated yield for the community. A portion of pool fees feeds the Ecosystem Flywheel, constantly buying back and burning tokens.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TokenomicsBanner;
