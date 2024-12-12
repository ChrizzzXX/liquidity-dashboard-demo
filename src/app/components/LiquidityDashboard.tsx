import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const LiquidityDashboard = () => {
  const [forecastData, setForecastData] = useState([
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
    }
  ]);

  const StatCard = ({ icon: Icon, title, amount, color }) => (
    <div className={`p-6 rounded-xl ${color} shadow-sm`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className={`w-6 h-6 ${title.includes('Outflows') ? 'text-red-500' : 
          title.includes('Inflows') ? 'text-green-500' : 'text-blue-500'}`} />
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-gray-900">
        ${amount.toLocaleString()}
      </p>
    </div>
  );

  const WeekSummary = ({ data }) => (
    <div className="p-6 rounded-xl bg-green-50 shadow-sm mt-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="font-semibold text-gray-700 text-lg">
          {data.week}
        </div>
        <div className="flex flex-wrap gap-6 text-gray-600">
          <span>Opening: <span className="font-semibold">${data.openingBalance.toLocaleString()}</span></span>
          <span className="text-green-600">Inflows: <span className="font-semibold">+${data.inflows.toLocaleString()}</span></span>
          <span className="text-red-600">Outflows: <span className="font-semibold">-${data.outflows.toLocaleString()}</span></span>
          <span className="text-gray-900 font-bold">Closing: ${data.closingBalance.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">13-Week Liquidity Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            icon={DollarSign}
            title="Current Balance"
            amount={120000}
            color="bg-blue-50"
          />
          <StatCard 
            icon={TrendingUp}
            title="Expected Inflows"
            amount={50000}
            color="bg-green-50"
          />
          <StatCard 
            icon={TrendingDown}
            title="Expected Outflows"
            amount={30000}
            color="bg-red-50"
          />
        </div>

        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
          <LineChart
            width={800}
            height={400}
            data={forecastData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="baseline" 
              stroke="#818cf8" 
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="conservative" 
              stroke="#34d399" 
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="aggressive" 
              stroke="#fbbf24" 
              strokeWidth={2}
              dot={{ strokeWidth: 2 }}
            />
          </LineChart>
        </div>

        {forecastData.map((week) => (
          <WeekSummary key={week.week} data={week} />
        ))}
      </CardContent>
    </Card>
  );
};

export default LiquidityDashboard;