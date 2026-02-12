
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { performanceData } from '../../utils/simulator/mockData';

const PerformanceChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-[15px] font-bold text-[#1C1E21]">Performance Overview</h3>
          <p className="text-[11px] text-gray-500 mt-0.5">Key metrics over the last 7 days</p>
        </div>
        <div className="flex space-x-4 text-[12px] font-medium">
          <div className="flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2] mr-2 shadow-sm"></span>Amount Spent
          </div>
          <div className="flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
            <span className="w-2.5 h-2.5 rounded-full bg-[#31A24C] mr-2 shadow-sm"></span>Link Clicks
          </div>
        </div>
      </div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1877F2" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1877F2" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#31A24C" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#31A24C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F2F5" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#8D949E', fontWeight: 500 }}
              dy={12}
            />
            <YAxis
              hide={true}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                padding: '12px'
              }}
              labelStyle={{ fontSize: '12px', fontWeight: 'bold', color: '#1C1E21', marginBottom: '8px', borderBottom: '1px solid #f0f0f0', paddingBottom: '4px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 500 }}
              formatter={(value: number, name: string) => [
                name === 'amount' ? `$${value}` : value,
                name === 'amount' ? 'Spent' : 'Clicks'
              ]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#1877F2"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorAmount)"
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#31A24C"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorClicks)"
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
