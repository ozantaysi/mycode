import React from 'react';
import { CalculationData } from '../types';
import { Calculator, CalendarDays, Percent, Wallet } from 'lucide-react';

interface CalculatorFormProps {
  data: CalculationData;
  onChange: (key: keyof CalculationData, value: number) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof CalculationData) => {
    const val = parseFloat(e.target.value);
    onChange(field, isNaN(val) ? 0 : val);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-slate-800">
        <Calculator className="w-5 h-5 text-blue-600" />
        Hesaplama Bilgileri
      </h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Anapara (TL)
          </label>
          <input
            type="number"
            value={data.anapara || ''}
            onChange={(e) => handleChange(e, 'anapara')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
            placeholder="100000"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Faiz Oranı (%)
            </label>
            <input
              type="number"
              value={data.yillikFaiz || ''}
              onChange={(e) => handleChange(e, 'yillikFaiz')}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
              placeholder="45"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Vade (Gün)
            </label>
            <input
              type="number"
              value={data.vadeGun || ''}
              onChange={(e) => handleChange(e, 'vadeGun')}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
              placeholder="32"
            />
          </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
              <Percent className="w-4 h-4" />
              Stopaj Oranı (%)
            </label>
            <input
              type="number"
              value={data.stopaj}
              onChange={(e) => handleChange(e, 'stopaj')}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none font-medium text-slate-900"
              placeholder="5"
            />
        </div>
      </div>
    </div>
  );
};

export default CalculatorForm;
