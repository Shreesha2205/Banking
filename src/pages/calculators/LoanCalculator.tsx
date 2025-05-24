import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Calculator, HelpCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext'; // Corrected path

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const LoanCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [loanType, setLoanType] = useState<string>('home');
  const [savedCalculations, setSavedCalculations] = useState<Array<{
    loanType: string;
    loanAmount: number;
    interestRate: number;
    loanTerm: number;
    emi: number;
    totalInterest: number;
    totalPayment: number;
    date: string;
  }>>([]);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const { currentUser } = useAuth();

  // Load saved calculations from local storage on mount or when user changes
  useEffect(() => {
    if (currentUser) {
      const saved = localStorage.getItem(`loanCalculations_${currentUser.uid}`);
      if (saved) {
        setSavedCalculations(JSON.parse(saved));
      }
    } else {
      setSavedCalculations([]); // Clear calculations if user logs out
    }
  }, [currentUser]); // Dependency on currentUser

  // Calculate loan details
  useEffect(() => {
    if (loanAmount && interestRate && loanTerm) {
      const monthlyInterestRate = interestRate / (12 * 100);
      const numberOfPayments = loanTerm * 12;
      const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
      const monthly = (loanAmount * x * monthlyInterestRate) / (x - 1);
      
      setEmi(monthly);
      setTotalPayment(monthly * numberOfPayments);
      setTotalInterest(monthly * numberOfPayments - loanAmount);
    } else {
      setEmi(0);
      setTotalPayment(0);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, loanTerm]);

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
        data: [loanAmount, totalInterest],
        backgroundColor: ['#3B82F6', '#F59E0B'],
        borderColor: ['#2563EB', '#D97706'],
        borderWidth: 1,
      },
    ],
  };

  // Presets for different loan types
  const loanPresets = {
    home: { maxAmount: 10000000, maxTerm: 30, defaultRate: 8.5 },
    car: { maxAmount: 2000000, maxTerm: 7, defaultRate: 9.5 },
    personal: { maxAmount: 1000000, maxTerm: 5, defaultRate: 12 },
    education: { maxAmount: 5000000, maxTerm: 15, defaultRate: 10 },
  };

  const handleLoanTypeChange = (type: string) => {
    setLoanType(type);
    const preset = loanPresets[type as keyof typeof loanPresets];
    setInterestRate(preset.defaultRate);
    
    // Adjust loan amount and term if they exceed the maximum for the selected type
    if (loanAmount > preset.maxAmount) setLoanAmount(preset.maxAmount);
    if (loanTerm > preset.maxTerm) setLoanTerm(preset.maxTerm);
  };

  const handleSave = () => {
    if (!currentUser) {
      // Optionally show a message to the user to log in
      alert("Please log in to save calculations.");
      return;
    }

    const newCalculation = {
      loanType,
      loanAmount,
      interestRate,
      loanTerm,
      emi,
      totalInterest,
      totalPayment,
      date: new Date().toLocaleString()
    };
    
    const updatedCalculations = [...savedCalculations, newCalculation];
    setSavedCalculations(updatedCalculations);
    
    // Save to local storage
    localStorage.setItem(`loanCalculations_${currentUser.uid}`, JSON.stringify(updatedCalculations));

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
              Loan EMI Calculator
            </h1>
            <p className="text-xl text-gray-600">
              Calculate your monthly EMI, total interest payable, and more
            </p>
          </motion.div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Input Section */}
            <div className="md:w-1/2 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
                
                {/* Loan Type Selection */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Loan Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {Object.entries(loanPresets).map(([type, _]) => (
                      <button
                        key={type}
                        className={`py-2 px-4 rounded text-sm font-medium transition-colors ${
                          loanType === type
                            ? 'bg-black text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        onClick={() => handleLoanTypeChange(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Loan Amount */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label htmlFor="loanAmount" className="block text-gray-700 text-sm font-medium mb-2">
                      Loan Amount
                    </label>
                    <span className="text-sm text-gray-500">
                      Max: {formatCurrency(loanPresets[loanType as keyof typeof loanPresets].maxAmount)}
                    </span>
                  </div>
                  <input
                    type="number"
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    min="10000"
                    max={loanPresets[loanType as keyof typeof loanPresets].maxAmount}
                  />
                  <input
                    type="range"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full mt-2"
                    min="10000"
                    max={loanPresets[loanType as keyof typeof loanPresets].maxAmount}
                    step="10000"
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
                    max="20"
                    step="0.1"
                  />
                  <input
                    type="range"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full mt-2"
                    min="1"
                    max="20"
                    step="0.1"
                  />
                </div>

                {/* Loan Term */}
                <div className="mb-4">
                  <div className="flex justify-between">
                    <label htmlFor="loanTerm" className="block text-gray-700 text-sm font-medium mb-2">
                      Loan Term (years)
                    </label>
                    <span className="text-sm text-gray-500">
                      Max: {loanPresets[loanType as keyof typeof loanPresets].maxTerm} years
                    </span>
                  </div>
                  <input
                    type="number"
                    id="loanTerm"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    min="1"
                    max={loanPresets[loanType as keyof typeof loanPresets].maxTerm}
                  />
                  <input
                    type="range"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full mt-2"
                    min="1"
                    max={loanPresets[loanType as keyof typeof loanPresets].maxTerm}
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
                    <div className="grid grid-cols-1 gap-4">
                      {savedCalculations.map((calc, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="font-semibold text-black text-lg">
                                  {calc.loanType.charAt(0).toUpperCase() + calc.loanType.slice(1)} Loan
                                </h4>
                                <p className="text-sm text-gray-500">{calc.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-black">{formatCurrency(calc.emi)}</p>
                                <p className="text-sm text-gray-600">Monthly EMI</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
                              <div>
                                <p className="text-sm text-gray-600">Loan Amount</p>
                                <p className="font-medium text-black">{formatCurrency(calc.loanAmount)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Interest Rate</p>
                                <p className="font-medium text-black">{calc.interestRate}% p.a.</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Loan Term</p>
                                <p className="font-medium text-black">{calc.loanTerm} years</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Total Payment</p>
                                <p className="font-medium text-black">{formatCurrency(calc.totalPayment)}</p>
                              </div>
                            </div>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
              
              <div className="mb-8">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-black">{formatCurrency(emi)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                    <p className="text-lg font-semibold text-black">{formatCurrency(loanAmount)}</p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                    <p className="text-lg font-semibold text-black">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-sm text-gray-700 mb-1">Total Amount Payable</p>
                  <p className="text-lg font-semibold text-black">{formatCurrency(totalPayment)}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-md font-medium text-gray-800 mb-3">Payment Breakdown</h4>
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
                <h4 className="text-sm font-medium text-black">How is EMI calculated?</h4>
                <p className="text-sm text-gray-700 mt-1">
                  EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is the loan amount, R is the interest rate per month,
                  and N is the number of monthly installments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;