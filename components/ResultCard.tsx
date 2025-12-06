import React from 'react';
import { CalculationResult, LoadingState } from '../types';
import { ArrowRight, Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ResultCardProps {
  result: CalculationResult;
  onSave: () => void;
  saveState: LoadingState;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onSave, saveState }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between h-full">
      <div>
        <h2 className="text-blue-100 text-lg font-medium mb-6">Hesaplama Sonucu</h2>
        
        <div className="mb-8">
          <p className="text-blue-200 text-sm mb-1">Net Kazanç (Getiri)</p>
          <div className="text-4xl font-bold tracking-tight">
            +{result.netGetiri.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-blue-500/30 pb-3">
            <span className="text-blue-200 text-sm">Brüt Getiri</span>
            <span className="font-semibold">{result.brutGetiri.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
          </div>
          <div className="flex justify-between items-center border-b border-blue-500/30 pb-3">
            <span className="text-blue-200 text-sm">Stopaj Kesintisi</span>
            <span className="font-semibold text-red-300">-{result.stopajTutari.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-blue-100 text-lg font-medium">Toplam Bakiye</span>
            <span className="text-xl font-bold">{result.toplamBakiye.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-blue-500/30">
        <button
          onClick={onSave}
          disabled={saveState === LoadingState.LOADING || saveState === LoadingState.SUCCESS}
          className={`w-full py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all shadow-lg
            ${saveState === LoadingState.SUCCESS 
              ? 'bg-green-500 text-white' 
              : saveState === LoadingState.ERROR 
                ? 'bg-red-500 text-white'
                : 'bg-white text-blue-700 hover:bg-blue-50 active:scale-95'
            }
          `}
        >
          {saveState === LoadingState.LOADING && <Loader2 className="w-5 h-5 animate-spin" />}
          {saveState === LoadingState.IDLE && <><Save className="w-5 h-5" /> Kaydet</>}
          {saveState === LoadingState.SUCCESS && <><CheckCircle className="w-5 h-5" /> Kaydedildi</>}
          {saveState === LoadingState.ERROR && <><AlertCircle className="w-5 h-5" /> Hata Oluştu</>}
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
