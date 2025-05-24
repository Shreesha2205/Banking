import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Percent, Calculator, Shield } from 'lucide-react';

const DepositCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(5);
  const [time, setTime] = useState<number>(1);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [rate, setRate] = useState<number>(5);

  const calculateDeposit = () => {
    const amount = principal * Math.pow(1 + interestRate / 100, time);
    const interest = amount - principal;

    setMaturityAmount(amount);
    setTotalInterest(interest);
  };

  const calculateReturns = () => {
    const amount = principal * Math.pow(1 + rate / 100, time);
    const interest = amount - principal;

    setMaturityAmount(amount);
    setTotalInterest(interest);
  };

  const effectiveRate = (totalInterest / principal) * 100;

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#50472d] via-[#ffd45e] to-[#50472d]">
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Deposit Calculator
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-200 font-light mb-8"
            >
              Plan your savings and calculate returns on your fixed deposits
            </motion.p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="principal" className="block text-sm font-medium text-gray-200 mb-2">
                    Principal Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                    <input
                      type="number"
                      id="principal"
                      value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-full pl-8 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                      placeholder="Enter principal amount"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="rate" className="block text-sm font-medium text-gray-200 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    id="rate"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Enter interest rate"
                  />
                </div>

                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-200 mb-2">
                    Time Period (in years)
                  </label>
                  <input
                    type="number"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Enter time period"
                  />
                </div>

                <button
                  onClick={calculateReturns}
                  className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Calculate Returns
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {maturityAmount > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-black/20 backdrop-blur-sm rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-white">Deposit Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200">Maturity Amount</span>
                    <span className="text-xl font-semibold text-white">₹{maturityAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200">Total Interest</span>
                    <span className="text-xl font-semibold text-white">₹{totalInterest.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-200">Effective Rate</span>
                    <span className="text-xl font-semibold text-white">{effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Use Our Deposit Calculator?</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Make informed decisions about your savings with our comprehensive calculator
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Accurate Calculations</h3>
              <p className="text-gray-200">Get precise maturity amount calculations based on your deposit details</p>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Plan Better</h3>
              <p className="text-gray-200">Understand your total returns and effective interest rate</p>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Secure & Private</h3>
              <p className="text-gray-200">Your calculations are done locally, ensuring privacy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DepositCalculator; 