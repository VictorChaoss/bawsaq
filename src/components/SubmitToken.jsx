import React, { useState } from 'react';
import './SubmitToken.css';

const BAWSAQ_X = 'bawsaq_x';

export default function SubmitToken({ onClose }) {
  const [form, setForm] = useState({
    name: '', ticker: '', contract: '', pumpUrl: '', description: '', handle: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const tweet = [
      `👋 @${BAWSAQ_X} — Token Listing Request`,
      `📌 Name: ${form.name}`,
      `📌 Ticker: $${form.ticker.toUpperCase()}`,
      form.contract ? `📌 CA: ${form.contract}` : '',
      form.pumpUrl ? `📌 Pump: ${form.pumpUrl}` : '',
      form.handle ? `📌 Contact: @${form.handle}` : '',
      form.description ? `\n"${form.description.slice(0, 100)}..."` : '',
      `\n#BAWSAQ #GTA #Solana`,
    ].filter(Boolean).join('\n');

    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(url, '_blank');
    setSubmitted(true);
  }

  return (
    <div className="submit-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="submit-modal">
        {/* Header */}
        <div className="submit-modal-header">
          <div>
            <div className="submit-eyebrow">🚀 List Your Token</div>
            <h2 className="submit-title">Submit for BAWSAQ Listing</h2>
            <p className="submit-sub">Fill in the details below. Hitting submit will open a pre-filled tweet to <strong>@{BAWSAQ_X}</strong> — we'll review and list your token.</p>
          </div>
          <button className="submit-close" onClick={onClose}>✕</button>
        </div>

        {submitted ? (
          <div className="submit-success">
            <div className="submit-success-icon">✅</div>
            <h3>Tweet sent!</h3>
            <p>Your submission is heading to <strong>@{BAWSAQ_X}</strong>. We'll review and reach out on X once your token is live on BAWSAQ.</p>
            <button className="submit-btn" onClick={onClose}>Done</button>
          </div>
        ) : (
          <form className="submit-form" onSubmit={handleSubmit}>
            <div className="submit-row">
              <div className="submit-field">
                <label>Token Name *</label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Cluckin Bell" />
              </div>
              <div className="submit-field">
                <label>Ticker Symbol *</label>
                <div className="ticker-input-wrap">
                  <span className="ticker-prefix">$</span>
                  <input name="ticker" required value={form.ticker} onChange={handleChange} placeholder="CBE" maxLength={10} style={{ paddingLeft: '28px' }} />
                </div>
              </div>
            </div>

            <div className="submit-field">
              <label>Contract Address (Solana CA)</label>
              <input name="contract" value={form.contract} onChange={handleChange} placeholder="Paste your Solana contract address" style={{ fontFamily: 'monospace', fontSize: '13px' }} />
            </div>

            <div className="submit-field">
              <label>Pump.fun Link</label>
              <input name="pumpUrl" value={form.pumpUrl} onChange={handleChange} placeholder="https://pump.fun/coin/..." />
            </div>

            <div className="submit-field">
              <label>Short Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="What's the concept? Why does it belong on BAWSAQ?" rows={3} maxLength={280} />
            </div>

            <div className="submit-field">
              <label>Your X Handle</label>
              <div className="ticker-input-wrap">
                <span className="ticker-prefix">@</span>
                <input name="handle" value={form.handle} onChange={handleChange} placeholder="yourhandle" style={{ paddingLeft: '28px' }} />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              Submit via X &nbsp;𝕏
            </button>
            <p className="submit-note">This will open a pre-filled tweet. You just hit post — we take it from there.</p>
          </form>
        )}
      </div>
    </div>
  );
}
