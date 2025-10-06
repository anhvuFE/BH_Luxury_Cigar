import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Products from './components/sections/Products';
import Knowledge from './components/sections/Knowledge';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen">
      {/* Enhanced Realistic Smoke Effect with Floating Elements */}
      <div className="smoke-effect">
        <div className="smoke-particle animate-floatGentle"></div>
        <div className="smoke-particle animate-floatSlow delay-200"></div>
        <div className="smoke-particle animate-rotateFloat delay-300"></div>
        <div className="smoke-particle animate-particleDance delay-500"></div>
        <div className="smoke-particle animate-floatGentle delay-700"></div>
        <div className="smoke-particle animate-breathe delay-100"></div>
        <div className="smoke-particle animate-sparkle delay-400"></div>
        <div className="smoke-particle animate-liquidMorph delay-800"></div>

        {/* Enhanced Cigar Tips */}
        <div className="cigar-tip animate-glowRing"></div>
        <div className="cigar-tip animate-breathe delay-300"></div>
        <div className="cigar-tip animate-sparkle delay-600"></div>

        {/* Additional floating particles */}
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-gold rounded-full opacity-60 animate-particleDance"></div>
        <div className="absolute bottom-32 right-1/3 w-2 h-2 bg-gold rounded-full opacity-40 animate-floatSlow"></div>
        <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-gold rounded-full opacity-80 animate-sparkle"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-gold rounded-full opacity-50 animate-rotateFloat"></div>
        <div className="absolute top-32 right-1/5 w-1 h-1 bg-gold rounded-full opacity-70 animate-breathe delay-900"></div>
        <div className="absolute bottom-20 left-1/3 w-1 h-1 bg-gold rounded-full opacity-60 animate-glowRing delay-1000"></div>
      </div>

      <Header />
      <main className="pt-24">
        <Hero />
        <About />
        <Products />
        <Knowledge />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;