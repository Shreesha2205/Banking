import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Calculator, HelpCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext'; // Corrected path

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const DepositCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [interestEarned, setInterestEarned] = useState<number>(0);
  const [depositType, setDepositType] = useState<string>('fixed');
  const [savedCalculations, setSavedCalculations] = useState<Array<{
    depositType: string;
    principal: number;
    interestRate: number;
    timePeriod: number;
    maturityAmount: number;
    interestEarned: number;
    date: string;
  }>>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const { currentUser } = useAuth();

  // Load saved calculations from local storage on mount or when user changes
  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`depositCalculations_${currentUser.uid}`);
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } else {
      setSavedCalculations([]); // Clear calculations if user logs out
    }
  }, [currentUser]); // Dependency on currentUser

  // Calculate deposit details
  useEffect(() => {
    if (principal && interestRate && timePeriod) {
      const r = interestRate / 100;
      const amount = principal * Math.pow(1 + r, timePeriod);
      setMaturityAmount(amount);
      setInterestEarned(amount - principal);
    } else {
      setMaturityAmount(0);
      setInterestEarned(0);
    }
  }, [principal, interestRate, timePeriod]);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Setup chart data
  const chartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [principal, interestEarned],
        backgroundColor: ['#3B82F6', '#F59E0B'],
        borderColor: ['#2563EB', '#D97706'],
        borderWidth: 1,
      },
    ],
  };

  // Presets for different deposit types
  const depositPresets = {
    fixed: { maxAmount: 10000000, maxTerm: 10, defaultRate: 6.5 },
    savings: { maxAmount: 5000000, maxTerm: 5, defaultRate: 4.0 },
    senior: { maxAmount: 15000000, maxTerm: 10, defaultRate: 7.5 },
    tax: { maxAmount: 1500000, maxTerm: 5, defaultRate: 6.0 },
  };

  const handleDepositTypeChange = (type: string) => {
    setDepositType(type);
    const preset = depositPresets[type as keyof typeof depositPresets];
    setInterestRate(preset.defaultRate);
    
    // Adjust principal and term if they exceed the maximum for the selected type
    if (principal > preset.maxAmount) setPrincipal(preset.maxAmount);
    if (timePeriod > preset.maxTerm) setTimePeriod(preset.maxTerm);
  };

  const handleSave = () => {
    if (!currentUser) {
      // Optionally show a message to the user to log in
      alert("Please log in to save calculations.");
      return;
    }

    const newCalculation = {
      depositType,
      principal,
      interestRate,
      timePeriod,
      maturityAmount,
      interestEarned,
      date: new Date().toLocaleString()
    };
    
    const updatedCalculations = [...savedCalculations, newCalculation];
    setSavedCalculations(updatedCalculations);

    // Save to local storage
    localStorage.setItem(`depositCalculations_${currentUser.uid}`, JSON.stringify(updatedCalculations));

    setShowSavedMessage(true);
    
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowSavedMessage(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Calculator className="h-8 w-8 mr-2 text-black" />
              Deposit Calculator
            </h1>
            <p className="text-xl text-gray-600">
              Calculate your maturity amount, interest earned, and more
            </p>
          </motion.div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Input Section */}
            <div className="md:w-1/2 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Details</h3>
                
                {/* Deposit Type Selection */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Deposit Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(depositPresets).map(([type, _]) => (
                      <button
                        key={type}
                        className={`py-2 px-4 rounded text-sm font-medium transition-colors ${
                          depositType === type
                            ? 'bg-black text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => handleDepositTypeChange(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Principal Amount */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label htmlFor="principal" className="block text-gray-700 text-sm font-medium mb-2">
                      Principal Amount
                    </label>
                    <span className="text-sm text-gray-500">
                      Max: {formatCurrency(depositPresets[depositType as keyof typeof depositPresets].maxAmount)}
                    </span>
                  </div>
                  <input
                    type="number"
                    id="principal"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    min="1000"
                    max={depositPresets[depositType as keyof typeof depositPresets].maxAmount}
                  />
                  <input
                    type="range"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full mt-2"
                    min="1000"
                    max={depositPresets[depositType as keyof typeof depositPresets].maxAmount}
                    step="1000"
                  />
                </div>

                {/* Interest Rate */}
                <div className="mb-4">
                  <label htmlFor="interestRate" className="block text-gray-700 text-sm font-medium mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    id="interestRate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    min="1"
                    max="15"
                    step="0.1"
                  />
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full mt-2"
                    min="1"
                    max="15"
                    step="0.1"
                  />
                </div>

                {/* Time Period */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label htmlFor="timePeriod" className="block text-gray-700 text-sm font-medium mb-2">
                      Time Period (years)
                    </label>
                    <span className="text-sm text-gray-500">
                      Max: {depositPresets[depositType as keyof typeof depositPresets].maxTerm} years
                    </span>
                  </div>
                  <input
                    type="number"
                    id="timePeriod"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    min="1"
                    max={depositPresets[depositType as keyof typeof depositPresets].maxTerm}
                  />
                  <input
                    type="range"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value))}
                    className="w-full mt-2"
                    min="1"
                    max={depositPresets[depositType as keyof typeof depositPresets].maxTerm}
                  />
                </div>

                {/* Save Button (Conditionally rendered) */}
                {currentUser ? (
                  <div className="mt-6">
                    <button
                      onClick={handleSave}
                      className="w-full bg-black text-white py-3 rounded-lg font-medium hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Save className="h-5 w-5" />
                      Save Calculation
                    </button>
                    {showSavedMessage && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-600 text-center mt-2"
                      >
                        Calculation saved successfully!
                      </motion.p>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 text-center text-gray-600">
                    Please log in to save calculations.
                  </div>
                )}

                {/* Saved Calculations (Conditionally rendered) */}
                {currentUser && savedCalculations.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Calculations</h3>
                    <div className="space-y-4">
                      {savedCalculations.map((calc, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-black">{calc.depositType.charAt(0).toUpperCase() + calc.depositType.slice(1)} Deposit</p>
                              <p className="text-sm text-gray-600">Maturity: {formatCurrency(calc.maturityAmount)}</p>
                            </div>
                            <p className="text-xs text-gray-500">{calc.date}</p>
                          </div>
                          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                            <p className="text-gray-600">Principal: {formatCurrency(calc.principal)}</p>
                            <p className="text-gray-600">Rate: {calc.interestRate}%</p>
                            <p className="text-gray-600">Term: {calc.timePeriod} years</p>
                            <p className="text-gray-600">Interest: {formatCurrency(calc.interestEarned)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="md:w-1/2 bg-gray-50 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deposit Summary</h3>
              
              <div className="mb-8">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-1">Maturity Amount</p>
                  <p className="text-2xl font-bold text-black">{formatCurrency(maturityAmount)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                    <p className="text-lg font-semibold text-black">{formatCurrency(principal)}</p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Interest Earned</p>
                    <p className="text-lg font-semibold text-black">{formatCurrency(interestEarned)}</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-1">Total Return</p>
                  <p className="text-lg font-semibold text-black">{formatCurrency(maturityAmount)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-3">Return Breakdown</h4>
                <div className="w-48 h-48 mx-auto">
                  <Doughnut data={chartData} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Info Section */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex items-start space-x-2">
              <HelpCircle className="h-5 w-5 text-black mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-black">How is the maturity amount calculated?</h4>
                <p className="text-sm text-gray-700 mt-1">
                  The maturity amount is calculated using the compound interest formula: A = P(1 + r)^t, where:
                  <br />• A = Maturity Amount
                  <br />• P = Principal Amount
                  <br />• r = Annual Interest Rate (in decimal)
                  <br />• t = Time Period (in years)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositCalculator; 