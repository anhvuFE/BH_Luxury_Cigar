import React, { useState } from "react";
import { navigationItems, storeInfo } from "../../data/storeData";
import logoImage from "../../assets/images/image.png";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-black bg-opacity-95 backdrop-blur-lg border-b border-gold border-opacity-30">
      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={logoImage}
              alt={storeInfo.name}
              className="h-20 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: 'transparent',
                mixBlendMode: 'screen'
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item: any) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="text-white hover:text-gold transition-colors duration-300 font-medium uppercase tracking-wide text-sm"
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn btn-primary ml-4"
              >
                Liên hệ
              </button>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white hover:text-gold transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold border-opacity-30">
            <ul className="space-y-3">
              {navigationItems.map((item: any) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="block w-full text-left py-3 px-4 text-white hover:text-gold hover:bg-gold hover:bg-opacity-10 rounded-lg transition-all duration-300 font-medium uppercase tracking-wide text-sm"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full btn btn-primary"
                >
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
