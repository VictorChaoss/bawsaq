import React, { useState, useEffect } from 'react';
import './Trailer.css';
import { Terminal, ShieldAlert } from 'lucide-react';

export default function Trailer({ onClose }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence timing
    const sequence = [
      { step: 1, delay: 2000 },  // Hook (Vice City)
      { step: 2, delay: 6000 },  // The Pivot
      { step: 3, delay: 9000 },  // Welcome (Server Room)
      { step: 4, delay: 13000 }, // Features (Hacker)
      { step: 5, delay: 18000 }, // Outro
    ];

    const timers = sequence.map(seq => 
      setTimeout(() => setStep(seq.step), seq.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="trailer-overlay">
      <button className="trailer-close" onClick={onClose}>SKIP ✕</button>

      {/* Background Images with slow zoom */}
      <div className={`trailer-bg ${step >= 1 && step < 3 ? 'active' : ''}`} style={{ backgroundImage: "url('/trailer_vice_city_neon_1783980655853.jpg')" }}></div>
      <div className={`trailer-bg ${step >= 3 && step < 4 ? 'active' : ''}`} style={{ backgroundImage: "url('/trailer_server_room_1783980678216.jpg')" }}></div>
      <div className={`trailer-bg ${step >= 4 && step < 5 ? 'active' : ''}`} style={{ backgroundImage: "url('/trailer_hacker_terminal_1783980694305.jpg')" }}></div>
      
      {/* Glitch Overlay */}
      <div className="trailer-glitch-overlay"></div>

      <div className="trailer-content">
        
        {/* Step 0: Initial Cursor */}
        {step === 0 && (
          <div className="trailer-cursor">_</div>
        )}

        {/* Step 1: The Hook */}
        {step === 1 && (
          <div className="trailer-text-block">
            <h1 className="glitch-text slide-up">2026.</h1>
            <h1 className="glitch-text slide-up delay-1">HUNDREDS OF MILLIONS OF PLAYERS.</h1>
            <h1 className="glitch-text slide-up delay-2" style={{ color: 'var(--green)' }}>THE BIGGEST LAUNCH IN HISTORY.</h1>
          </div>
        )}

        {/* Step 2: The Pivot */}
        {step === 2 && (
          <div className="trailer-text-block center">
            <h1 className="giant-text impact">WHERE DOES THE HYPE GO?</h1>
          </div>
        )}

        {/* Step 3: Welcome to BAWSAQ */}
        {step === 3 && (
          <div className="trailer-text-block center">
            <h1 className="glitch-text slide-up">WELCOME TO <span style={{ color: 'var(--green)' }}>BAWSAQ</span>.</h1>
            <h2 className="sub-text slide-up delay-1">THE UNREGULATED STOCK MARKET.</h2>
          </div>
        )}

        {/* Step 4: Features */}
        {step === 4 && (
          <div className="trailer-text-block center">
            <h1 className="glitch-text fast-flash">TRACK THE TRENCHES.</h1>
            <h1 className="glitch-text fast-flash delay-1">DEPLOY INSTANTLY.</h1>
            <h1 className="glitch-text fast-flash delay-2" style={{ color: 'var(--red)' }}>NO RULES.</h1>
            <h1 className="glitch-text fast-flash delay-3" style={{ color: 'var(--green)' }}>JUST ALPHA.</h1>
          </div>
        )}

        {/* Step 5: Outro */}
        {step === 5 && (
          <div className="trailer-text-block center outro">
            <div className="outro-logo fade-in">
              <Terminal size={64} color="var(--green)" />
              <h1 className="glitch-text">BAWSAQ.XYZ</h1>
            </div>
            <h2 className="sub-text fade-in delay-2" style={{ marginTop: '20px' }}>ARE YOU IN?</h2>
            <button className="enter-btn fade-in delay-3" onClick={onClose}>ENTER TERMINAL</button>
          </div>
        )}
      </div>
    </div>
  );
}
