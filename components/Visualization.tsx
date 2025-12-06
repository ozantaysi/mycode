import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { COLORS } from '../constants';

interface VisualizationProps {
  anapara: number;
  netGetiri: number;
}

const Visualization: React.FC<VisualizationProps> = ({ anapara, netGetiri }) => {
  const data = [
    { name: 'Anapara', value: anapara },
    { name: 'Net Getiri', value: netGetiri },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">Getiri Dağılımı</h3>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              <Cell key="cell-0" fill={COLORS.primary} />
              <Cell key="cell-1" fill={COLORS.secondary} />
            </Pie>
            <Tooltip 
                formatter={(value: number) => `${value.toLocaleString('tr-TR')} TL`}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Visualization;
