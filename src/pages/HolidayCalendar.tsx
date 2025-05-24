import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Filter, Download, Printer, Info } from 'lucide-react';

interface Holiday {
  date: string;
  name: string;
  type: 'national' | 'regional' | 'bank';
  regions: string[];
}

const HolidayCalendar: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  // Sample holiday data for 2025
  const holidays: Holiday[] = [
    {
      date: '2025-01-01',
      name: 'New Year\'s Day',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-01-14',
      name: 'Makar Sankranti / Pongal',
      type: 'regional',
      regions: ['Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana']
    },
    {
      date: '2025-01-26',
      name: 'Republic Day',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-02-19',
      name: 'Chatrapati Shivaji Maharaj Jayanti',
      type: 'regional',
      regions: ['Maharashtra']
    },
    {
      date: '2025-03-07',
      name: 'Holi',
      type: 'regional',
      regions: ['Delhi', 'Uttar Pradesh', 'Rajasthan', 'Bihar', 'Maharashtra', 'Jharkhand', 'West Bengal']
    },
    {
      date: '2025-03-29',
      name: 'Bank Closing of Accounts',
      type: 'bank',
      regions: ['all']
    },
    {
      date: '2025-04-03',
      name: 'Annual Closing of Bank Accounts',
      type: 'bank',
      regions: ['all']
    },
    {
      date: '2025-04-11',
      name: 'Good Friday',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-04-14',
      name: 'Dr. Ambedkar Jayanti',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-05-01',
      name: 'May Day/Labour Day',
      type: 'regional',
      regions: ['Karnataka', 'Tamil Nadu', 'Kerala', 'West Bengal']
    },
    {
      date: '2025-06-16',
      name: 'Eid al-Adha',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-08-15',
      name: 'Independence Day',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-09-02',
      name: 'Ganesh Chaturthi',
      type: 'regional',
      regions: ['Maharashtra', 'Gujarat', 'Karnataka', 'Andhra Pradesh', 'Telangana']
    },
    {
      date: '2025-10-02',
      name: 'Gandhi Jayanti',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-10-23',
      name: 'Dussehra',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-11-12',
      name: 'Diwali',
      type: 'national',
      regions: ['all']
    },
    {
      date: '2025-11-13',
      name: 'Diwali (Govardhan Puja)',
      type: 'regional',
      regions: ['Gujarat', 'Rajasthan', 'Uttar Pradesh']
    },
    {
      date: '2025-11-14',
      name: 'Bhai Dooj',
      type: 'regional',
      regions: ['Delhi', 'Gujarat', 'Rajasthan', 'Uttar Pradesh']
    },
    {
      date: '2025-12-25',
      name: 'Christmas',
      type: 'national',
      regions: ['all']
    },
  ];

  // Get all unique regions for filter
  const regions = useMemo(() => {
    const uniqueRegions = new Set<string>();
    uniqueRegions.add('all');
    
    holidays.forEach(holiday => {
      holiday.regions.forEach(region => {
        if (region !== 'all') {
          uniqueRegions.add(region);
        }
      });
    });
    
    return Array.from(uniqueRegions).sort();
  }, []);

  // Get all months for filter
  const months = [
    { value: 'all', label: 'All Months' },
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  // Filter holidays based on month and region
  const filteredHolidays = useMemo(() => {
    return holidays.filter(holiday => {
      const holidayMonth = holiday.date.split('-')[1];
      const matchesMonth = selectedMonth === 'all' || holidayMonth === selectedMonth;
      const matchesRegion = selectedRegion === 'all' || 
                            holiday.regions.includes('all') || 
                            holiday.regions.includes(selectedRegion);
      return matchesMonth && matchesRegion;
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [selectedMonth, selectedRegion]);

  // Format date to a readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Group holidays by month for display
  const holidaysByMonth = useMemo(() => {
    const grouped: Record<string, Holiday[]> = {};
    
    filteredHolidays.forEach(holiday => {
      const date = new Date(holiday.date);
      const monthName = date.toLocaleDateString('en-US', { month: 'long' });
      
      if (!grouped[monthName]) {
        grouped[monthName] = [];
      }
      
      grouped[monthName].push(holiday);
    });
    
    return grouped;
  }, [filteredHolidays]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
              <Calendar className="h-8 w-8 mr-2 text-blue-700" />
              Bank Holiday Calendar 2025
            </h1>
            <p className="text-xl text-gray-600">
              Plan ahead with our comprehensive list of bank holidays
            </p>
          </motion.div>
        </div>

        {/* Filter and Actions */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
            <div className="md:flex md:space-x-4 space-y-4 md:space-y-0">
              <div>
                <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Filter by Month
                </label>
                <select
                  id="month"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {months.map((month) => (
                    <option key={month.value} value={month.value}>
                      {month.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Filter by Region
                </label>
                <select
                  id="region"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region === 'all' ? 'All Regions' : region}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Holiday List */}
        {Object.keys(holidaysByMonth).length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {Object.entries(holidaysByMonth).map(([month, monthHolidays]) => (
              <motion.div key={month} variants={itemVariants}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">{month}</h2>
                <div className="space-y-4">
                  {monthHolidays.map((holiday, index) => (
                    <div 
                      key={index} 
                      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow flex items-start"
                    >
                      <div className="mr-4 flex-shrink-0 w-12 h-12 flex flex-col items-center justify-center bg-blue-100 rounded-lg">
                        <span className="text-xs text-blue-700">{holiday.date.split('-')[0]}</span>
                        <span className="text-lg font-bold text-blue-800">{holiday.date.split('-')[2]}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{holiday.name}</h3>
                        <p className="text-sm text-gray-600">{formatDate(holiday.date)}</p>
                        <div className="mt-2">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            holiday.type === 'national' 
                              ? 'bg-blue-100 text-blue-800' 
                              : holiday.type === 'regional'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-purple-100 text-purple-800'
                          }`}>
                            {holiday.type === 'national' 
                              ? 'National Holiday' 
                              : holiday.type === 'regional'
                                ? 'Regional Holiday'
                                : 'Bank Holiday'}
                          </span>
                          {holiday.regions[0] !== 'all' && (
                            <span className="ml-2 text-xs text-gray-500">
                              {holiday.regions.join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Holidays Found</h3>
            <p className="text-gray-700">
              No bank holidays match your current filter criteria. Please try different filters.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-md font-medium text-blue-800">Important Information</h4>
              <p className="text-sm text-blue-700 mt-2">
                Please note that bank holidays may vary by region and branch. This calendar is provided for 
                informational purposes only and is subject to change. Additionally, some banks may observe local 
                holidays not listed here. We recommend confirming with your specific bank branch before planning 
                important transactions.
              </p>
              <p className="text-sm text-blue-700 mt-2">
                Last updated: July 15, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayCalendar;