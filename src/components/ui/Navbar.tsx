import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Loan Calculator', path: '/calculators/loan' },
    { name: 'Deposit Calculator', path: '/calculators/deposit' },
    { name: 'Interest Rates', path: '/interest-rates' },
    { name: 'Cards', path: '/cards' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#50472d] via-[#ffd45e] to-[#50472d] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-black">BankBuddy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-base font-bold transition-colors transition-transform duration-300 hover:scale-105 ${
                  location.pathname === link.path
                    ? 'text-black'
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors transition-transform duration-300 hover:scale-105 focus:outline-none"
                >
                  <User className="h-5 w-5 text-gray-800" />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 hover:text-black transition-colors transition-transform duration-300 hover:scale-105"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-lg font-bold transition-colors transition-transform duration-300 hover:scale-105 ${
                    location.pathname === link.path
                      ? 'text-black bg-gray-200'
                      : 'text-gray-700 hover:text-black hover:bg-gray-200'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {currentUser && (
                <>
                  <Link
                    to="/profile"
                    className="px-3 py-2 text-lg font-bold text-gray-700 hover:text-black hover:bg-gray-200 transition-transform duration-300 hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-lg font-bold text-gray-700 hover:text-black hover:bg-gray-200 transition-transform duration-300 hover:scale-105"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 