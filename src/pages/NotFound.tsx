import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-24 w-24 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            We couldn't find the page you were looking for. It might have been moved or deleted.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            <Home className="mr-2 h-5 w-5" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;