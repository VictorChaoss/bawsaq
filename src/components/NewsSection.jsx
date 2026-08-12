import React, { useState, useEffect } from 'react';
import './NewsSection.css';

const RSS_URL = 'https://www.rockstargames.com/newswire/feed';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}&count=12`;

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60)   return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function NewsCard({ item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="news-card"
    >
      {item.thumbnail && (
        <div className="news-thumb">
          <img src={item.thumbnail} alt={item.title} onError={e => e.target.parentElement.style.display='none'} />
        </div>
      )}
      <div className="news-body">
        <div className="news-meta flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Rockstar_Games_Logo.svg/64px-Rockstar_Games_Logo.svg.png"
            alt="Rockstar"
            className="news-avatar"
            onError={e => e.target.style.display='none'}
          />
          <span className="news-source">Rockstar Newswire</span>
          <span className="news-dot">·</span>
          <span className="news-time">{timeAgo(item.pubDate)}</span>
        </div>
        <h3 className="news-title">{item.title}</h3>
        <p className="news-desc">
          {item.description?.replace(/<[^>]+>/g, '').slice(0, 120)}...
        </p>
        <div className="news-tag">Official News</div>
      </div>
    </a>
  );
}

function NewsSkeleton() {
  return (
    <div className="news-card skeleton">
      <div className="news-thumb skeleton-block" />
      <div className="news-body">
        <div className="skeleton-line short" />
        <div className="skeleton-line" />
        <div className="skeleton-line medium" />
      </div>
    </div>
  );
}

const MOCK_NEWS = [
  {
    title: "Grand Theft Auto VI: An Extended Look",
    pubDate: new Date(Date.now() - 86400000 * 1).toISOString(),
    link: "https://www.rockstargames.com/newswire",
    thumbnail: "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/news/70a68d06371c66289d0a68f037f00d8b746816fa.jpg",
    description: "Rockstar Games announces a special presentation premiering exclusively on Netflix on Thursday, August 27. An in-depth look at the state of Leonida."
  },
  {
    title: "Take-Two Reaffirms Grand Theft Auto VI Launch Date",
    pubDate: new Date(Date.now() - 86400000 * 3).toISOString(),
    link: "https://www.rockstargames.com/newswire",
    thumbnail: "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/news/892e86b2404b901bc7190089a812061e86ba841b.jpg",
    description: "During the latest earnings call, Take-Two Interactive confirmed that Grand Theft Auto VI remains on track for its highly anticipated November 19 release."
  },
  {
    title: "Grand Theft Auto VI Pre-orders Now Live",
    pubDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    link: "https://www.rockstargames.com/newswire",
    thumbnail: "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/news/32b005e0c52bb7a5991ee8618e0018f99059f1be.jpg",
    description: "Secure your copy of Grand Theft Auto VI. Pre-orders are now available for PlayStation 5 and Xbox Series X|S worldwide."
  },
  {
    title: "Grand Theft Auto VI Trailer 1",
    pubDate: new Date(Date.now() - 86400000 * 200).toISOString(),
    link: "https://www.youtube.com/watch?v=QdBZY2fkU-0",
    thumbnail: "https://i.ytimg.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    description: "Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the series yet."
  },
  {
    title: "The Chop Shop Update Now Available in GTA Online",
    pubDate: new Date(Date.now() - 86400000 * 14).toISOString(),
    link: "https://www.rockstargames.com/newswire",
    thumbnail: "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/news/866039537f827284b1a455a29cc88a6d091a18c6.jpg",
    description: "Team up with Liberty City real estate mogul Yusuf Amir on an all-new illicit venture. Steal the most coveted vehicles in Los Santos."
  },
  {
    title: "GTA+ Member Benefits for This Month",
    pubDate: new Date(Date.now() - 86400000 * 20).toISOString(),
    link: "https://www.rockstargames.com/newswire",
    thumbnail: "https://media-rockstargames-com.akamaized.net/rockstargames-newsite/img/global/news/b5a519d1cb23bb19a4a15998a101b0b00c3b8895.jpg",
    description: "Claim the new Ocelot Jugular, a free Chameleon Paint job, and access to classic Rockstar titles."
  }
];

function NewsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchNews() {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
          if (mounted) {
            setItems(data.items.slice(0, 12));
            setLoading(false);
          }
        } else {
          throw new Error('Invalid RSS data format');
        }
      } catch (err) {
        console.warn('Failed to fetch Rockstar RSS, falling back to mock news:', err);
        if (mounted) {
          setItems(MOCK_NEWS);
          setLoading(false);
        }
      }
    }

    fetchNews();

    return () => { mounted = false; };
  }, []);

  return (
    <section className="news-section">
      <div className="news-header flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="section-label">Rockstar Newswire</div>
          <span className="live-pill">● LIVE</span>
        </div>
        <a
          href="https://www.rockstargames.com/newswire"
          target="_blank"
          rel="noopener noreferrer"
          className="view-all-btn"
        >
          View all →
        </a>
      </div>

      {loading && (
        <div className="news-grid">
          {[...Array(6)].map((_, i) => <NewsSkeleton key={i} />)}
        </div>
      )}

      {!loading && (
        <div className="news-grid">
          {items.map((item, i) => <NewsCard key={i} item={item} />)}
        </div>
      )}
    </section>
  );
}

export default NewsSection;
