import React from 'react';
import './TokenomicsPage.css';

function TokenomicsPage() {
  return (
    <div className="tokenomics-page">
      <div className="tokenomics-hero">
        <div className="tokenomics-hero-inner">
          <div className="tokenomics-eyebrow">Phase 1 & Integration</div>
          <h1 className="tokenomics-title">The Tokenomics Model</h1>
          <p className="tokenomics-subtitle">
            BAWSAQ operates on a revolutionary reward token model built for longevity, deep liquidity, and aligning incentives for early adopters.
          </p>
        </div>
      </div>

      <div className="tokenomics-section">
        <div className="section-tag">Fee Model</div>
        <h2 className="section-title">The Reward Token Architecture</h2>
        <div className="tokenomics-card">
          <div className="tokenomics-card-header">
            <h3>Standard vs Reward Token</h3>
          </div>
          <div className="tokenomics-card-body">
            <p>
              A reward token trades on a 1% pool and carries a 3% transfer tax paid straight to holders, automatically, in the token it is paired against — on every transfer, on any venue.
            </p>
            <p>
              A share of pool fees feeds the <strong>Ecosystem Flywheel</strong>, which buys back and burns the platform's top tokens. You earn as a holder like everyone else — there is no separate creator fee position.
            </p>
          </div>
        </div>
      </div>

      <div className="tokenomics-section">
        <div className="section-tag">Phase 1</div>
        <h2 className="section-title">Stonk Integration & Flywheel</h2>
        <div className="tokenomics-content-block">
          <p>
            In Phase 1, BAWSAQ partners closely with <strong>Stonk</strong>. By launching through this ecosystem, we ensure that early holders and liquidity providers are consistently rewarded. 
          </p>
          <p>
            The Ecosystem Flywheel acts as a continuous buy-pressure engine, using protocol fees to systematically buy back and burn supply, creating a deflationary environment for our premier tokens.
          </p>
        </div>
        
        <div className="chart-container">
          <div className="chart-header">
            <h3>$BAWSAQ / STONK</h3>
            <span className="live-badge disabled">CA Not Live</span>
          </div>
          <div className="chart-placeholder">
            <div className="loader-spinner"></div>
            <p>Chart Loading... CA Not Live Yet</p>
          </div>
        </div>
      </div>

      <div className="tokenomics-section">
        <div className="section-tag">Phase 2</div>
        <h2 className="section-title">The Grand Theft Auto Hub</h2>
        <div className="tokenomics-content-block">
          <p>
            As we move into Phase 2, BAWSAQ expands into its true form: the centralized hub for the biggest event of 2026. We will begin integrating actual GTA-related stocks, coins, and assets across the Solana ecosystem into our terminal.
          </p>
          <p>
            Users and communities will have the ability to list their own tokens directly on BAWSAQ. As volume and listings grow, the fees generated from these ecosystem tokens will be used to systematically buy back <strong>$BAWSAQ</strong>, driving continuous value back to our core holders.
          </p>
        </div>
      </div>

      <div className="tokenomics-section">
        <div className="section-tag">Ecosystem</div>
        <h2 className="section-title">What is Take-Two?</h2>
        <div className="tokenomics-content-block">
          <p>
            <strong>Take-Two Interactive</strong> is the massive parent company behind Rockstar Games — the creators of the Grand Theft Auto series. In the context of the BAWSAQ ecosystem, tracking the Take-Two (TTWO) tokenized stock serves as a major bellwether for the health and hype of the GTA economy on-chain.
          </p>
          <p>
            By integrating Take-Two's price action into our terminal, users can trade and hedge against the macro performance of the very studio that built the HD universe.
          </p>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Take-Two (Backpack Solana Stock)</h3>
            <span className="live-badge">Live</span>
          </div>
          <div className="chart-iframe-wrapper">
            <iframe
              src="https://dexscreener.com/solana/TTWofwAge91oFhZs7kpQdyrVRkmevgM88xijGvQFbKo?embed=1&theme=dark&trades=0&info=0"
              title="Take-Two Chart"
              className="chart-iframe"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenomicsPage;
