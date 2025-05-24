import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, AlertCircle } from 'lucide-react';

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
}

const Glossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Sample glossary terms
  const glossaryTerms: GlossaryTerm[] = [
    {
      term: 'EMI',
      definition: 'Equated Monthly Installment is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. It consists of both principal and interest components.',
      category: 'loans'
    },
    {
      term: 'NEFT',
      definition: 'National Electronic Funds Transfer is an electronic funds transfer system maintained by the Reserve Bank of India. It enables bank customers to transfer funds between any two NEFT-enabled bank accounts in India.',
      category: 'payments'
    },
    {
      term: 'RTGS',
      definition: 'Real Time Gross Settlement is a funds transfer system where the transfer of money takes place from one bank to another on a "real time" and "gross" basis. The transactions are settled as soon as they are processed.',
      category: 'payments'
    },
    {
      term: 'IMPS',
      definition: 'Immediate Payment Service is an instant payment inter-bank electronic funds transfer system. It offers an interbank electronic fund transfer service through mobile phones.',
      category: 'payments'
    },
    {
      term: 'UPI',
      definition: 'Unified Payments Interface is an instant real-time payment system developed by the National Payments Corporation of India. It powers multiple bank accounts into a single mobile application.',
      category: 'payments'
    },
    {
      term: 'CIBIL Score',
      definition: 'Credit Information Bureau (India) Limited Score is a three-digit numeric summary of your credit history, rating, and report. The score ranges from 300 to 900, with a higher score indicating better creditworthiness.',
      category: 'credit'
    },
    {
      term: 'Fixed Deposit',
      definition: 'A financial instrument provided by banks which provides investors with a higher rate of interest than a regular savings account, until the given maturity date.',
      category: 'deposits'
    },
    {
      term: 'Recurring Deposit',
      definition: 'A type of term deposit offered by banks which allows customers to deposit a fixed amount every month and earn interest at the rate applicable to fixed deposits.',
      category: 'deposits'
    },
    {
      term: 'Repo Rate',
      definition: 'The rate at which the central bank of a country lends money to commercial banks in the event of any shortfall of funds.',
      category: 'banking'
    },
    {
      term: 'CRR',
      definition: 'Cash Reserve Ratio is the percentage of deposits that banks have to maintain with the central bank as cash reserves.',
      category: 'banking'
    },
    {
      term: 'SLR',
      definition: 'Statutory Liquidity Ratio is the percentage of deposits that commercial banks are required to maintain in the form of cash, gold, or approved securities before providing credit to customers.',
      category: 'banking'
    },
    {
      term: 'Base Rate',
      definition: 'The minimum rate of interest that a bank is allowed to charge from its customers, except for a few specific cases allowed by the RBI.',
      category: 'banking'
    },
    {
      term: 'IFSC Code',
      definition: 'Indian Financial System Code is an alphanumeric code that uniquely identifies a bank branch participating in the electronic payment systems in India.',
      category: 'banking'
    },
    {
      term: 'KYC',
      definition: 'Know Your Customer is the process of a business verifying the identity of its clients. It is a mandatory requirement for banks and financial institutions under the Prevention of Money Laundering Act.',
      category: 'banking'
    },
    {
      term: 'Overdraft',
      definition: 'An extension of credit from a bank when an account reaches zero. An overdraft allows the account holder to continue withdrawing money even when the account has no funds in it or insufficient funds to cover the amount of the withdrawal.',
      category: 'banking'
    },
    {
      term: 'Term Insurance',
      definition: 'A type of life insurance policy that provides coverage for a specified term or period of time. It pays a benefit to the beneficiary only when the insured dies during the term of the policy.',
      category: 'insurance'
    },
    {
      term: 'Mutual Fund',
      definition: 'An investment vehicle made up of a pool of money collected from many investors for the purpose of investing in securities such as stocks, bonds, and other assets.',
      category: 'investments'
    },
    {
      term: 'SIP',
      definition: 'Systematic Investment Plan is an investment strategy offered by mutual funds wherein one could invest a fixed amount in a mutual fund scheme at regular intervals.',
      category: 'investments'
    },
    {
      term: 'NPA',
      definition: 'Non-Performing Asset refers to a classification for loans on the books of financial institutions that are in default or are in arrears on scheduled payments of principal or interest.',
      category: 'banking'
    },
    {
      term: 'Demat Account',
      definition: 'A dematerialized account is an account that holds financial securities (equity or debt) in electronic form. It is similar to a bank account where actual money is replaced by shares.',
      category: 'investments'
    },
    {
      term: 'PPF',
      definition: 'Public Provident Fund is a long-term investment option that offers attractive interest rates and returns that are fully exempt from tax.',
      category: 'investments'
    },
    {
      term: 'CASA Ratio',
      definition: 'Current Account Savings Account Ratio is the ratio of deposits in current and saving accounts to total deposits. A higher CASA ratio indicates a lower cost of funds for banks.',
      category: 'banking'
    },
    {
      term: 'SWIFT Code',
      definition: 'Society for Worldwide Interbank Financial Telecommunication code is a standard format of Bank Identifier Code used to specify a particular bank or branch in international transactions.',
      category: 'banking'
    },
    {
      term: 'NACH',
      definition: 'National Automated Clearing House is a centralized system launched by the National Payments Corporation of India to facilitate interbank, high volume electronic transactions which are repetitive and periodic in nature.',
      category: 'payments'
    },
  ];

  // Get unique categories for the filter
  const categories = useMemo(() => {
    const uniqueCategories = new Set(glossaryTerms.map(term => term.category));
    return ['all', ...Array.from(uniqueCategories)];
  }, []);

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
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
              <BookOpen className="h-8 w-8 mr-2 text-blue-700" />
              Banking Glossary
            </h1>
            <p className="text-xl text-gray-600">
              Understand common banking terms and concepts
            </p>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="md:flex md:items-end md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 md:mr-4">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Terms
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for banking terms..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Glossary Terms */}
        {filteredTerms.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {filteredTerms.map((term, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-bold text-lg mr-3">
                    {term.term.charAt(0)}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{term.term}</h3>
                    <p className="text-gray-700">{term.definition}</p>
                    <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {term.category.charAt(0).toUpperCase() + term.category.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Terms Found</h3>
            <p className="text-gray-700">
              No banking terms match your current search criteria. Please try different search terms or categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Glossary;