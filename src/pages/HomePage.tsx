import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Calendar, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import LoginModal from '../components/ui/LoginModal';
import SignupModal from '../components/ui/SignupModal';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const { currentUser } = useAuth();

  const features = [
    {
      icon: <Calculator className="h-6 w-6" />,
      title: 'Smart Calculators',
      description: 'Calculate loans and deposits with our easy-to-use tools',
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Interest Rates',
      description: 'Stay updated with the latest interest rates',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Platform',
      description: 'Your financial data is always protected',
    },
  ];

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  };

  const handleSignupSuccess = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#50472d] via-[#ffd45e] to-[#50472d]">
      {/* Hero Section */}
      <section className="relative text-gray-900 w-full">
        <div className="w-full px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Welcome to BankBuddy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-800 font-light mb-8"
            >
              Your trusted partner for financial planning and banking solutions
            </motion.p>
            <div className="flex flex-col items-center gap-8">
              {!currentUser && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="px-8 py-3 bg-[#1C1C1C] text-white rounded-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsSignupModalOpen(true)}
                    className="px-8 py-3 bg-[#1C1C1C] text-white rounded-lg font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 w-full">
        <div className="w-full px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose BankBuddy?</h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Experience banking tools designed with simplicity and power in mind
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg"
              >
                <div className="bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Showcase */}
      <section className="py-24 w-full">
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Powerful Calculators</h2>
            <p className="text-xl text-gray-800 mb-12">
              Make informed financial decisions with our suite of smart calculators
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                to="/calculators/loan"
                className="group bg-black/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">Loan Calculator</h3>
                <p className="text-gray-200 mb-6">
                  Calculate your EMI, interest rates, and loan terms with precision
                </p>
                <div className="flex items-center text-white font-medium">
                  Try it now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                to="/calculators/deposit"
                className="group bg-black/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-semibold mb-4 text-white">Deposit Calculator</h3>
                <p className="text-gray-200 mb-6">
                  Plan your savings with our comprehensive deposit calculator
                </p>
                <div className="flex items-center text-white font-medium">
                  Try it now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section className="py-16 bg-gray-900 text-white w-full">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Company Info */}
              <div>
                <h3 className="text-xl font-bold mb-4">BankBuddy</h3>
                <p className="text-gray-400 mb-4">
                  Your trusted partner for financial planning and banking solutions
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/calculators/loan" className="text-gray-400 hover:text-white transition-colors">
                      Loan Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators/deposit" className="text-gray-400 hover:text-white transition-colors">
                      Deposit Calculator
                    </Link>
                  </li>
                  <li>
                    <Link to="/interest-rates" className="text-gray-400 hover:text-white transition-colors">
                      Interest Rates
                    </Link>
                  </li>
                  <li>
                    <Link to="/holiday-calendar" className="text-gray-400 hover:text-white transition-colors">
                      Holiday Calendar
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Email: support@bankbuddy.com</li>
                  <li>Phone: +1 (555) 123-4567</li>
                  <li>Address: 123 Banking Street</li>
                  <li>Financial District, NY 10004</li>
                </ul>
              </div>

              {/* Newsletter */}
              <div>
                <h3 className="text-xl font-bold mb-4">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Subscribe to our newsletter for the latest updates
                </p>
                <form className="flex flex-col space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; {new Date().getFullYear()} BankBuddy. All rights reserved.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSubmit={handleLoginSuccess}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSubmit={handleSignupSuccess}
      />
    </div>
  );
};

export default HomePage;