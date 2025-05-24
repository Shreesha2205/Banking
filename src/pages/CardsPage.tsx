import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import AddCardModal from '../components/ui/AddCardModal';
import { useAuth } from '../contexts/AuthContext';

const CardsPage: React.FC = () => {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [cards, setCards] = useState<any[]>([]); // State to store cards
  const [loginMessage, setLoginMessage] = useState<string | null>(null); // State for login required message
  const { currentUser } = useAuth();

  const handleAddCard = (cardDetails: any) => {
    console.log('Card details submitted:', cardDetails);
    // Add the new card to the cards array state
    setCards([...cards, cardDetails]);
    // Here you would typically save the card details (e.g., to a database or state management)
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 py-12 px-4">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center"
        >
          Manage Your Cards
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center mb-12"
        >
          Keep track of your credit and debit cards, view details, and manage them securely.
        </motion.p>

        {/* Button to add new card */}
        <div className="text-center mt-8">
          <button 
            onClick={() => {
              if (currentUser) {
                setIsAddCardModalOpen(true);
                setLoginMessage(null);
              } else {
                setLoginMessage('You need to login first');
                setIsAddCardModalOpen(false); // Ensure modal is closed if not logged in
              }
            }}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Add New Card
          </button>
        </div>

        {/* Login Required Message */}
        {loginMessage && (
          <div className="text-center mt-4 text-red-700 bg-red-100 border border-red-400 px-4 py-3 rounded relative max-w-sm mx-auto">
            <span className="block sm:inline">{loginMessage}</span>
          </div>
        )}

        {/* Display added cards */}
        {cards.length > 0 && (
          <div className="max-w-3xl mx-auto mt-8 bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Your Added Cards</h2>
            <div className="space-y-4">
              {cards.map((card, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900">{card.nameOnCard} ({card.cardType === 'debit' ? 'Debit' : 'Credit'})</h3>
                  <p className="text-gray-600 text-sm">Card Number: {card.cardNumber}</p>
                  <p className="text-gray-600 text-sm">Valid Thru: {card.validThru}</p>
                  <p className="text-gray-600 text-sm">DOB: {card.dob}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Placeholder content for card listing */}
        {/* Removed placeholder card listing and add new card button */}

      </div>

      {/* Add Card Modal */}
      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => setIsAddCardModalOpen(false)}
        onSubmit={handleAddCard}
      />
    </div>
  );
};

export default CardsPage; 