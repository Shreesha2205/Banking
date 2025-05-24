import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Twitter, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <Landmark className="h-8 w-8" />
              <span className="font-bold text-xl">BankBuddy</span>
            </Link>
            <p className="mt-4 text-blue-100">
              Helping you make better banking decisions with tools, comparisons, and resources.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculators</h3>
            <ul className="space-y-2">
              <li><Link to="/calculators/loan" className="text-blue-200 hover:text-white transition-colors">Loan EMI Calculator</Link></li>
              <li><Link to="/calculators/deposit" className="text-blue-200 hover:text-white transition-colors">Fixed Deposit Calculator</Link></li>
              <li><Link to="/calculators/deposit" className="text-blue-200 hover:text-white transition-colors">Recurring Deposit Calculator</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources/glossary" className="text-blue-200 hover:text-white transition-colors">Banking Glossary</Link></li>
              <li><Link to="/interest-rates" className="text-blue-200 hover:text-white transition-colors">Interest Rate Dashboard</Link></li>
              <li><Link to="/holiday-calendar" className="text-blue-200 hover:text-white transition-colors">Bank Holiday Calendar</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="flex items-center space-x-2 mb-2">
              <Mail size={16} />
              <span>info@bankbuddy.com</span>
            </p>
            <p className="text-blue-200 mt-4">
              BankBuddy is not affiliated with any bank. We provide unbiased tools and information to help you make the best financial decisions.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-800 text-blue-300 text-sm">
          <div className="flex flex-col md:flex-row justify-between">
            <p>© 2025 BankBuddy. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-6">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;