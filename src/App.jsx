import React, { useState } from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import TokenomicsBanner from './components/TokenomicsBanner';
import StockTable from './components/StockTable';
import StockDetail from './components/StockDetail';
import NewsSection from './components/NewsSection';
import AboutPage from './components/AboutPage';
import TokenomicsPage from './components/TokenomicsPage';
import DiscoverPage from './components/DiscoverPage';
import SocialsPage from './components/SocialsPage';
import SubmitToken from './components/SubmitToken';
import GalleryPage from './components/GalleryPage';
import './App.css';

function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeTab, setActiveTab] = useState('Discover');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSubmit, setShowSubmit] = useState(false);

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSelectedStock(null);
  }

  const MAINTENANCE_MODE = true;

  if (MAINTENANCE_MODE) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', backgroundColor: '#000', color: '#00ff66', fontFamily: 'monospace', flexDirection: 'column', textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Terminal Offline</h1>
        <p style={{ color: '#888', fontSize: '1.2rem' }}>The BAWSAQ terminal is undergoing emergency maintenance.<br/>We will be back online shortly.</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      {showSubmit && <SubmitToken onClose={() => setShowSubmit(false)} />}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="page-body">

        {/* ── Explore ── */}
        {activeTab === 'Explore' && (
          selectedStock ? (
            <div className="container">
              <StockDetail stock={selectedStock} onBack={() => setSelectedStock(null)} />
            </div>
          ) : (
            <>
              <SubHeader activeFilter={activeFilter} onFilter={setActiveFilter} onSubmit={() => setShowSubmit(true)} />
              <div className="container">
                <div style={{ paddingTop: 20 }}>
                  <TokenomicsBanner />
                </div>
                <StockTable filter={activeFilter} onSelectStock={setSelectedStock} searchQuery={searchQuery} />
              </div>
            </>
          )
        )}

        {/* ── News ── */}
        {activeTab === 'News' && (
          <div className="container">
            <NewsSection />
          </div>
        )}

        {/* ── About ── */}
        {activeTab === 'About' && <AboutPage />}

        {/* ── Tokenomics ── */}
        {activeTab === 'Tokenomics' && <TokenomicsPage />}

        {/* ── Discover ── */}
        {activeTab === 'Discover' && <DiscoverPage setActiveTab={handleTabChange} />}

        {/* ── Socials ── */}
        {activeTab === 'Socials' && <SocialsPage />}

        {/* ── Gallery ── */}
        {activeTab === 'Gallery' && <GalleryPage />}

      </div>
    </div>
  );
}

export default App;
