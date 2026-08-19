import React from 'react';
import './AboutPage.css';

const LOCATIONS = [
  {
    game: 'Grand Theft Auto IV',
    year: '2008',
    address: 'Bawsaq Building, Burlesque, Star Junction, Algonquin, Liberty City',
    img: '/gtaiv-bawsaq.jpg',
    imgPos: 'center 40%',
    desc: 'The BAWSAQ Building towers over Star Junction — Liberty City\'s answer to Times Square. BAWSAQ is frequently mentioned across Weazel News reports and by the general public, cementing its status as the backbone of the HD Universe financial system.',
  },
  {
    game: 'Grand Theft Auto V',
    year: '2013',
    address: 'Boulevard Del Perro, Morningwood, Los Santos',
    img: '/gtav-bawsaq.jpg',
    imgPos: 'center 65%',
    desc: 'In GTA V, BAWSAQ became fully interactive — players could access bawsaq.com in-game and buy and sell stocks in real time, influenced by the Rockstar Social Club community. It operates alongside the LCN Exchange as one of two active stock markets in San Andreas.',
  },
];

const TIMELINE = [
  { year: '2008', label: 'GTA IV', desc: 'BAWSAQ established in Liberty City. Referenced across Weazel News and in-world media.' },
  { year: '2013', label: 'GTA V', desc: 'BAWSAQ goes fully interactive in Los Santos. Players trade real stocks tied to Rockstar Social Club data.' },
  { year: '2026', label: 'On-Chain', desc: 'BAWSAQ launches on Solana. GTA\'s most iconic exchange moves to the blockchain.' },
  { year: '2026', label: 'GTA VI', desc: 'Vice City opens. New stocks. New listings. The ecosystem expands with every Rockstar drop.', upcoming: true },
];

function LocationCard({ loc }) {
  return (
    <div className="location-card">
      <div className="location-img-wrap">
        <img src={loc.img} alt={loc.game} />
        <div className="location-game-badge">{loc.game} · {loc.year}</div>
      </div>
      <div className="location-body">
        <div className="location-address">📍 {loc.address}</div>
        <p className="location-desc">{loc.desc}</p>
      </div>
    </div>
  );
}
function AboutPage() {
  return (
    <div className="about-page">

      {/* Hero */}
      <div className="about-hero">
        <div className="about-hero-inner">
          <div className="about-eyebrow">Est. Liberty City, 2008</div>
          <h1 className="about-title">The World's Most<br />Recognisable Stock Exchange</h1>
          <p className="about-subtitle">
            BAWSAQ is a global stock exchange originating from the HD Universe of the Grand Theft Auto series.
            From the skyline of Liberty City to the boulevards of Los Santos — and now, the Solana blockchain.
          </p>
        </div>
      </div>

      {/* What is BAWSAQ */}
      <div className="about-section">
        <div className="section-tag">About</div>
        <h2 className="section-title">What coin makes the most sense when it comes to GTA?</h2>
        <div className="about-body-grid">
          <p>
            Think about it. If you're going to trade Grand Theft Auto memecoins, you need the right exchange. 
            In the real world, you have the <strong>NASDAQ</strong>. In the GTA world, you have the <strong>BAWSAQ</strong>.
          </p>
          <p>
            We built this terminal to be the ultimate hub for the GTA community. Instead of trading on boring, standard platforms, 
            you can track and trade tokens for iconic in-game companies — like Ammu-Nation, Maze Bank, and Sprunk — right here on the BAWSAQ terminal.
          </p>
          <p>
            It's simple: we find the best GTA-related memecoins on Solana, list them on our terminal, and let you track their charts and 
            prices in one place. And as GTA VI brings us back to Vice City, we'll be listing every new coin that pops up.
          </p>
          <p>
            Plus, it pays to be an investor. Because <strong className="text-green">$BAWSAQ</strong> is built on a revolutionary reward token model, simply holding it in your wallet automatically earns you dividends paid out in <strong>Take-Two Interactive (TTWO)</strong> tokenized stock. Every transaction across the ecosystem generates fees that flow straight back to you — the more the terminal is used, the more Take-Two stock you accumulate just for holding.
          </p>
        </div>
      </div>

      {/* Locations */}
      <div className="about-section">
        <div className="section-tag">Locations</div>
        <h2 className="section-title">In-Game Headquarters</h2>
        <div className="locations-grid">
          {LOCATIONS.map(loc => (
            <LocationCard key={loc.game} loc={loc} />
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="about-section">
        <div className="section-tag">History</div>
        <h2 className="section-title">Timeline</h2>
        <div className="timeline">
          {TIMELINE.map((t, i) => (
            <div key={i} className={`timeline-item${t.upcoming ? ' upcoming' : ''}`}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-year">{t.year}</div>
                <div className="timeline-label">{t.label}</div>
                <div className="timeline-desc">{t.desc}</div>
                {t.upcoming && <div className="timeline-badge">Coming Soon</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GTA 6 Teaser */}
      <div className="gta6-teaser">
        <div className="gta6-inner">
          <div className="gta6-tag">Next Chapter</div>
          <h2 className="gta6-title">Opening in Vice City</h2>
          <p className="gta6-desc">
            Grand Theft Auto VI is set in Leonida — a sun-soaked, fictional take on Miami and the state of Florida.
            Rockstar Games has confirmed a <strong>2026 release</strong>. When GTA VI drops, a whole new generation
            of companies, characters and brands enter the GTA universe — and BAWSAQ will be ready to list them all.
          </p>
          <div className="gta6-stats">
            <div className="gta6-stat">
              <span className="gta6-stat-val">2026</span>
              <span className="gta6-stat-label">Expected Release</span>
            </div>
            <div className="gta6-stat">
              <span className="gta6-stat-val">Vice City</span>
              <span className="gta6-stat-label">Setting</span>
            </div>
            <div className="gta6-stat">
              <span className="gta6-stat-val text-green">∞</span>
              <span className="gta6-stat-label">New Stocks</span>
            </div>
          </div>
        </div>
      </div>

      {/* Source credit */}
      <div className="about-credit">
        <span>Lore sourced from </span>
        <a href="https://gta.fandom.com/wiki/BAWSAQ" target="_blank" rel="noopener noreferrer">
          GTA Wiki — Fandom ↗
        </a>
      </div>

    </div>
  );
}

export default AboutPage;
