import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoanCalculator from './pages/calculators/LoanCalculator';
import DepositCalculator from './pages/calculators/DepositCalculator';
import InterestRates from './pages/InterestRates';
import HolidayCalendar from './pages/HolidayCalendar';
import Profile from './pages/Profile';
import CardsPage from './pages/CardsPage';
import NotFound from './pages/NotFound';
import Navbar from './components/ui/Navbar';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculators/loan" element={<LoanCalculator />} />
              <Route path="/calculators/deposit" element={<DepositCalculator />} />
              <Route path="/interest-rates" element={<InterestRates />} />
              <Route path="/holiday-calendar" element={<HolidayCalendar />} />
              <Route path="/cards" element={<CardsPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;