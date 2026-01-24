
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DeliveryPartner from './pages/DeliveryPartner';
import AddStore from './pages/AddStore';
import Partnership from './pages/Partnership';
import Contact from './pages/Contact';

export type PageType = 'home' | 'partner' | 'store' | 'partnership' | 'contact';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'partner':
        return <DeliveryPartner onGoHome={() => setCurrentPage('home')} />;
      case 'store':
        return <AddStore />;
      case 'partnership':
        return <Partnership />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1C1C1C] overflow-x-hidden">
      <Navbar 
        scrolled={scrolled} 
        setPage={setCurrentPage} 
        currentPage={currentPage} 
      />
      
      {renderPage()}
      
      <Footer />
    </div>
  );
};

export default App;
