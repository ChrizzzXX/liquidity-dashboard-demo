import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const LiquidityDashboard = () => {
  const [forecastData, setForecastData] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState('baseline');

  // Sample data structure
  const sampleData = [
    {
      week: 'Week 1',
      openingBalance: 100000,
      inflows: 50000,
      outflows: 30000,
      closingBalance: 120000,
      baseline: 120000,
      conservative: 110000,
      aggressive: 130000
    },
    {
      week: 'Week 2',
      openingBalance: 120000,
      inflows: 45000,
      outflows: 35000,
      closingBalance: 130000,
      baseline: 130000,
      conservative: 120000,
      aggressive: 140000
    },
    {
      week: 'Week 3',
      openingBalance: 130000,
      inflows: 55000,
      outflows: 40000,
      closingBalance: 145000,
      baseline: 145000,
      conservative: 135000,
      aggressive: 155000
    }
  ];

  useEffect(() => {
    setForecastData(sampleData);
  }, [selectedScenario]);

  const getAlertLevel = (balance) => {
    if (balance < 50000) return 'bg-red-100 text-red-800';
    if (balance < 100000) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">13-Week Liquidity Forecast</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-blue-50">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold">Current Balance</span>
            </div>
            <p className="text-2xl font-bold mt-2">$120,000</p>
          </div>
          
          <div className="p-4 rounded-lg bg-green-50">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-lg font-semibold">Expected Inflows</span>
            </div>
            <p className="text-2xl font-bold mt-2">$50,000</p>
          </div>
          
          <div className="p-4 rounded-lg bg-red-50">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <span className="text-lg font-semibold">Expected Outflows</span>
            </div>
            <p className="text-2xl font-bold mt-2">$30,000</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <LineChart
            width={800}
            height={250}
            data={forecastData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="baseline" stroke="#8884d8" />
            <Line type="monotone" dataKey="conservative" stroke="#82ca9d" />
            <Line type="monotone" dataKey="aggressive" stroke="#ffc658" />
          </LineChart>
        </div>

        {forecastData.map((week, index) => (
          <div
            key={week.week}
            className={`mt-4 p-4 rounded-lg ${getAlertLevel(week.closingBalance)}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{week.week}</span>
              <div className="flex items-center gap-4">
                <span>Opening: ${week.openingBalance.toLocaleString()}</span>
                <span>Inflows: +${week.inflows.toLocaleString()}</span>
                <span>Outflows: -${week.outflows.toLocaleString()}</span>
                <span className="font-bold">
                  Closing: ${week.closingBalance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiquidityDashboard;