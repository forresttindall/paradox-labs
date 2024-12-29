import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './Header';
import HeroSection from './HeroSection';
import FeaturedProducts from './FeaturedProducts';
import Shop from './Shop';
import GithubActivityCalendar from './Products/GithubActivityCalendar';
import MagSafeMeshtasticRadio from './Products/MagSafeMeshtasticRadio';
import Wardriver from './Products/Wardriver';
import HowItWorks from './HowItWorks';
import Contact from './Contact';
import CTA from './CTA';
import About from './About';
import DotAnimation from './Products/DotAnimation';
import Test from './Products/Test';
import StartHere from './StartHere';
import CRTTerminal from './Products/CRTTerminal';
import PoweredBy from './PoweredBy';
import NewProject from './NewProject';
import './PoweredBy.css';
import './App.css';
import './Header.css';
import './FeaturedProducts.css';
import './Products/ProductsPage.css';
import './HowItWorks.css';
import './Contact.css';
import emailjs from '@emailjs/browser';

// Initialize EmailJS at the app level
emailjs.init('Jw3vZKDhkrXkGhCLB');

function App() {
  useEffect(() => {
    // Check for successful transaction return
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('transaction') === 'complete' && urlParams.get('download') === 'true') {
        const productId = urlParams.get('productId');
        console.log('Transaction complete, starting download for product:', productId);
        window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  return (
    <React.StrictMode>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={
              <main>
                <HeroSection />
                <FeaturedProducts />
                <StartHere />
                <PoweredBy />
                <CTA />
              </main>
            } />
            <Route path="/Shop" element={<Shop />} />
            <Route path="/NewProject" element={<NewProject />} />
            <Route path="/GithubActivityCalendar" element={<GithubActivityCalendar />} />
            <Route path="/MagSafeMeshtasticRadio" element={<MagSafeMeshtasticRadio />} />
            <Route path="/Wardriver" element={<Wardriver />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Test" element={<Test />} />
            <Route path="/About" element={<About />} />
            <Route path="/DotAnimation" element={<DotAnimation />} />
            <Route path="/HowItWorks" element={<HowItWorks />} />
            <Route path="/CRTTerminal" element={<CRTTerminal />} />
          </Routes>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
