import React, { useState } from 'react';
import { CalculationData, CalculationResult, LoadingState } from '../types';
import { getFinancialAdvice } from '../services/geminiService';
import { Sparkles, Bot, ChevronRight, Loader2 } from 'lucide-react';

interface AIAdvisorProps {
  data: CalculationData;
  result: CalculationResult;
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ data, result }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    setAdvice('');
    try {
      const response = await getFinancialAdvice(data, result);
      setAdvice(response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Bot className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-indigo-900">Yapay Zeka Danışmanı</h3>
            <p className="text-sm text-indigo-600">Gemini 2.5 ile yatırım analizi</p>
          </div>
        </div>
        
        {!advice && (
          <button
            onClick={handleGetAdvice}
            disabled={loading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Analiz Ediliyor...' : 'Yorumla'}
          </button>
        )}
      </div>

      {loading && (
        <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-indigo-200/50 rounded w-3/4"></div>
            <div className="h-4 bg-indigo-200/50 rounded w-full"></div>
            <div className="h-4 bg-indigo-200/50 rounded w-5/6"></div>
        </div>
      )}

      {advice && (
        <div className="bg-white/80 p-5 rounded-xl text-indigo-900 text-sm leading-relaxed shadow-sm border border-indigo-100/50">
           <div className="prose prose-sm prose-indigo max-w-none whitespace-pre-line">
            {advice}
           </div>
           <div className="mt-4 flex justify-end">
             <button onClick={handleGetAdvice} className="text-xs text-indigo-500 hover:text-indigo-700 font-medium flex items-center gap-1">
                Yeniden Analiz Et <ChevronRight className="w-3 h-3" />
             </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;
