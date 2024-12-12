import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const data = [
  {
    week: 'Week 1',
    baseline: 120000,
    conservative: 110000,
    aggressive: 130000,
    opening: 100000,
    inflows: 50000,
    outflows: 30000,
    closing: 120000
  },
  {
    week: 'Week 2',
    baseline: 130000,
    conservative: 120000,
    aggressive: 140000,
    opening: 120000,
    inflows: 45000,
    outflows: 35000,
    closing: 130000
  },
  {
    week: 'Week 3',
    baseline: 145000,
    conservative: 135000,
    aggressive: 155000,
    opening: 130000,
    inflows: 55000,
    outflows: 40000,
    closing: 145000
  }
];

export default function LiquidityDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">13-Week Liquidity Forecast</h1>
      
      <div className="grid gap-6 mb-6">
        {/* Current Balance Card */}
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Current Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(120000)}</div>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Expected Inflows */}
          <Card className="bg-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-600 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Expected Inflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{formatCurrency(50000)}</div>
            </CardContent>
          </Card>

          {/* Expected Outflows */}
          <Card className="bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-600 flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-red-600" />
                Expected Outflows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-700">{formatCurrency(30000)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Chart Card */}
        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" />
                <YAxis 
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  labelStyle={{ color: '#666' }}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #e0e0e0',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#818cf8" 
                  dot={{ fill: '#818cf8' }}
                  name="baseline"
                />
                <Line 
                  type="monotone" 
                  dataKey="conservative" 
                  stroke="#4ade80" 
                  dot={{ fill: '#4ade80' }}
                  name="conservative"
                />
                <Line 
                  type="monotone" 
                  dataKey="aggressive" 
                  stroke="#fb923c" 
                  dot={{ fill: '#fb923c' }}
                  name="aggressive"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Details */}
        {data.map((week, index) => (
          <Card key={week.week} className="bg-green-50">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-600">{week.week}</div>
                  <div>Opening: {formatCurrency(week.opening)}</div>
                </div>
                <div>
                  <div className="font-semibold text-green-700">Inflows</div>
                  <div>+{formatCurrency(week.inflows)}</div>
                </div>
                <div>
                  <div className="font-semibold text-red-700">Outflows</div>
                  <div>-{formatCurrency(week.outflows)}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-600">Closing</div>
                  <div>{formatCurrency(week.closing)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
