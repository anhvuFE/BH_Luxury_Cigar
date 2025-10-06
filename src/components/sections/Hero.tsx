import React from 'react';
import { heroContent } from '../../data/storeData';

const Hero: React.FC = () => {
  const handleCTAClick = () => {
    const productsSection = document.querySelector('#products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center hero-background overflow-hidden">

      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-gold rounded-full animate-floatGentle"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 border border-gold rounded-full animate-floatSlow delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-gold rounded-full animate-rotateFloat delay-500"></div>
        <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-gold rounded-full opacity-60 animate-sparkle delay-700"></div>

        {/* Additional floating elements */}
        <div className="absolute top-32 right-20 w-4 h-4 bg-gold rounded-full opacity-40 animate-particleDance"></div>
        <div className="absolute bottom-40 left-20 w-6 h-6 border border-gold rounded-full animate-breathe delay-200"></div>
        <div className="absolute top-64 left-1/3 w-12 h-12 border border-gold rounded-full opacity-30 animate-glowRing delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto animate-fadeInUp">
        {/* Premium Accent Line */}
        <div className="mb-8">
          <div className="divider-gold mb-6"></div>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight animate-textGlow text-gradient">
          {heroContent.title}
        </h1>

        {/* Subtitle */}
        <h2 className="font-light text-xl md:text-2xl mb-8 text-gold-light tracking-wider uppercase">
          {heroContent.subtitle}
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed text-gray-300 font-light">
          {heroContent.description}
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={handleCTAClick}
            className="btn btn-primary btn-magical hover-expand ripple animate-glowRing"
          >
            {heroContent.ctaText}
          </button>

          <button
            onClick={() => {
              const aboutSection = document.querySelector('#about');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn btn-secondary hover-rainbow hover-tilt animate-breathe delay-300"
          >
            Tìm hiểu thêm
          </button>
        </div>

        {/* Enhanced Premium Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center reveal-fade delay-100">
            <div className="text-3xl font-bold text-gold mb-2 animate-floatGentle text-glow-pulse">10+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Năm kinh nghiệm</div>
          </div>
          <div className="text-center reveal-scale delay-300">
            <div className="text-3xl font-bold text-gold mb-2 animate-breathe text-glow-pulse">500+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Khách hàng tin tưởng</div>
          </div>
          <div className="text-center reveal-fade delay-500">
            <div className="text-3xl font-bold text-gold mb-2 animate-rotateFloat text-glow-pulse">50+</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Dòng cigar cao cấp</div>
          </div>
        </div>
      </div>


      {/* Enhanced Decorative Elements */}
      <div className="absolute top-1/4 left-8 hidden lg:block">
        <div className="text-gold opacity-20 text-6xl transform rotate-12 animate-floatSlow">🚬</div>
      </div>
      <div className="absolute bottom-1/4 right-8 hidden lg:block">
        <div className="text-gold opacity-20 text-4xl transform -rotate-12 animate-rotateFloat delay-500">🍃</div>
      </div>

      {/* Additional floating particles */}
      <div className="absolute top-10 right-10 hidden lg:block">
        <div className="w-2 h-2 bg-gold rounded-full opacity-60 animate-sparkle"></div>
      </div>
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="w-3 h-3 bg-gold rounded-full opacity-40 animate-particleDance delay-200"></div>
      </div>
      <div className="absolute top-3/4 left-16 hidden lg:block">
        <div className="w-1 h-1 bg-gold rounded-full opacity-80 animate-floatGentle delay-700"></div>
      </div>
    </section>
  );
};

export default Hero;