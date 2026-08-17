import React from 'react';
import './TokenomicsPage.css';
import NativeChart from './NativeChart';

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
        <h2 className="section-title">Official Listings & The Global Flywheel</h2>
        <div className="tokenomics-content-block">
          <p>
            The NASDAQ runs on liquidity and listing fees; BAWSAQ runs on the Ecosystem Flywheel. To ignite the terminal's volume, our core team will deploy the first wave of 'Blue Chip' stocks. Every transaction on these official listings acts as a micro-tax that buys back <strong>$BAWSAQ</strong>.
          </p>
          <p>
            But the vision extends far beyond our own deployments. Developers launching stocks on <em>any</em> platform (like Pump.fun or Raydium) can route a portion of their token's trading fees into the BAWSAQ Flywheel. By integrating, they gain immediate exposure to our community and terminal, while their trading volume systematically buys back and burns <strong>$BAWSAQ</strong>. No matter where a token is launched, if it routes fees through BAWSAQ, it sends our main token higher. Just like holding shares of a traditional stock exchange, holding <strong>$BAWSAQ</strong> means you own a piece of the house.
          </p>
        </div>
      </div>

      <div className="tokenomics-section">
        <div className="section-tag">Phase 3</div>
        <h2 className="section-title">The Vice City Expansion & RP Integration</h2>
        <div className="tokenomics-content-block">
          <p>
            The future of BAWSAQ extends directly into the streets. We are laying the groundwork for deep <strong>FiveM & GTA RP Server Integrations</strong>, allowing players to trade real crypto assets on their in-game phones and embedding the BAWSAQ economy directly into virtual worlds. Our ultimate goal is to launch an exclusive BAWSAQ-branded RP Server for our core community.
          </p>
          <p>
            As the highly anticipated launch of GTA VI approaches, we will be executing one of the largest community reward initiatives on Solana. Top loyal shareholders will receive exclusive airdrops, insider access, and actual <strong>gifted copies of GTA VI</strong> on release day as a thank you for their unwavering support.
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
          <p>
            <strong>Where to trade TTWO:</strong> You can find and trade the TTWO tokenized stock directly on Backpack Exchange, via decentralized exchanges like Raydium, or by searching the contract address on DexScreener.
          </p>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h3>Take-Two (Backpack Solana Stock)</h3>
            <span className="live-badge">Live</span>
          </div>
          <div className="chart-iframe-wrapper">
            <NativeChart contractAddress="TTWofwAge91oFhZs7kpQdyrVRkmevgM88xijGvQFbKo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenomicsPage;
