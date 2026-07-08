import React, { useState } from 'react';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import TokenomicsBanner from './components/TokenomicsBanner';
import StockTable from './components/StockTable';
import StockDetail from './components/StockDetail';
import NewsSection from './components/NewsSection';
import AboutPage from './components/AboutPage';
import DiscoverPage from './components/DiscoverPage';
import SocialsPage from './components/SocialsPage';
import './App.css';

function App() {
  const [selectedStock, setSelectedStock] = useState(null);
  const [activeTab, setActiveTab] = useState('Discover');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  function handleTabChange(tab) {
    setActiveTab(tab);
    setSelectedStock(null);
  }

  return (
    <div className="app-shell">
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
              <SubHeader activeFilter={activeFilter} onFilter={setActiveFilter} />
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

        {/* ── Discover ── */}
        {activeTab === 'Discover' && <DiscoverPage setActiveTab={handleTabChange} />}

        {/* ── Socials ── */}
        {activeTab === 'Socials' && <SocialsPage />}

      </div>
    </div>
  );
}

export default App;
