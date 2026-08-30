import React from 'react';
import { MessageCircle, ExternalLink, MessageSquare, BookOpen } from 'lucide-react';
import './SocialsPage.css';

const XIcon = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l16 16M4 20L20 4" />
  </svg>
);

function SocialsPage() {
  const links = [
    {
      title: 'X (Twitter)',
      desc: 'Follow the official BAWSAQ updates, listing announcements, and market news.',
      url: 'https://x.com/BawsaqXYZ',
      icon: <img src="/socials/x.jpg" alt="X (Twitter)" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />,
      color: '#1DA1F2',
      bgTint: 'rgba(29, 161, 242, 0.1)'
    },
    {
      title: 'X Community',
      desc: 'Join the official BAWSAQ X Community to discuss trades, share memes, and connect with other traders.',
      url: 'https://x.com/i/communities/1941269406102765933',
      icon: <img src="/socials/x.jpg" alt="X Community" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />,
      color: '#1DA1F2',
      bgTint: 'rgba(29, 161, 242, 0.1)'
    },
    {
      title: 'Pons',
      desc: 'Launch platform & Dividend distributor',
      url: 'https://www.ponsfamily.com/memestock',
      icon: <img src="/socials/memestonk.png" alt="Pons" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />,
      color: '#3498db',
      bgTint: 'rgba(52, 152, 219, 0.1)'
    },
    {
      title: 'Life Invader',
      desc: 'The only social network you need. Stalk your friends, invade their lives, and never log off.',
      url: '#',
      icon: <img src="/socials/lifeinvader.png" alt="Life Invader" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />,
      color: '#FF2D55',
      bgTint: 'rgba(255, 45, 85, 0.1)'
    }
  ];

  return (
    <div className="socials-page">
      <div className="socials-hero">
        <div className="socials-hero-inner">
          <div className="socials-eyebrow">Connect with the Network</div>
          <h1 className="socials-title">Community & Socials</h1>
          <p className="socials-subtitle">
            The market is driven by sentiment. Join the BAWSAQ community across our official channels 
            to stay ahead of the curve, discuss trades, and catch the latest drops.
          </p>
        </div>
      </div>

      <div className="socials-grid">
        {links.map((link, idx) => (
          <a 
            key={idx} 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`social-card ${link.comingSoon ? 'coming-soon' : ''}`}
            onClick={(e) => link.comingSoon && e.preventDefault()}
          >
            <div className="social-icon-wrap" style={{ background: link.bgTint, color: link.color }}>
              {link.icon}
            </div>
            <div className="social-card-content">
              <div className="social-card-header">
                <h2>{link.title}</h2>
                {link.comingSoon && <span className="badge-soon">Coming Soon</span>}
              </div>
              <p>{link.desc}</p>
            </div>
            {!link.comingSoon && <ExternalLink size={16} className="link-arrow" color="var(--text-3)" />}
          </a>
        ))}
      </div>

      <div className="bleeter-teaser">
        <div className="bleeter-inner">
          <div className="bleeter-icon">🐦</div>
          <div className="bleeter-text">
            <h3>Bleeter Integration</h3>
            <p>Live simulated GTA news feed coming to the terminal soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialsPage;
