import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 flex-grow">{description}</p>
      <Link 
        to={link} 
        className="inline-flex items-center text-teal-700 hover:text-teal-800 font-medium transition-colors mt-auto"
      >
        Learn more <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

export default FeatureCard;