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

function NewsSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API_URL)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'ok' && data.items?.length) {
          setItems(data.items);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
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

      {error && (
        <div className="news-error">
          <span>⚠</span>
          <span>Could not load Rockstar Newswire. <a href="https://www.rockstargames.com/newswire" target="_blank" rel="noopener noreferrer">Visit directly →</a></span>
        </div>
      )}

      {!loading && !error && (
        <div className="news-grid">
          {items.map((item, i) => <NewsCard key={i} item={item} />)}
        </div>
      )}
    </section>
  );
}

export default NewsSection;
