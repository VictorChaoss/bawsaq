import React, { useState, useEffect } from 'react';

// GTA VI release date, update this when confirmed
const GTA6_DATE = new Date('2026-11-19T00:00:00Z');

function pad(n) {
  return String(n).padStart(2, '0');
}

function getTimeLeft() {
  const diff = GTA6_DATE - Date.now();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function GTACountdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  const blocks = [
    { label: 'DAYS',    value: time.days },
    { label: 'HOURS',   value: pad(time.hours) },
    { label: 'MINUTES', value: pad(time.minutes) },
    { label: 'SECONDS', value: pad(time.seconds) },
  ];

  return (
    <div style={{
      maxWidth: '1000px', margin: '0 auto 48px auto',
      background: 'linear-gradient(135deg, rgba(255,60,0,0.05) 0%, rgba(10,10,10,0.95) 100%)',
      border: '1px solid rgba(255,60,0,0.18)',
      borderRadius: '20px',
      padding: '36px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,60,0,0.12)', border: '1px solid rgba(255,60,0,0.35)',
          borderRadius: '999px', padding: '3px 12px',
          fontSize: '10px', fontWeight: '700', letterSpacing: '2px',
          color: '#ff6b35', textTransform: 'uppercase', fontFamily: 'monospace',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#ff6b35', display: 'inline-block',
            animation: 'blink 1.5s ease-in-out infinite',
          }} />
          LIVE COUNTDOWN
        </span>
        <span style={{ fontSize: '13px', color: 'var(--text-2)', fontFamily: 'monospace' }}>
          GTA VI, Estimated Release
        </span>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        {blocks.map((b, i) => (
          <React.Fragment key={b.label}>
            <div style={{ textAlign: 'center', minWidth: '70px' }}>
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px',
                padding: '12px 16px',
                fontFamily: 'monospace',
                fontSize: b.label === 'DAYS' ? '42px' : '36px',
                fontWeight: '800',
                color: '#fff',
                lineHeight: 1,
                letterSpacing: '-1px',
              }}>
                {b.value}
              </div>
              <div style={{
                fontSize: '9px', fontWeight: '700', letterSpacing: '2px',
                color: 'var(--text-3)', textTransform: 'uppercase',
                fontFamily: 'monospace', marginTop: '8px',
              }}>
                {b.label}
              </div>
            </div>
            {i < blocks.length - 1 && (
              <div style={{
                fontSize: '28px', color: '#ff6b35', fontWeight: '800',
                marginBottom: '18px', opacity: 0.6,
              }}>:</div>
            )}
          </React.Fragment>
        ))}

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <div style={{
            fontSize: '13px', color: 'var(--text-2)', lineHeight: '1.6', maxWidth: '280px',
          }}>
            When GTA VI drops, hundreds of millions of players flood in overnight.
            <strong style={{ color: 'var(--text-1)', display: 'block', marginTop: '4px' }}>
              BAWSAQ will be ready.
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
