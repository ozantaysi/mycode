import React, { useState, useEffect, useMemo } from 'react';
import { CalculationData, CalculationResult, HistoryItem, LoadingState } from './types';
import { DEFAULT_ANAPARA, DEFAULT_FAIZ, DEFAULT_STOPAJ, DEFAULT_VADE, APP_TITLE } from './constants';
import { saveCalculation } from './services/apiService';
import CalculatorForm from './components/CalculatorForm';
import ResultCard from './components/ResultCard';
import Visualization from './components/Visualization';
import AIAdvisor from './components/AIAdvisor';
import RecentCalculations from './components/RecentCalculations';
import { Coins } from 'lucide-react';

const App: React.FC = () => {
  // Financial Data State
  const [data, setData] = useState<CalculationData>({
    anapara: DEFAULT_ANAPARA,
    yillikFaiz: DEFAULT_FAIZ,
    vadeGun: DEFAULT_VADE,
    stopaj: DEFAULT_STOPAJ
  });

  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Saving State
  const [saveState, setSaveState] = useState<LoadingState>(LoadingState.IDLE);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('faiz_calc_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Geçmiş yüklenirken hata oluştu", e);
      }
    }
  }, []);

  // Calculate Results automatically when data changes
  const result: CalculationResult = useMemo(() => {
    // Standard Formula: (Principal * Rate * Days) / 36500
    const brutGetiri = (data.anapara * data.yillikFaiz * data.vadeGun) / 36500;
    const stopajTutari = brutGetiri * (data.stopaj / 100);
    const netGetiri = brutGetiri - stopajTutari;
    const toplamBakiye = data.anapara + netGetiri;
    
    // Effective annual net rate approximation
    const netYillikOran = data.yillikFaiz * (1 - data.stopaj / 100);

    return {
      brutGetiri,
      stopajTutari,
      netGetiri,
      toplamBakiye,
      netYillikOran
    };
  }, [data]);

  // Handler for form changes
  const handleDataChange = (key: keyof CalculationData, value: number) => {
    setData(prev => ({ ...prev, [key]: value }));
    // Reset save state if user edits data
    if (saveState !== LoadingState.IDLE) {
      setSaveState(LoadingState.IDLE);
    }
  };

  // Function to add current calculation to local history
  const addToLocalHistory = () => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      data: { ...data },
      result: { ...result }
    };

    // Add new item to beginning, keep only last 5
    const updatedHistory = [newItem, ...history].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem('faiz_calc_history', JSON.stringify(updatedHistory));
  };

  // Restore a history item to the form
  const handleHistorySelect = (item: HistoryItem) => {
    setData(item.data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for Saving to PHP Backend AND Local History
  const handleSave = async () => {
    // 1. Add to Local History UI immediately
    addToLocalHistory();

    // 2. Save to Server
    setSaveState(LoadingState.LOADING);
    const response = await saveCalculation(data, result.netGetiri);
    
    if (response.success) {
      setSaveState(LoadingState.SUCCESS);
      setTimeout(() => setSaveState(LoadingState.IDLE), 3000); // Reset after 3 seconds
    } else {
      setSaveState(LoadingState.ERROR);
      alert('Hata: ' + response.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Coins className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">{APP_TITLE}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Inputs and AI (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <CalculatorForm data={data} onChange={handleDataChange} />
            <AIAdvisor data={data} result={result} />
            <RecentCalculations history={history} onSelect={handleHistorySelect} />
          </div>

          {/* Right Column: Results and Charts (4 cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <ResultCard 
              result={result} 
              onSave={handleSave} 
              saveState={saveState} 
            />
            <div className="flex-1">
               <Visualization anapara={data.anapara} netGetiri={result.netGetiri} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;