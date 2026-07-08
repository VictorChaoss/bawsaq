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
            Every GTA company deployed on this terminal pays 100% of its deployment fees and ongoing trading taxes directly into <strong>$BAWSAQ</strong> — the native hub token. More stocks listed = more volume = more value flowing into <strong>$BSQ</strong>. As GTA 6 drops, even more companies come online. You're not just trading stocks, you're holding equity in the whole ecosystem.
          </p>
        </div>
      </div>
      <div className="banner-right">
        <button className="btn-green">Deploy a Stock</button>
      </div>
    </div>
  );
}

export default TokenomicsBanner;
