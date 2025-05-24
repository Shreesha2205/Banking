import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Loan Calculator', path: '/calculators/loan' },
    { name: 'Deposit Calculator', path: '/calculators/deposit' },
    { name: 'Interest Rates', path: '/interest-rates' },
    { name: 'Holiday Calendar', path: '/holiday-calendar' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Landmark className="h-8 w-8 text-blue-900" />
            <span className="font-bold text-xl text-blue-900">BankBuddy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-blue-700 ${
                  location.pathname === link.path
                    ? 'text-blue-800 font-medium'
                    : 'text-gray-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {currentUser && (
              <Link
                to="/profile"
                className={`flex items-center space-x-1 transition-colors hover:text-blue-700 ${
                  location.pathname === '/profile'
                    ? 'text-blue-800 font-medium'
                    : 'text-gray-700'
                }`}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 px-4 rounded transition-colors ${
                  location.pathname === link.path
                    ? 'bg-blue-100 text-blue-800 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {currentUser && (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-2 py-2 px-4 rounded transition-colors ${
                    location.pathname === '/profile'
                      ? 'bg-blue-100 text-blue-800 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 px-4 rounded text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;