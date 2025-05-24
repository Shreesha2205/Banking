import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign, Percent } from 'lucide-react';

const InterestRates: React.FC = () => {
  const bankRates = [
    {
      bank: 'State Bank of India',
      savings: '2.70%',
      fd: '6.50%',
      homeLoan: '8.50%',
      personalLoan: '10.50%',
      carLoan: '8.75%',
      educationLoan: '8.15%',
      businessLoan: '10.25%',
      processingFee: '0.35%'
    },
    {
      bank: 'HDFC Bank',
      savings: '3.00%',
      fd: '6.75%',
      homeLoan: '8.75%',
      personalLoan: '10.75%',
      carLoan: '8.90%',
      educationLoan: '8.35%',
      businessLoan: '10.50%',
      processingFee: '0.50%'
    },
    {
      bank: 'ICICI Bank',
      savings: '3.00%',
      fd: '6.75%',
      homeLoan: '8.75%',
      personalLoan: '10.75%',
      carLoan: '8.90%',
      educationLoan: '8.35%',
      businessLoan: '10.50%',
      processingFee: '0.50%'
    },
    {
      bank: 'Axis Bank',
      savings: '3.00%',
      fd: '6.75%',
      homeLoan: '8.75%',
      personalLoan: '10.75%',
      carLoan: '8.90%',
      educationLoan: '8.35%',
      businessLoan: '10.50%',
      processingFee: '0.50%'
    },
    {
      bank: 'Kotak Mahindra Bank',
      savings: '3.50%',
      fd: '7.00%',
      homeLoan: '8.50%',
      personalLoan: '10.50%',
      carLoan: '8.75%',
      educationLoan: '8.25%',
      businessLoan: '10.35%',
      processingFee: '0.50%'
    },
    {
      bank: 'Punjab National Bank',
      savings: '2.75%',
      fd: '6.50%',
      homeLoan: '8.50%',
      personalLoan: '10.50%',
      carLoan: '8.75%',
      educationLoan: '8.15%',
      businessLoan: '10.25%',
      processingFee: '0.35%'
    },
    {
      bank: 'Bank of Baroda',
      savings: '2.75%',
      fd: '6.50%',
      homeLoan: '8.50%',
      personalLoan: '10.50%',
      carLoan: '8.75%',
      educationLoan: '8.15%',
      businessLoan: '10.25%',
      processingFee: '0.35%'
    },
    {
      bank: 'Canara Bank',
      savings: '2.75%',
      fd: '6.50%',
      homeLoan: '8.50%',
      personalLoan: '10.50%',
      carLoan: '8.75%',
      educationLoan: '8.15%',
      businessLoan: '10.25%',
      processingFee: '0.35%'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-black/50" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              Bank Interest Rates Comparison
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-300 font-light"
            >
              Compare interest rates across major banks in India
            </motion.p>
          </div>
        </div>
      </section>

      {/* Rates Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Comprehensive Bank Interest Rates</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Savings Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fixed Deposit (1 Year)</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Loan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personal Loan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Car Loan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Education Loan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Business Loan</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Processing Fee</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bankRates.map((rate, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{rate.bank}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{rate.savings}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{rate.fd}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{rate.homeLoan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{rate.personalLoan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{rate.carLoan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{rate.educationLoan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{rate.businessLoan}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rate.processingFee}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Understanding Bank Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Market Rates</h3>
                <p className="text-gray-600">Rates are updated based on market conditions</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Regular Updates</h3>
                <p className="text-gray-600">Check back regularly for the latest rates</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Best Value</h3>
                <p className="text-gray-600">Compare rates to find the best deal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterestRates;